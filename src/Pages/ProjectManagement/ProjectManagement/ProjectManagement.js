import { Button, Space, Table, Tag, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_PROJECT_SAGA,
  GET_LIST_PROJECT_SAGA,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
} from "../../../redux/constant/jiraConstant";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";
import { EDIT_PROJECT } from "./../../../redux/constant/jiraConstant";

export default function ProjectManagement(props) {
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      // sortDirections: ["descend"],
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
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text) => {
    //     let string = parse(text);
    //     return <div>{string}</div>;
    //   },
    // },
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
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => {
        let categoryName1 = a.categoryName.trim().toLowerCase();
        let categoryName2 = b.categoryName.trim().toLowerCase();
        if (categoryName1 < categoryName2) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              const action = {
                type: OPEN_FORM_EDIT_PROJECT,
                Component: <FormEditProject />,
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
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
