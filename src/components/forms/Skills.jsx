import { useContext } from "react";
import { useFormik } from "formik";
import { ResumeContext } from "../../contexts/ResumeContext";
import { skillSchema } from "../../services/validation";

const Skills = () => {
  const { state, dispatch } = useContext(ResumeContext);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      skill: "",
    },
    validationSchema: skillSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch({
        type: "ADD_SKILL",
        payload: values.skill,
      });
      resetForm(); // Reset input field after submission
    },
  });

  const handleDelete = (skillToDelete) => {
    console.log("Deleting skill:", skillToDelete); // Debugging line
    dispatch({
      type: "DELETE_SKILL",
      payload: skillToDelete,
    });
  };

  console.log("Current skills:", state.skills); // Debugging line

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Skill</label>
          <input
            type="text"
            name="skill"
            value={formik.values.skill}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.skill && formik.errors.skill
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.skill && formik.errors.skill && (
            <p className="text-red-500 text-sm">{formik.errors.skill}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Skill
        </button>
      </form>

      {/* Displaying Skills */}
      <div className="mt-6">
        {state.skills.map((sk, index) => (
          <div
            key={index}
            className="border-b pb-2 flex justify-between items-center"
          >
            <p>{sk}</p>
            <button
              onClick={() => handleDelete(sk)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
