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
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Institution</label>
          <input
            type="text"
            name="school"
            value={formik.values.school}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.school && formik.errors.school
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.school && formik.errors.school && (
            <p className="text-red-500 text-sm">{formik.errors.school}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Degree</label>
          <input
            type="text"
            name="degree"
            value={formik.values.degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.degree && formik.errors.degree
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.degree && formik.errors.degree && (
            <p className="text-red-500 text-sm">{formik.errors.degree}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.startDate && formik.errors.startDate
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <p className="text-red-500 text-sm">{formik.errors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.endDate && formik.errors.endDate
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <p className="text-red-500 text-sm">{formik.errors.endDate}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
            rows="3"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Education
        </button>
      </form>

      {/* Displaying Education Entries */}
      <div className="mt-6">
        {state.education.map((edu, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="font-semibold">
              {edu.degree} at {edu.school}
            </h3>
            <p className="text-gray-500 text-sm">
              {edu.startDate} - {edu.endDate || "Present"}
            </p>
            <p>{edu.description}</p>
            <button
              onClick={() => handleDelete(index)}
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

export default Education;
