import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Table,
  Tag,
  message,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_LIST_USER_SAGA,
} from "../../redux/constant/UserManageConstant";
import { OPEN_FORM_EDIT_USER } from "../../redux/constant/jiraConstant";
import FormEditUser from "../../components/Forms/FormEditUser/FormEditUser";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

export default function UserManagement(props) {
  const { userList } = useSelector((state) => state.UserManageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_LIST_USER_SAGA,
    });
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
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
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        let projectName1 = a.projectName.trim().toLowerCase();
        let projectName2 = b.projectName.trim().toLowerCase();
        if (projectName1 < projectName2) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",

      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              dispatch({
                type: OPEN_FORM_EDIT_USER,
                Component: <FormEditUser />,
                title: "Edit user",
              });

              // Dispatch this data to reducer
              dispatch({
                type: EDIT_USER,
                editUser: record,
              });
            }}
            type="primary"
          >
            <EditOutlined />
          </Button>
          {/*  */}
          <Popconfirm
            placement="top"
            title="Are you sure to delete this user?"
            description="Delete this user!"
            onConfirm={() => {
              dispatch({
                type: DELETE_USER_SAGA,
                deleteUser: record,
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>

          {/*  */}
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
        rowKey={"userId"}
        dataSource={userList}
        onChange={handleChange}
      />
    </div>
  );
}
