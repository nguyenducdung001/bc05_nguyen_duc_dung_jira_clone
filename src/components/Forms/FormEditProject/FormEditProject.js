import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function FormEditProject(props) {
  const handleEditChange = (content, editor) => {
    // setFieldValue("description", content);
  };

  return (
    <form className="container">
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              ID
            </p>
            <input disabled className="form-control" name="id" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              Project Name
            </p>
            <input className="form-control" name="projectName" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              Creator
            </p>
            <input className="form-control" name="creator" />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              Description
            </p>
            <Editor
              // apiKey="your-api-key"
              // onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              initialValue="<p>This is the initial content of the editor.</p>"
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
      </div>
    </form>
  );
}
