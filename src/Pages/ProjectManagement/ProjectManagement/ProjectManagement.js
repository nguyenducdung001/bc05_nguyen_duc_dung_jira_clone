import { Button, Space, Table } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    id: 10683,
    projectName: "test2",
    description: "<p>123</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "test2",
    deleted: false,
  },
  {
    id: 10684,
    projectName: "test3",
    description: "123",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "test3",
    deleted: false,
  },
  {
    id: 10685,
    projectName: "123test",
    description: "<p>123</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "123test",
    deleted: false,
  },
  {
    id: 10686,
    projectName: "test123",
    description: "<p>123</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "test123",
    deleted: false,
  },
  {
    id: 10691,
    projectName: "New Project23",
    description: "<p>Desc xin</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "new-project23",
    deleted: false,
  },

  {
    id: 10694,
    projectName: "Capstone Jira",
    description: "<div>\n<div>DrawerCyberBugs</div>\n</div>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "capstone-jira",
    deleted: false,
  },
  {
    id: 10696,
    projectName: "project demo",
    description: "<p>alo alo</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "project-demo",
    deleted: false,
  },
  {
    id: 10697,
    projectName: "string",
    description: "string",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "string",
    deleted: false,
  },
  {
    id: 10698,
    projectName: "Test_Login_CodeLearnio",
    description: "<p>trung</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "test_login_codelearnio",
    deleted: false,
  },
];
export default function ProjectManagement() {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="container-fluid mt-5">
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
}
