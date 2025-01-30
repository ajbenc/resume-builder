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
    dispatch({
      type: "DELETE_SKILL",
      payload: skillToDelete,
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-custom-light transition-all hover:shadow-custom-dark"
    >
      {/* Skill Input */}
      <div>
        <label className="block text-sm font-semibold mb-2">Skill</label>
        <input
          type="text"
          name="skill"
          value={formik.values.skill}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.skill && formik.errors.skill
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
          placeholder="Enter a skill (e.g., JavaScript)"
        />
        {formik.touched.skill && formik.errors.skill && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.skill}</p>
        )}
      </div>

      {/* Add Skill Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-primary to-primaryDark text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-custom-dark transition-all"
      >
        Add Skill
      </button>

      {/* Displaying Skills */}
<div className="mt-6">
  {state.skills.map((skill, index) => (
    <div
      key={index}
      className="flex justify-between items-center p-3 mb-3 rounded-lg bg-gray-50 border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <span className="font-medium text-gray-800 text-sm sm:text-base">
        {skill}
      </span>
      <button
        onClick={() => handleDelete(skill)}
        className="
          bg-red-500 hover:bg-red-600 
          text-white font-medium 
          px-3 py-1 sm:px-4 sm:py-2 
          rounded-lg 
          text-sm sm:text-base 
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        "
      >
        Delete
      </button>
    </div>
  ))}
</div>
    </form>
  );
};

export default Skills;
