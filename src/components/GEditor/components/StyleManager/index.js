import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import Draggable from "react-draggable";
import {
  EyeOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  DesktopOutlined,
  ReloadOutlined,
  MobileOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { useIntl } from "react-intl";

const StyleManager = (props) => {
  const intl = useIntl();

  const onChangeTab = (e) => {
    if (e && e.target.value) {
      let el = document.getElementsByClassName("ld-tab-pane");
      if (el != null && el.length > 0) {
        for (var i = 0; i < el.length; i++) {
          if (el[i].classList.contains("active")) {
            el[i].classList.remove("active");
          }
        }
      }

      switch (e.target.value) {
        case 1:
          document.getElementById("ld-setting-tab").classList.add("active");
          break;
        case 2:
          document.getElementById("ld-animation-tab").classList.add("active");
          break;
        case 3:
          document.getElementById("ld-event-tab").classList.add("active");
          break;
        case 4:
          document.getElementById("ld-style-tab").classList.add("active");
          break;
        default:
          break;
      }
    }
  };

  const onClickClose = () => {
    document.getElementById("ld-style-manager").classList.remove("active");
  };

  useEffect(() => {
    onClickClose();
    document.getElementById("ld-style-tab").classList.add("active");
  }, []);

  return (
    <Draggable handle="#handle">
      <div id="ld-style-manager" className="ld-style-manager active">
        <div className="ld-style-manager-header" id="handle">
          <i className="icon icon-ellipse-h icon-header"></i>
          <i
            className="icon icon-close icon-header-close"
            onClick={onClickClose}
            title="Close"
          ></i>
        </div>
        <div className="ld-style-manager-radio">
          <Radio.Group
            defaultValue={4}
            buttonStyle="solid"
            onChange={onChangeTab}
          >
            <Radio.Button id="ld-setting-radio" value={1}>
              Setting
            </Radio.Button>
            <Radio.Button id="ld-animation-radio" value={2}>
              Animation
            </Radio.Button>
            <Radio.Button id="ld-event-radio" value={3}>
              Event
            </Radio.Button>
            <Radio.Button id="ld-style-radio" value={4}>
              Style
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="ld-tab-content">
          <div className="ld-tab-pane" id="ld-setting-tab">
            <div className="ld-coming-soon">
              <div className="ld-coming-title">Coming soon ..</div>
              <img
                className="ld-coming-img"
                srcSet={require("../../../../assets/images/coming2.svg")}
              ></img>
            </div>
          </div>
          <div className="ld-tab-pane" id="ld-animation-tab">
            <div className="ld-coming-soon">
              <div className="ld-coming-title">Coming soon ..</div>
              <img
                className="ld-coming-img"
                srcSet={require("../../../../assets/images/coming2.svg")}
              ></img>
            </div>
          </div>
          <div className="ld-tab-pane" id="ld-event-tab">
            <div className="ld-coming-soon">
              <div className="ld-coming-title">Coming soon ..</div>
              <img
                className="ld-coming-img"
                srcSet={require("../../../../assets/images/coming2.svg")}
              ></img>
            </div>
          </div>
          <div className="ld-tab-pane" id="ld-style-tab">
            <div className="styles-container"></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default StyleManager;
