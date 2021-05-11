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
  Select,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  CodeOutlined,
  MedicineBoxOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import IntlMessages from "../../util/IntlMessages";
import { useIntl } from "react-intl";
import { statusCode } from "./../../constants/StatusCode";
import {
  getAllCustomBlock,
  createBlock,
  deleteBlockById,
  updateBlockById,
} from "../../appRedux/actions/CustomBlock";

const { Search } = Input;
const { Option } = Select;
const BlockManager = () => {
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
  const [blockInfo, setBlockInfo] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);

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
          className="icon icon-widgets ld-text-primary"
          style={{
            fontSize: 20,
            margin: "auto",
          }}
        ></i>
      ),
    },
    {
      title: intl.formatMessage({
        id: "pages.blocksManager.tableColumn.colName",
      }),
      dataIndex: "block_name",
      key: "block_name",
      render: (text, record) => <b>{text}</b>,
    },
    {
      title: intl.formatMessage({
        id: "pages.blocksManager.tableColumn.colLabel",
      }),
      dataIndex: "label",
      key: "label",
    },

    {
      title: intl.formatMessage({
        id: "pages.blocksManager.tableColumn.colCategory",
      }),
      dataIndex: "category",
      key: "category",
    },

    {
      title: intl.formatMessage({
        id: "pages.blocksManager.tableColumn.colImg",
      }),
      dataIndex: "imgSrc",
      key: "imgSrc",
      render: (imgSrc, record) => (
        <img src={imgSrc} style={{ width: 80 }}></img>
      ),
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
            onConfirm={() => handleDeleteBlock()}
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
    setIsUpdate(true);
    setBlockInfo([
      {
        name: ["block_name"],
        value: record.block_name,
      },
      {
        name: ["label"],
        value: record.label,
      },
      {
        name: ["category"],
        value: record.category,
      },
      {
        name: ["html_components"],
        value: record.html_components,
      },
    ]);
    setCurrentImg(record.imgSrc);
    setSelectedItemID(record._id);
  };

  const handleDeleteBlock = () => {
    if (selectedItemID) {
      dispatch(
        deleteBlockById(selectedItemID, (code) => {
          if (code === statusCode.Success) {
            setIsFetch(true);
            message.success("Delete block successfully!");
            setIsFetch(false);
          } else {
            message.error("Failed ! Cannot delete this block !");
          }
        })
      );
    }
  };

  const onFinish = ({ block_name, label, category, html_components }) => {
    dispatch(
      createBlock(
        block_name,
        label,
        category,
        imgSrc,
        html_components,
        (code, data) => {
          if (code === statusCode.Success) {
            setIsFetch(true);
            message.success("New block was created successfully !");
            setIsFetch(false);
            setIsCreate(false);
            setImgSrc(null);
          } else if (code === statusCode.BlockNameExisted) {
            message.error("Fail! Block name is already in use !");
          } else {
            message.error("Fail! Cannot create block !");
          }
        }
      )
    );
  };

  const onChange = (current, pageSize) => {
    setPage(current);
    setSize(pageSize);
  };

  const onChangeBlockInfo = ({
    block_name,
    label,
    category,
    html_components,
  }) => {
    if (selectedItemID) {
      var lastImg = currentImg;
      if (imgSrc) {
        lastImg = imgSrc;
      }

      dispatch(
        updateBlockById(
          selectedItemID,
          block_name,
          label,
          category,
          lastImg,
          html_components,
          (code, data) => {
            if (code === statusCode.Success) {
              setIsFetch(true);
              message.success("Block was updated successfully !");
              setIsFetch(false);
              setIsUpdate(false);
            } else if (code === statusCode.BlockNameExisted) {
              message.error("Fail! Block name is already in use !");
            } else {
              message.error("Fail! Cannot update block's information !");
            }
          }
        )
      );
    }
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  };

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImgSrc(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  useEffect(() => {
    dispatch(
      getAllCustomBlock(page, size, keyWord, (status, data) => {
        if (status === statusCode.Success) {
          setListData(data.data);
          setTotal(data.total);
          console.log(data);
        } else {
          message.error("Error when getting blocks list !");
        }
      })
    );
  }, [size, page, keyWord]);

  useEffect(() => {
    if (isFetch) {
      setImgSrc(null);
      dispatch(
        getAllCustomBlock(page, size, keyWord, (status, data) => {
          if (status === statusCode.Success) {
            setListData(data.data);
            setTotal(data.total);
          } else {
            message.error("Error when getting blocks list !");
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
            <IntlMessages id="pages.blocksManager.title" />
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
              id: "pages.blocksManager.searchBar.placeHolder",
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
          rowKey="block_name"
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
        title={<b>Create new block</b>}
        footer={false}
        width={600}
        closable={true}
        onCancel={() => setIsCreate(false)}
        centered={true}
      >
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0"
        >
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <h5 className="gx-mb-2">Block name</h5>
              <Form.Item
                name="block_name"
                rules={[{ required: true, message: "Block name is required!" }]}
              >
                <Input placeholder="E.g: header-1" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <h5 className="gx-mb-2">Label</h5>
              <Form.Item
                name="label"
                rules={[
                  {
                    required: true,
                    message: "Label is required!",
                  },
                ]}
              >
                <Input placeholder="E.g: Header 1" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              {" "}
              <h5 className="gx-mb-2">Category</h5>
              <Form.Item
                name="category"
                rules={[{ required: true, message: "Category is required!" }]}
              >
                <Select className="gx-mr-3" placeholder="Select category">
                  <Option key="1" value="Header">
                    Header
                  </Option>
                  <Option key="2" value="Footer">
                    Footer
                  </Option>
                  <Option key="3" value="Form">
                    Form
                  </Option>
                  <Option key="4" value="Button">
                    Button
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <h5 className="gx-mb-2">Image Cover</h5>
              <Form.Item name="imgSrc">
                <Input
                  type="file"
                  placeholder="Upload your image"
                  onChange={handleUpload}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <h5 className="gx-mb-2">Html code</h5>
              <Form.Item
                name="html_components"
                rules={[
                  {
                    required: true,
                    message: "Html components is required",
                  },
                ]}
              >
                <Input.TextArea placeholder="Place html code of the block" />
              </Form.Item>
            </Col>
          </Row>

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
        title={<b>Update block's information</b>}
        footer={false}
        width={600}
        closable={true}
        onCancel={() => setIsUpdate(false)}
        centered={true}
      >
        <Form
          initialValues={{ remember: true }}
          name="basic"
          fields={blockInfo}
          onFinish={onChangeBlockInfo}
          className="gx-signin-form gx-form-row0"
        >
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <h5 className="gx-mb-2">Block name</h5>
              <Form.Item
                name="block_name"
                rules={[{ required: true, message: "Block name is required!" }]}
              >
                <Input placeholder="E.g: header-1" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <h5 className="gx-mb-2">Label</h5>
              <Form.Item
                name="label"
                rules={[
                  {
                    required: true,
                    message: "Label is required!",
                  },
                ]}
              >
                <Input placeholder="E.g: Header 1" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              {" "}
              <h5 className="gx-mb-2">Category</h5>
              <Form.Item
                name="category"
                rules={[{ required: true, message: "Category is required!" }]}
              >
                <Select className="gx-mr-3" placeholder="Select category">
                  <Option key="1" value="Header">
                    Header
                  </Option>
                  <Option key="2" value="Footer">
                    Footer
                  </Option>
                  <Option key="3" value="Form">
                    Form
                  </Option>
                  <Option key="4" value="Button">
                    Button
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <h5 className="gx-mb-2">Image Cover</h5>
              <Form.Item>
                <Input
                  type="file"
                  placeholder="Upload your image"
                  onChange={handleUpload}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <h5 className="gx-mb-2">Html code</h5>
              <Form.Item
                name="html_components"
                rules={[
                  {
                    required: true,
                    message: "Html components is required",
                  },
                ]}
              >
                <Input.TextArea placeholder="Place html code of the block" />
              </Form.Item>
            </Col>
          </Row>

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

export default BlockManager;
