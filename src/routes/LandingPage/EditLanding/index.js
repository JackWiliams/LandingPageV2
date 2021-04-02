import { message } from "antd";
import "grapesjs/dist/css/grapes.min.css";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { onNavStyleChange } from "../../../appRedux/actions/Setting";
import GEditor from "../../../components/GEditor";

const EditLanding = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [listCustomBlocks, setListCustomBlocks] = useState([]);

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
