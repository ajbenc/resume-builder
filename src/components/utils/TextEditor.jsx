import { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { ResumeContext } from "../../contexts/ResumeContext";

const TextEditor = ({ section, field, placeholder }) => {
  const { state, dispatch } = useContext(ResumeContext);

  const handleChange = (value) => {
    // Update the context with the new value
    dispatch({
      type: "UPDATE_SECTION_DATA",
      payload: {
        section,
        field,
        value,
      },
    });
  };

  // Get the current value from the context
  const currentValue =
    state[section]?.[field] || ""; // Safely get the value from state

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-white border border-gray-300 rounded"
      />
    </div>
  );
};

export default TextEditor;
