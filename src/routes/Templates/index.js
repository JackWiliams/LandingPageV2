import { Col, Input, Radio, Row, Modal, Form, Button } from "antd";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import TemplateItem from "./TemplateItem";
import { SearchOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const { Search } = Input;
const Templates = () => {
  const intl = useIntl();
  const history = useHistory();

  const [isCreate, setIsCreate] = useState(false);
  const [listTemplates, setListTemplates] = useState([
    {
      id: 1,
      name: "Template 1",
      imgSrc:
        "https://w.ladicdn.com/s250x250/57b167c9ca57d39c18a1c57c/untitled-1-221422.jpg",
    },
    {
      id: 2,
      name: "Template 2",
      imgSrc:
        "https://w.ladicdn.com/s250x250/57b167c9ca57d39c18a1c57c/landing-page-builder-953402.png",
    },
    {
      id: 3,
      name: "Template 3",
      imgSrc:
        "https://w.ladicdn.com/s250x250/uploads/images/c08cfead-9a7f-4064-a166-0715efe8fc19.jpg",
    },
    {
      id: 4,
      name: "Template 4",
      imgSrc:
        "https://w.ladicdn.com/s250x250/57b167c9ca57d39c18a1c57c/untitled-1-578275.jpg",
    },
  ]);

  const content = listTemplates.map((item) => (
    <Col key={item.id} xxl={8} xl={8} lg={12} md={12} sm={12} xs={24}>
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
            <Button className="ld-btn-fill">
              <EyeOutlined />
              Preview
            </Button>
          </div>
        </div>
        <div className="ld-templates-item-name">{item.name}</div>
      </div>
    </Col>
  ));

  const onChangeTab = (e) => {
    if (e && e.target.value) {
      console.log(e.target.value);
    }
  };

  const onClickUseTemplate = (item) => {
    console.log(item);
    setIsCreate(true);
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

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
                defaultValue={4}
                buttonStyle="solid"
                onChange={onChangeTab}
              >
                <Radio.Button id="ld-setting-radio" value={1}>
                  All
                </Radio.Button>
                <Radio.Button id="ld-animation-radio" value={2}>
                  CV - Portfolio - Profile
                </Radio.Button>
                <Radio.Button id="ld-event-radio" value={3}>
                  Education
                </Radio.Button>
                <Radio.Button id="ld-style-radio" value={4}>
                  PR & Marketing
                </Radio.Button>
                <Radio.Button id="ld-animation-radio" value={5}>
                  Wedding Invitation
                </Radio.Button>
                <Radio.Button id="ld-animation-radio" value={6}>
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
              //    onSearch={(value) => setKeyWord(value)}
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
        width={400}
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
            name="template-name"
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
    </div>
  );
};

export default Templates;
