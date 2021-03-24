import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Row,
  Col,
  Input,
  Card,
  Table,
  Pagination,
  Tag,
  Space,
  Modal,
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

  const [isModal, setIsModal] = useState(false);

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
            onClick={() => setIsModal(true)}
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

  const handleEdit = () => {
    history.push("/landing-pages/edit");
    // dispatch(onLayoutTypeChange("LAYOUT_TYPE_FULL"));
  };

  return (
    <div>
      <Row justify="space-between" className="ld-row-lr-15">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <h4 className="gx-font-weight-semi-bold gx-mb-3 ld-text-color-primary">
            <IntlMessages id="pages.landing.title" />
          </h4>
        </Col>
        <Col xs={11} sm={11} md={4} lg={4} xl={4} xxl={3} className="mr-0">
          <Button
            className="ld-btn-fill"
            icon={<MedicineBoxOutlined />}
            //onClick={() => setIsAddPackage(true)}
          >
            <IntlMessages id="pages.landing.btnCreate" />
          </Button>
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

      <Modal visible={isModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default LandingPage;
