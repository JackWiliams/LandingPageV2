import { Col, Input, Radio, Row, Modal, Form, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { SearchOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { getAllLandingTemplate } from "../../appRedux/actions/LandingTemplate";
import { createLandingPage } from "../../appRedux/actions/LandingPage";
import { statusCode } from "../../constants/StatusCode";

const { Search } = Input;
const Templates = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [templateName, setTemplateName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [styleTemplate, setStyleTemplate] = useState(null);
  const [htmlPreview, setHtmlPreview] = useState(null);
  const [titlePreview, setTitlePreview] = useState("Preview");
  const [isFetch, setIsFetch] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [listTemplates, setListTemplates] = useState([]);

  const content = listTemplates.map((item) => (
    <Col key={item._id} xxl={8} xl={8} lg={12} md={12} sm={12} xs={24}>
      <div className="gx-card ld-templates-item">
        <div className="ld-templates-item-img">
          <img id="img-wrap" src={item.imgSrc} />
          <div id="btn-group" className="ld-templates-item-action">
            <Button
              className="ld-btn-fill"
              onClick={() => onClickUseTemplate(item)}
            >
              <EditOutlined /> Use
            </Button>
            <Button
              className="ld-btn-fill"
              onClick={() => onClickPreview(item)}
            >
              <EyeOutlined />
              Preview
            </Button>
          </div>
        </div>
        <div className="ld-templates-item-name">{item.template_name}</div>
      </div>
    </Col>
  ));

  const onChangeTab = (e) => {
    if (e && e.target.value) {
      if (e.target.value === "all") {
        setCategoryType("");
      } else setCategoryType(e.target.value);
    }
  };

  const onClickUseTemplate = (item) => {
    setIsCreate(true);
    setStyleTemplate(item.styles);
  };

  const onClickPreview = (item) => {
    setIsPreview(true);
    setHtmlPreview(item.html_preview);
    setTitlePreview(item.template_name);
  };

  const onFinish = (values) => {
    dispatch(
      createLandingPage(values.landing_name, styleTemplate, (code, data) => {
        if (code === statusCode.Success) {
          localStorage.setItem("landing_current_info", JSON.stringify(data));
          setIsFetch(true);
          message.success("Landing page was created successfully !");
          setIsFetch(false);
          setIsCreate(false);
          history.push("/landing-pages/edit");
        } else if (code === statusCode.LandingNameExisted) {
          message.error("Failed ! Landing page name is already in use !");
        } else {
          message.error("Failed ! Cannot create new landing page !");
        }
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAllLandingTemplate(
        templateName,
        categoryType,
        page,
        size,
        (status, data) => {
          if (status === statusCode.Success) {
            setListTemplates(data);
          } else {
            message.error("Error when getting landing templates list !");
          }
        }
      )
    );
  }, [size, page, categoryType, templateName]);

  useEffect(() => {
    if (isFetch) {
      dispatch(
        getAllLandingTemplate(
          templateName,
          categoryType,
          page,
          size,
          (status, data) => {
            if (status === statusCode.Success) {
              setListTemplates(data);
            } else {
              message.error("Error when getting landing templates list !");
            }
          }
        )
      );
    }
  }, [isFetch]);

  return (
    <div className="ld-templates-wrap">
      <h4 className="gx-font-weight-semi-bold gx-mb-4 gx-ml-2 gx-mt-2 ld-text-color-primary">
        {" "}
        {intl.formatMessage({
          id: "pages.templates.title",
        })}
      </h4>
      <Row className="ld-templates-main">
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <div className="gx-card ld-templates-menu left">
            <div className="ld-templates-menu-title">Topics</div>
            <div className="ld-templates-menu-topics">
              <Radio.Group
                defaultValue="all"
                buttonStyle="solid"
                onChange={onChangeTab}
              >
                <Radio.Button id="ld-setting-radio" value="all">
                  All
                </Radio.Button>
                <Radio.Button id="ld-animation-radio" value={1}>
                  Movies & Cinema
                </Radio.Button>
                <Radio.Button id="ld-event-radio" value={2}>
                  Travel
                </Radio.Button>
                <Radio.Button id="ld-style-radio" value={3}>
                  Wedding Invitation
                </Radio.Button>
                <Radio.Button id="ld-animation-radio" value={4}>
                  CV - Portfolio - Profile
                </Radio.Button>
                <Radio.Button id="ld-animation-radio" value={5}>
                  Food & Restaurant
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
          <div className="ld-templates-menu right">
            <Search
              placeholder="Search template name ..."
              onSearch={(value) => setTemplateName(value)}
              allowClear
              bordered={false}
              enterButton={<SearchOutlined />}
              className="ld-btn-shadow ld-templates-search"
            />
            <div className="ld-templates-list">
              <Row>{content}</Row>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        visible={isCreate}
        title={<b>Create new landing page</b>}
        footer={false}
        // width="100%"
        // height="100%"
        closable={true}
        onCancel={() => setIsCreate(false)}
      >
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0"
        >
          <h5 className="gx-mb-2">Landing page name</h5>
          <Form.Item
            name="landing_name"
            rules={[
              {
                required: true,
                message: "Please enter landing page name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="ld-modal-btn-form">
            <Button type="default" onClick={() => setIsCreate(false)}>
              Cancle
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {isPreview && (
        <div className="ld-preview-section ">
          <div className="ld-preview-header">
            <div className="ld-preview-title">Preview: {titlePreview}</div>
            <i
              title="Close preview"
              className="icon icon-close-circle ld-preview-close"
              onClick={() => setIsPreview(false)}
            ></i>
          </div>
          <iframe srcDoc={htmlPreview} className="ld-iframe-preview"></iframe>
        </div>
      )}

      {/* <Modal
        visible={isPreview}
        title={<b>Preview landing page</b>}
        footer={false}
        width={1366}
        closable={true}
        onCancel={() => setIsPreview(false)}
      >
        <div className="ld-preview-section">
          <iframe srcDoc={htmlPreview} className="ld-iframe-preview"></iframe>
        </div>
      </Modal> */}
    </div>
  );
};

export default Templates;
