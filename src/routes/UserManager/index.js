import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Row,
  Col,
  Input,
  Table,
  Pagination,
  Space,
  Modal,
  Form,
  message,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MedicineBoxOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import IntlMessages from "../../util/IntlMessages";
import { useIntl } from "react-intl";
import { statusCode } from "./../../constants/StatusCode";
import {
  createUser,
  deleteUserById,
  updateUserById,
  getAllUser,
} from "../../appRedux/actions/UserManager";

const { Search } = Input;
const UserManager = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [isFetch, setIsFetch] = useState(false);
  const [listData, setListData] = useState([]);
  const [selectedItemID, setSelectedItemID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const columns = [
    // {
    //   title: intl.formatMessage({
    //     id: "pages.landing.tableColumn.colID",
    //   }),
    //   width: "5%",
    //   key: "id",
    //   dataIndex: "id",
    //   render: (text, record) => listData.indexOf(record) + 1,
    // },
    {
      width: "5%",
      key: "id",
      dataIndex: "id",
      render: (text, record) => (
        <i
          className="icon icon-wall ld-text-primary"
          style={{
            fontSize: 20,
            margin: "auto",
          }}
        ></i>
      ),
    },
    {
      title: intl.formatMessage({
        id: "pages.userManager.tableColumn.colName",
      }),
      dataIndex: "username",
      key: "username",
      render: (text, record) => <b>{text}</b>,
    },
    {
      title: intl.formatMessage({
        id: "pages.userManager.tableColumn.colEmail",
      }),
      dataIndex: "email",
      key: "email",
    },

    {
      title: intl.formatMessage({
        id: "pages.userManager.tableColumn.colPassword",
      }),
      dataIndex: "password",
      key: "password",
      render: () => "************",
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
              onClick={() => setSelectedItemID(record._id)}
            >
              <DeleteOutlined /> <IntlMessages id="pages.landing.btnDelete" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log(record);
    setIsUpdate(true);
    setUserInfo([
      {
        name: ["username"],
        value: record.username,
      },
      {
        name: ["email"],
        value: record.email,
      },
    ]);
    setSelectedItemID(record._id);
  };

  const handleDeleteLandingPage = () => {
    if (selectedItemID) {
      dispatch(
        deleteUserById(selectedItemID, (code) => {
          if (code === statusCode.Success) {
            setIsFetch(true);
            message.success("Delete user successfully!");
            setIsFetch(false);
          } else {
            message.error("Failed ! Cannot delete this user !");
          }
        })
      );
    }
  };

  const onFinish = ({ username, email, password }) => {
    dispatch(
      createUser(username, email, password, (code, data) => {
        if (code === statusCode.Success) {
          setIsFetch(true);
          message.success("New user was created successfully !");
          setIsFetch(false);
          setIsCreate(false);
        } else if (code === statusCode.UsernameExisted) {
          message.error("Fail! User name is already in use !");
        } else {
          message.error("Fail! Cannot create user !");
        }
      })
    );
  };

  const onChange = (current, pageSize) => {
    setPage(current);
    setSize(pageSize);
  };

  const onChangeUserInfo = ({ username, email, password }) => {
    if (selectedItemID) {
      dispatch(
        updateUserById(selectedItemID, username, email, (code, data) => {
          if (code === statusCode.Success) {
            setIsFetch(true);
            message.success("User was updated successfully !");
            setIsFetch(false);
            setIsUpdate(false);
          } else {
            message.error("Fail! Cannot update user's information !");
          }
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getAllUser(keyWord, page, size, (status, data) => {
        if (status === statusCode.Success) {
          setListData(data.data);
          setTotal(data.total);
        } else {
          message.error("Error when getting user list !");
        }
      })
    );
  }, [size, page, keyWord]);

  useEffect(() => {
    if (isFetch) {
      dispatch(
        getAllUser(keyWord, page, size, (status, data) => {
          if (status === statusCode.Success) {
            setListData(data.data);
            setTotal(data.total);
          } else {
            message.error("Error when getting user list !");
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
            <IntlMessages id="pages.userManager.title" />
          </h4>
        </Col>
        <Col xs={11} sm={11} md={4} lg={4} xl={4} xxl={3} className="mr-0">
          <Button
            className="ld-btn-fill"
            icon={<MedicineBoxOutlined />}
            onClick={() => setIsCreate(true)}
          >
            {" "}
            <IntlMessages id="pages.landing.btnCreate" />
          </Button>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className="">
          <Search
            placeholder={intl.formatMessage({
              id: "pages.userManager.searchBar.placeHolder",
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
          rowKey="username"
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

      {/* Modal Create */}
      <Modal
        visible={isCreate}
        title={<b>Create new user</b>}
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
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              type="text"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your Password!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Confirm Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
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
      {/* End modal create */}

      {/* Modal Edit */}
      <Modal
        visible={isUpdate}
        title={<b>Update user's information</b>}
        footer={false}
        width={400}
        closable={true}
        onCancel={() => setIsUpdate(false)}
      >
        <Form
          initialValues={{ remember: true }}
          name="basic"
          fields={userInfo}
          onFinish={onChangeUserInfo}
          className="gx-signin-form gx-form-row0"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              type="text"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            // rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="**********"
              disabled={true}
            />
          </Form.Item>

          <Form.Item className="ld-modal-btn-form">
            <Button type="default" onClick={() => setIsUpdate(false)}>
              Cancle
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* End modal edit */}
    </div>
  );
};

export default UserManager;
