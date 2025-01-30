import { useContext } from "react";
import { useFormik } from "formik";
import { ResumeContext } from "../../contexts/ResumeContext";
import { experienceSchema } from "../../services/validation";

const Experience = () => {
  const { state, dispatch } = useContext(ResumeContext);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    validationSchema: experienceSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch({
        type: "ADD_EXPERIENCE",
        payload: {
          ...values,
          description: values.description || "No description provided.",
        },
      });
      resetForm();
    },
  });

  const handleDelete = (index) => {
    dispatch({ type: "DELETE_EXPERIENCE", payload: index });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-custom-light hover:shadow-custom-dark transition-all"
    >
      {/* Company Field */}
      <div>
        <label className="block text-sm font-semibold mb-2">Company</label>
        <input
          type="text"
          name="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.company && formik.errors.company
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.company && formik.errors.company && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.company}</p>
        )}
      </div>

      {/* Role Field */}
      <div>
        <label className="block text-sm font-semibold mb-2">Role</label>
        <input
          type="text"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.role && formik.errors.role
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.role && formik.errors.role && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
        )}
      </div>

      {/* Start Date Field */}
      <div>
        <label className="block text-sm font-semibold mb-2">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.startDate && formik.errors.startDate
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.startDate && formik.errors.startDate && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.startDate}</p>
        )}
      </div>

      {/* End Date Field */}
      <div>
        <label className="block text-sm font-semibold mb-2">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.endDate && formik.errors.endDate
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.endDate && formik.errors.endDate && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.endDate}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.description && formik.errors.description
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none resize-none break-words whitespace-pre-wrap`}
          rows="5" // Provide ample space for multi-line input
          placeholder="Provide a detailed description of your responsibilities, achievements, or tasks."
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
        )}
      </div>


{/* Add Experience Button */}
<button
  type="submit"
  className="
    bg-gradient-to-r from-primary to-primaryDark 
    text-white font-medium 
    py-2 px-4 sm:py-3 sm:px-6 
    rounded-lg shadow-lg 
    hover:scale-105 hover:shadow-xl 
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
  "
>
      Add Experience
    </button>

    {/* Displaying Experience Entries */}
    <div className="mt-6 space-y-4">
      {state.experience.map((exp, index) => (
        <div
          key={index}
          className="p-4 mb-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
        >
          <h3 className="font-semibold text-lg text-gray-800">
            {exp.role} at {exp.company}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {exp.startDate} - {exp.endDate || "Present"}
          </p>
          <div className="mt-2 text-gray-700 break-words whitespace-pre-wrap overflow-auto max-h-32">
            {exp.description || "No description provided."}
          </div>
          <button
            onClick={() => handleDelete(index)}
            className="
              bg-red-500 hover:bg-red-600 
              text-white font-medium 
              px-3 py-1 sm:px-4 sm:py-2 
              rounded-lg 
              text-sm sm:text-base 
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              mt-4
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

export default Experience;
