import React, { useState, useEffect } from "react";
import { Select } from "antd";
import grapesjs from "grapesjs";
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

const mapStateToProps = () => ({});
const Sections = (props) => {
  const intl = useIntl();
  const [className, setClassName] = useState("ld-gjs-sections");

  useEffect(() => {
    if (props.visible) {
      setClassName("ld-gjs-sections active");
    } else setClassName("ld-gjs-sections");
  }, [props.visible]);

  return (
    <div className={className}>
      <div id="layers" className="layers layers-manager"></div>
    </div>
  );
};

export default Sections;
