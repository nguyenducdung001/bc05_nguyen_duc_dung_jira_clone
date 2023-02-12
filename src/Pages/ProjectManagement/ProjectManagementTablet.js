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
  Row,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_USER_PROJECT_API,
  DELETE_PROJECT_SAGA,
  GET_LIST_PROJECT_SAGA,
  GET_USER_API,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  REMOVE_USER_PROJECT_API,
} from "../../redux/constant/jiraConstant";
import FormEditProject from "../../components/Forms/FormEditProject/FormEditProject";
import { EDIT_PROJECT } from "../../redux/constant/jiraConstant";
import Item from "antd/es/list/Item";
import { NavLink } from "react-router-dom";
import { Desktop, Mobile } from "../../HOC/Responsive";
import FormEditProjectMobile from "../../components/Forms/FormEditProject/FormEditProjectMobile";

export default function ProjectManagementTablet(props) {
  // Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_LIST_PROJECT_SAGA,
    });
  }, []);

  // Lấy dự liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectJiraReducer.projectList
  );
  const { userSearch } = useSelector((state) => state.UserLoginJiraReducer);

  const [value, setValue] = useState("");

  const searchRef = useRef(null);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => {
        let projectName1 = a.projectName.trim().toLowerCase();
        let projectName2 = b.projectName.trim().toLowerCase();
        if (projectName1 < projectName2) {
          return -1;
        } else {
          return 1;
        }
      },
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
    },
    {
      title: "Creator",
      // dataIndex: "categoryName",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="cyan">{record.creator.name}</Tag>;
      },
      sorter: (a, b) => {
        let creator1 = a.creator.name.trim().toLowerCase();
        let creator2 = b.creator.name.trim().toLowerCase();
        if (creator1 < creator2) {
          return -1;
        } else {
          return 1;
        }
      },
    },

    {
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 1).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="bottom"
                  title="Members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avata</th>
                            <th>Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((member, index) => {
                            return (
                              <tr key={index}>
                                <td>{member.userId}</td>
                                <td>
                                  <img
                                    width={30}
                                    height={30}
                                    style={{ borderRadius: "15px" }}
                                    src={member.avatar}
                                  />
                                </td>
                                <td>{member.name}</td>
                                <td>
                                  <span
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT_API,
                                        userProject: {
                                          userId: member.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                    style={{ cursor: "pointer" }}
                                    className="text-danger"
                                  >
                                    X
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 1 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="bottom"
              title="Add user"
              content={() => {
                return (
                  <AutoComplete
                    style={{
                      width: "100%",
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: GET_USER_API,
                          keyWord: value,
                        });
                      }, 300);
                    }}
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      // Set giá trị của hộp thoại = option.label
                      setValue(option.label);
                      // Gửi api vể backend
                      dispatch({
                        type: ADD_USER_PROJECT_API,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="small">
          <Button
            onClick={() => {
              const action = {
                type: OPEN_FORM_EDIT_PROJECT,
                title: "Edit project",
                Component: <FormEditProjectMobile />,
              };

              // dispatch lên reducer nội dung drawer
              dispatch(action);
              // dispatch dòng dữ liệu hiện tại lên reducer
              const actionEditProject = {
                type: EDIT_PROJECT,
                projectEditModal: record,
              };
              dispatch(actionEditProject);
            }}
            type="primary"
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this project?"
            description="Delete this project!"
            onConfirm={() => {
              dispatch({
                type: DELETE_PROJECT_SAGA,
                projectId: record.id,
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className=" mt-1  w-100">
        <Space></Space>
        <Table
          tableLayout="auto"
          size="small"
          columns={columns}
          rowKey={"id"}
          dataSource={projectList}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
