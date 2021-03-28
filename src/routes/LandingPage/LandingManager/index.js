import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

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
  message,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MedicineBoxOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import IntlMessages from "../../../util/IntlMessages";
import { useIntl } from "react-intl";
import { statusCode } from "./../../../constants/StatusCode";
import {
  getAllLandingPage,
  createLandingPage,
  getLandingPageByID,
  deleteLandingPageByID,
} from "../../../appRedux/actions/LandingPage";

const { Search } = Input;
const LandingPage = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isCreate, setIsCreate] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [total, setTotal] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [isFetch, setIsFetch] = useState(false);
  const [listData, setListData] = useState([]);
  const [itemDeleteID, setItemDeleteID] = useState(null);

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
      dataIndex: "landing_name",
      key: "landing_name",
    },
    {
      title: intl.formatMessage({
        id: "pages.landing.tableColumn.colStatus",
      }),
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "published" ? (
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
      render: (time) => moment(time).local().format("DD-MM-YYYY HH:mm:ss"),
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
          <Button className="ld-btn-table" onClick={() => handleEdit(record)}>
            <EditOutlined /> <IntlMessages id="pages.landing.btnEdit" />
          </Button>
          <Popconfirm
            placement="topLeft"
            title={<b style={{ color: "#583182" }}>Are you sure to delete ?</b>}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDeleteLandingPage()}
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
            <Button
              className="ld-btn-table ld-btn-delete"
              onClick={() => setItemDeleteID(record._id)}
            >
              <DeleteOutlined /> <IntlMessages id="pages.landing.btnDelete" />
            </Button>
          </Popconfirm>
        </Space>
      ),
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

  const handleEdit = (record) => {
    // đảm bảo luôn lấy được dữ liệu mới nhất của template
    dispatch(
      getLandingPageByID(record._id, (code, data) => {
        if (code === statusCode.Success) {
          localStorage.setItem("landing_current_info", JSON.stringify(data));
          history.push("/landing-pages/edit");
        } else {
          message.error("Error when getting landing page data !");
        }
      })
    );
  };

  const handleDeleteLandingPage = () => {
    if (itemDeleteID) {
      dispatch(
        deleteLandingPageByID(itemDeleteID, (code) => {
          if (code === statusCode.Success) {
            setIsFetch(true);
            message.success("Delete landing page successfully!");
            setIsFetch(false);
          } else {
            message.error("Failed ! Cannot delete landing page !");
          }
        })
      );
    }
  };

  const onFinish = (values) => {
    dispatch(
      createLandingPage(values.landing_name, null, (code, data) => {
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

  const onChange = (current, pageSize) => {
    setPage(current);
    setSize(pageSize);
  };

  useEffect(() => {
    dispatch(
      getAllLandingPage(keyWord, page, size, (status, data) => {
        if (status === statusCode.Success) {
          setListData(data.data);
          setTotal(data.total);
        } else {
          message.error("Error when getting landing page list !");
        }
      })
    );
  }, [size, page, keyWord]);

  useEffect(() => {
    if (isFetch) {
      dispatch(
        getAllLandingPage(keyWord, page, size, (status, data) => {
          if (status === statusCode.Success) {
            setListData(data.data);
            setTotal(data.total);
          } else {
            message.error("Error when getting landing page list !");
          }
        })
      );
    }
  }, [isFetch]);

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
            onSearch={(value) => setKeyWord(value)}
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
          rowKey="landing_name"
        />
        <br />
        <Pagination
          showTotal={(total) => `Total ${total} items`}
          total={total}
          defaultCurrent={page}
          defaultPageSize={size}
          onChange={onChange}
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
    </div>
  );
};

export default LandingPage;
