import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { message, Popover } from "antd";
import {
  EyeOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  DesktopOutlined,
  ReloadOutlined,
  MobileOutlined,
  TabletOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import AddBlocks from "./AddBlocks/index";
import Sections from "./Sections/index";
import { useIntl } from "react-intl";

const mapStateToProps = () => ({});
const LeftMenu = (props) => {
  const intl = useIntl();
  const [isAddBlocks, setIsAddBlocks] = useState(false);
  const [isSections, setIsSections] = useState(false);
  const [activeClass, setActiveClass] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const menuDevice = (
    <div>
      <div
        key="1"
        className="ld-dropdown-item "
        onClick={() => props.editor.setDevice("Desktop")}
      >
        <DesktopOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">Desktop</div>
      </div>
      <div
        key="2"
        className="ld-dropdown-item"
        onClick={() => props.editor.setDevice("Tablet")}
      >
        <TabletOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">Tablet</div>
      </div>
      <div
        key="3"
        className="ld-dropdown-item "
        onClick={() => props.editor.setDevice("Mobile landscape")}
      >
        <MobileOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">Mobile Landscape</div>
      </div>
      <div
        key="4"
        className="ld-dropdown-item "
        onClick={() => props.editor.setDevice("Mobile portrait")}
      >
        <MobileOutlined className="ld-dropdown-item-icon" />
        <div className="ld-dropdown-item-label">Mobile Portrait</div>
      </div>
    </div>
  );

  const onClickAddBlock = () => {
    setIsSections(false);
    setIsAddBlocks(!isAddBlocks);
    if (isAddBlocks == false) {
      setActiveClass("add-blocks");
    } else {
      setActiveClass(null);
    }
  };

  const onClickChangeDevice = () => {
    setActiveClass("change-device");
    setIsAddBlocks(false);
    setIsSections(false);
  };

  const onClickSections = () => {
    setIsAddBlocks(false);
    setIsSections(!isSections);

    if (isSections == false) {
      setActiveClass("sections-part");
    } else {
      setActiveClass(null);
    }
  };

  const onClickPreview = () => {
    props.editor.runCommand("preview");
    // props.editor.DomComponents.getWrapper().onAll(
    //   (comp) => comp.is("text") && comp.set({ editable: false })
    // );
    removeActiveClass("left-menu");
    message.info(
      "Please click the button at the top left corner to turn off preview mode",
      6
    );
    setIsPreview(true);
  };

  const handlePreviewOff = () => {
    props.editor.stopCommand("preview");
    // props.editor.DomComponents.getWrapper().onAll(
    //   (comp) => comp.is("text") && comp.set({ editable: true })
    // );
    addActiveClass("left-menu");
    setIsPreview(false);
  };

  const addActiveClass = (id) => {
    let el = document.getElementById(id);
    if (el != null && el.classList.length > 0) {
      el.classList.add("active");
    }
  };

  const removeActiveClass = (className) => {
    let el = document.getElementsByClassName(className);
    if (el != null && el.length > 0) {
      for (var i = 0; i < el.length; i++) {
        if (el[i].classList.contains("active")) {
          el[i].classList.remove("active");
        }
      }
    }
  };

  useEffect(() => {
    removeActiveClass("menu-item");
    addActiveClass(activeClass);
  }, [activeClass]);

  return (
    <div>
      <Draggable handle="#handle">
        <div id="left-menu" className="left-menu menu-popup left active">
          <div className="menu-header" id="handle">
            <i className="icon icon-ellipse-h icon-header"></i>
          </div>
          <div className="menu-body">
            {/* Add blocks */}

            <div
              id="add-blocks"
              className="menu-item btn-outline-primary"
              onClick={onClickAddBlock}
            >
              <PlusCircleOutlined />
              <div className="item-label">
                {intl.formatMessage({
                  id: "pages.landing.edit.leftMenu.add",
                })}{" "}
              </div>
            </div>
            <AddBlocks visible={isAddBlocks} />

            {/* Sections part */}
            <div
              id="sections-part"
              className="menu-item btn-outline-primary"
              onClick={onClickSections}
            >
              <ProfileOutlined />
              <div className="item-label">
                {intl.formatMessage({
                  id: "pages.landing.edit.leftMenu.sections",
                })}{" "}
              </div>
            </div>
            <Sections visible={isSections} />

            {/* Desktop part */}
            <Popover
              content={menuDevice}
              placement="right"
              trigger={["click"]}
              onClick={onClickChangeDevice}
            >
              <div id="change-device" className="menu-item btn-outline-primary">
                <DesktopOutlined />
                <div className="item-label">
                  {intl.formatMessage({
                    id: "pages.landing.edit.leftMenu.desktop",
                  })}{" "}
                </div>
              </div>
            </Popover>

            {/* Preview part */}
            <div
              className="menu-item btn-outline-primary"
              onClick={onClickPreview}
            >
              <EyeOutlined />
              <div className="item-label">
                {intl.formatMessage({
                  id: "pages.landing.edit.leftMenu.preview",
                })}{" "}
              </div>
            </div>

            {/* Undo part */}
            <div
              className="menu-item btn-outline-primary"
              onClick={() => props.editor.UndoManager.undo()}
            >
              <ReloadOutlined rotate={180} />
              <div className="item-label">
                {intl.formatMessage({
                  id: "pages.landing.edit.leftMenu.undo",
                })}{" "}
              </div>
            </div>

            {/* Redo part */}
            <div
              className="menu-item btn-outline-primary"
              onClick={() => props.editor.UndoManager.redo()}
            >
              <ReloadOutlined />
              <div className="item-label">
                {intl.formatMessage({
                  id: "pages.landing.edit.leftMenu.redo",
                })}{" "}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
      {isPreview && (
        <div className="ld-preview-btn" onClick={handlePreviewOff}>
          <EyeInvisibleOutlined />
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
