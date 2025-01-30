import { useContext } from "react";
import { useFormik } from "formik";
import { ResumeContext } from "../../contexts/ResumeContext";
import { educationSchema } from "../../services/validation";

const Education = () => {
  const { state, dispatch } = useContext(ResumeContext);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    validationSchema: educationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch({
        type: "ADD_EDUCATION",
        payload: values,
      });
      resetForm();
    },
  });

  const handleDelete = (index) => {
    dispatch({
      type: "DELETE_EDUCATION",
      payload: index,
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-custom-light transition-all hover:shadow-custom-dark"
    >
      {/* Institution Field */}
      <div>
        <label className="block text-sm font-semibold mb-2">Institution</label>
        <input
          type="text"
          name="school"
          value={formik.values.school}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.school && formik.errors.school
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.school && formik.errors.school && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.school}</p>
        )}
      </div>

      {/* Degree Field */}
      <div>
        <label className="block text-sm font-semibold mb-2">Degree</label>
        <input
          type="text"
          name="degree"
          value={formik.values.degree}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.degree && formik.errors.degree
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.degree && formik.errors.degree && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.degree}</p>
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
          rows="5"
          placeholder="Provide details, e.g., courses taken, achievements, or relevant activities."
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
        )}
      </div>


 

      {/* Add Education Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-primary to-primaryDark text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-custom-dark transition-all"
      >
        Add Education
      </button>

      {/* Displaying Education Entries */}
      <div className="mt-6 space-y-4">
        {state.education.map((edu, index) => (
          <div
            key={index}
            className="p-4 mb-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="font-semibold text-lg text-gray-800">
              {edu.degree} at {edu.school}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {edu.startDate} - {edu.endDate || "Present"}
            </p>
            <div className="mt-2 text-gray-700 break-words whitespace-pre-wrap overflow-auto max-h-32">
              {edu.description}
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

export default Education;
