import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Divider, Select, Slider, Typography } from "antd";

export default function FormCreateTask(props) {
  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const {
    values,
    touched,
    errors,

    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const options = [];
  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
      disabled: i === 10,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleEditChange = (content, editor) => {
    setFieldValue("description", content);
  };
  return (
    <div className="container">
      <div className="form-group">
        <p>Project</p>
        <select name="projectId" className="form-control">
          <option value="54">project</option>
          <option value="55">project</option>
        </select>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select name="priorityId" className="form-control">
              <option>High</option>
              <option>Low</option>
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select className="form-control" name="typeId">
              <option>New task</option>
              <option>Bugs</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={["c12"]}
              onChange={handleChange}
              options={options}
            />
            <div className="row " style={{ marginTop: "10px" }}>
              <div className="col-12">
                <p>Original estimate</p>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  className="form-control"
                  name="originalEstimate"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Time tracking</p>
            <Slider
              value={timeTracking.timeTrackingSpent}
              defaultValue={30}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row" style={{ fontSize: "12px" }}>
              <div className="col-6 text-left font-italic">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-italic">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <p>Time spent</p>
                <input
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                  }}
                  min={0}
                  defaultValue={0}
                  type="number"
                  className="form-control"
                  name="timeTrackingSpent"
                />
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                  }}
                  min={0}
                  defaultValue={0}
                  type="number"
                  className="form-control"
                  name="timeTrackingRemaining"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          // apiKey="your-api-key"
          // onInit={(evt, editor) => (editorRef.current = editor)}
          name="description"
          initialValue="<p>Project_n</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={handleEditChange}
        />
      </div>
    </div>
  );
}
