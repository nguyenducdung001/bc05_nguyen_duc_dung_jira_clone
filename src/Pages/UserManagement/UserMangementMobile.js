import React, { useState, useEffect, useRef } from "react";
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
  Input,
} from "antd";

import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_LIST_USER,
  GET_LIST_USER_SAGA,
  USER_LIST_FILTER,
} from "../../redux/constant/UserManageConstant";
import {
  GET_USER_API,
  GET_USER_SEARCH,
  OPEN_FORM_EDIT_USER,
} from "../../redux/constant/jiraConstant";
import FormEditUser from "../../components/Forms/FormEditUser/FormEditUser";
import FormEditUserMobile from "../../components/Forms/FormEditUser/FormEditUserMobile";

export default function UserManagementMobile(props) {
  const { userList } = useSelector((state) => state.UserManageReducer);

  const { userSearch } = useSelector((state) => state.UserLoginJiraReducer);

  const [valueSearch, setValueSearh] = useState("");

  const searchRef = useRef(null);

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

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId - b.userId,
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
      title: "Action",

      key: "action",
      render: (text, record, index) => (
        <Space size="small">
          <Button
            onClick={() => {
              dispatch({
                type: OPEN_FORM_EDIT_USER,
                Component: <FormEditUserMobile />,
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
    <div className="container-fluid mt-2 w-100">
      <Space className="text-center">
        <AutoComplete
          // dropdownMatchSelectWidth={252}
          style={{
            width: "50vw",
          }}
          options={userSearch?.map((user, index) => {
            return { label: user.name, value: user.userId.toString() };
          })}
          value={valueSearch}
          onChange={(text) => {
            setValueSearh(text);
          }}
          onSelect={(value, option) => {
            setValueSearh(option.label);

            // Gửi value lên reducer để filter userlist

            dispatch({
              type: USER_LIST_FILTER,
              userId: value,
            });
          }}
          onSearch={(value) => {
            // debound search
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              if (value.trim() === "") {
                dispatch({
                  type: GET_LIST_USER_SAGA,
                });
              } else {
                dispatch({
                  type: GET_USER_API,
                  keyWord: value,
                });
              }
            }, 300);
          }}
        >
          <Input.Search size="middle" placeholder="" enterButton />
        </AutoComplete>
      </Space>
      <Table
        tableLayout="fixed"
        size="small"
        columns={columns}
        rowKey={"userId"}
        dataSource={userList}
        onChange={handleChange}
      />
    </div>
  );
}
