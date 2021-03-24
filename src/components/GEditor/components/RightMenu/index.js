import React from "react";
import Draggable from "react-draggable";
import { Popconfirm, Popover } from "antd";
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
} from "@ant-design/icons";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

const mapStateToProps = () => ({});
const RightMenu = (props) => {
  const intl = useIntl();
  const history = useHistory();

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
          <div className="menu-item btn-outline-primary">
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
            title="Are you sure to quit？"
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
