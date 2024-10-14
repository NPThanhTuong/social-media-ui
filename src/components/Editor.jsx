import { useState } from "react";
import ReactQuill from "react-quill";
function Editor() {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <div className="text-editor">
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        theme="snow"
        placeholder="Write something awesome..."
      />
    </div>
  );
}

export default Editor;
