import GEditor from "../../../components/GEditor";
import "grapesjs/dist/css/grapes.min.css";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { onNavStyleChange } from "../../../appRedux/actions/Setting";
import { message } from "antd";

const EditLanding = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onNavStyleChange("NAV_STYLE_FULL"));
    message.info(
      intl.formatMessage({
        id: "pages.landing.edit.noti",
      })
    );
  }, []);
  return <GEditor />;
};

export default EditLanding;
