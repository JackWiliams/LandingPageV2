import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const mapStateToProps = () => ({});

const TemplateItem = (props) => {
  const history = useHistory();

  return (
    <div className="gx-card ld-templates-item">
      <div className="ld-templates-item-img">
        <img id="img-wrap" src={props.item.imgSrc} />
        <div id="btn-group" className="ld-templates-item-action">
          <Button className="ld-btn-fill">
            <EditOutlined /> Use
          </Button>
          <Button className="ld-btn-fill">
            <EyeOutlined />
            Preview
          </Button>
        </div>
      </div>
      <div className="ld-templates-item-name">{props.item.name}</div>
    </div>
  );
};

export default connect(mapStateToProps, {})(TemplateItem);
