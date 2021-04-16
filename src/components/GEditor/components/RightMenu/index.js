import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Popconfirm, Popover, message, Modal, Input, Tooltip } from "antd";
import {
  SaveOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  ClearOutlined,
  QuestionCircleOutlined,
  ImportOutlined,
  ExportOutlined,
  LogoutOutlined,
  CodeOutlined,
  LinkOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import juice from "juice";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { publishLandingPage } from "./../../../../appRedux/actions/LandingPage";
import { statusCode } from "../../../../constants/StatusCode";

const RightMenu = (props) => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const urlRef = useRef(null);

  const [tooltipCopy, setTooltipCopy] = useState("Copy");

  const publishLanding = () => {
    const html = props.editor.getHtml();
    const css = props.editor.getCss();

    let templateStyles = {
      gjsHtml: html,
      gjsCss: css,
      gjsComponents: props.editor.getComponents(),
      gjsStyle: props.editor.getStyle(),
    };

    const publishContents = juice(
      `<!DOCTYPE html>${html}<style>${css}</style>`,
      {}
    );

    const landingData = localStorage.getItem("landing_current_info")
      ? JSON.parse(localStorage.getItem("landing_current_info"))
      : null;
    if (landingData && landingData._id) {
      message.loading("Publishing your website ...", 3);
      dispatch(
        publishLandingPage(
          landingData._id,
          templateStyles,
          publishContents,
          (code, data) => {
            if (code === statusCode.Success) {
              const websiteUrl = `https://gateway.pinata.cloud/ipfs/${data.cid}`;

              Modal.success({
                title: <b>Publish your website successfully !</b>,
                content: (
                  <div style={{ marginLeft: "-38px" }}>
                    <div className="mb-2 mt-2">Your website</div>
                    <Input
                      prefix={<LinkOutlined />}
                      suffix={
                        <Tooltip title={tooltipCopy}>
                          <CopyOutlined
                            style={{ color: "rgba(0,0,0,.45)" }}
                            onClick={() => handleCopy()}
                          />
                        </Tooltip>
                      }
                      value={websiteUrl}
                      ref={urlRef}
                    ></Input>
                  </div>
                ),
                closable: true,
                okText: "Open in new tab",
                onOk: () => {
                  window.open(websiteUrl, "_blank");
                },
                cancelText: "Close",
                width: 500,
              });
              // window.open(websiteUrl, "_blank");
            } else {
              message.error("Failed ! Cannot publish landing page !");
            }
          }
        )
      );
    }
  };

  const handleCopy = () => {
    setTooltipCopy("Copied !");
    urlRef.current.select();
    document.execCommand("copy");
  };

  const menu = (
    <div>
      <div
        key="1"
        className="ld-dropdown-item "
        // onClick={() => props.editor.setDevice("Desktop")}
      >
        <ImportOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">Import</div>
      </div>
      <div
        key="2"
        className="ld-dropdown-item"
        onClick={() => props.editor.runCommand("core:open-code")}
      >
        <CodeOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">View Code</div>
      </div>
      <div
        key="3"
        className="ld-dropdown-item"
        onClick={() => props.editor.runCommand("gjs-export-zip")}
      >
        <ExportOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">Export Code</div>
      </div>
      <div
        key="4"
        className="ld-dropdown-item"
        onClick={() => props.editor.runCommand("core:canvas-clear")}
      >
        <ClearOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">Clear All</div>
      </div>
    </div>
  );

  return (
    <Draggable handle="#handle">
      <div id="right-menu" className="menu-popup right active">
        <div className="menu-header" id="handle">
          <i className="icon icon-ellipse-h icon-header"></i>
        </div>
        <div className="menu-body">
          {/* Save */}
          <div
            className="menu-item btn-outline-primary"
            onClick={() => props.editor.runCommand("store")}
          >
            <SaveOutlined />
            <div className="item-label">
              {intl.formatMessage({
                id: "pages.landing.edit.rightMenu.save",
              })}{" "}
            </div>
          </div>
          {/* Setting part */}
          <div className="menu-item btn-outline-primary">
            <SettingOutlined />
            <div className="item-label">
              {intl.formatMessage({
                id: "pages.landing.edit.rightMenu.setting",
              })}{" "}
            </div>
          </div>

          {/* Advanced part */}
          <Popover
            content={menu}
            placement="right"
            trigger={["click"]}
            // onClick={handleImportExport}
          >
            <div id="change-device" className="menu-item btn-outline-primary">
              <CodeOutlined />
              <div className="item-label">
                {intl.formatMessage({
                  id: "pages.landing.edit.rightMenu.advanced",
                })}{" "}
              </div>
            </div>
          </Popover>

          {/* Publish part */}
          <div
            className="menu-item btn-outline-primary"
            onClick={() => publishLanding()}
          >
            <CloudUploadOutlined />
            <div className="item-label">
              {intl.formatMessage({
                id: "pages.landing.edit.rightMenu.publish",
              })}{" "}
            </div>
          </div>
          {/* Quit part */}
          <Popconfirm
            placement="left"
            title={
              <div>
                <h4 style={{ fontWeight: "bold", color: "#583182" }}>
                  Are you sure to quit ?
                </h4>
              </div>
            }
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => history.push("/landing-pages/manager")}
            cancelButtonProps={{
              type: "default",
              style: { width: 60, height: 30 },
            }}
            okButtonProps={{
              type: "primary",
              style: { width: 60, height: 30 },
            }}
            okText="Yes"
          >
            <div className="menu-item btn-outline-primary">
              <LogoutOutlined />
              <div className="item-label">
                {intl.formatMessage({
                  id: "pages.landing.edit.rightMenu.quit",
                })}{" "}
              </div>
            </div>
          </Popconfirm>
        </div>
      </div>
    </Draggable>
  );
};

export default RightMenu;
