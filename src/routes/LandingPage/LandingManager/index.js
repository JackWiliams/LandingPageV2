import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Row,
  Col,
  Input,
  Dropdown,
  Table,
  Pagination,
  Tag,
  Space,
  Modal,
  Menu,
  Form,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

import IntlMessages from "../../../util/IntlMessages";

import { useIntl } from "react-intl";

const { Search } = Input;
const LandingPage = () => {
  const intl = useIntl();
  const history = useHistory();

  const [isCreate, setIsCreate] = useState(false);

  const columns = [
    {
      title: intl.formatMessage({
        id: "pages.landing.tableColumn.colID",
      }),
      width: "5%",
      key: "id",
      dataIndex: "id",
      render: (text, record) => listData.indexOf(record) + 1,
    },
    {
      title: intl.formatMessage({
        id: "pages.landing.tableColumn.colName",
      }),
      dataIndex: "name",
      key: "name",
    },
    {
      title: intl.formatMessage({
        id: "pages.landing.tableColumn.colStatus",
      }),
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === 1 ? (
          <Tag
            style={{ width: 60, textAlign: "center", margin: "auto" }}
            color="#87d068"
          >
            Active
          </Tag>
        ) : (
          <Tag
            style={{ width: 60, textAlign: "center", margin: "auto" }}
            color="#f50"
          >
            InActive
          </Tag>
        ),
    },
    {
      title: intl.formatMessage({
        id: "pages.landing.tableColumn.colDate",
      }),
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "",
      key: "action",
      width: "20%",
      render: (text, record) => (
        <Space
          size="large"
          // onClick={() =>
          //   handleActionClick(record.id, record.domain, record.text)
          // }
        >
          <Button className="ld-btn-table" onClick={() => handleEdit()}>
            <EditOutlined /> <IntlMessages id="pages.landing.btnEdit" />
          </Button>
          <Button
            className="ld-btn-table ld-btn-delete"
            // onClick={() => setIsCreate(true)}
          >
            <DeleteOutlined /> <IntlMessages id="pages.landing.btnDelete" />
          </Button>
        </Space>
      ),
    },
  ];

  const listData = [
    {
      name: "Landing Page 1",
      status: 1,
      created_date: "26/09/1998",
    },
    {
      name: "Landing Page 2",
      status: 1,
      created_date: "26/09/1998",
    },
    {
      name: "Landing Page 3",
      status: 1,
      created_date: "26/09/1998",
    },
  ];

  const menuCreate = (
    <Menu>
      <Menu.Item key="1" onClick={() => setIsCreate(true)}>
        <strong>Use new blank</strong>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => history.push("/templates")}>
        <strong>Use template</strong>
      </Menu.Item>
    </Menu>
  );

  const handleEdit = () => {
    history.push("/landing-pages/edit");
    // dispatch(onLayoutTypeChange("LAYOUT_TYPE_FULL"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Row justify="space-between" className="ld-row-lr-15">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <h4 className="gx-font-weight-semi-bold gx-mb-4 gx-mt-2 ld-text-color-primary">
            <IntlMessages id="pages.landing.title" />
          </h4>
        </Col>
        <Col xs={11} sm={11} md={4} lg={4} xl={4} xxl={3} className="mr-0">
          <Dropdown overlay={menuCreate} trigger={["click"]}>
            <Button
              className="ld-btn-fill"
              icon={<MedicineBoxOutlined />}
              // onClick={() => history.push("/templates")}
            >
              <IntlMessages id="pages.landing.btnCreate" />
            </Button>
          </Dropdown>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className="">
          <Search
            placeholder={intl.formatMessage({
              id: "pages.landing.searchBar.placeHolder",
            })}
            //  onSearch={(value) => setKeyWord(value)}
            allowClear
            bordered={false}
            enterButton={true}
            //enterButton={<i className="icon i icon-pricing-table" />}
            className="ld-btn-shadow"
          />
        </Col>
      </Row>
      <div className="gx-card">
        <Table
          className="gx-table-responsive ld-table"
          columns={columns}
          dataSource={listData}
          pagination={false}
          rowKey="name"
        />
        <br />
        <Pagination
          // showTotal={(total) => `Total ${total} items`}
          // total={total}
          // defaultCurrent={page}
          // defaultPageSize={pageSize}
          //onChange={onChange}
          showQuickJumper
          showSizeChanger
          className="ld-pagination"
        />
      </div>

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

export default LandingPage;
