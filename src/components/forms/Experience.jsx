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
        payload: values,
      });
      resetForm();
    },
  });

  const handleDelete = (index) => {
    dispatch({
      type: "DELETE_EXPERIENCE",
      payload: index,
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.company && formik.errors.company
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.company && formik.errors.company && (
            <p className="text-red-500 text-sm">{formik.errors.company}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.role && formik.errors.role
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-500 text-sm">{formik.errors.role}</p>
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
          Add Experience
        </button>
      </form>

      {/* Displaying Experience Entries */}
      <div className="mt-6">
        {state.experience.map((exp, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="font-semibold">
              {exp.role} at {exp.company}
            </h3>
            <p className="text-gray-500 text-sm">
              {exp.startDate} - {exp.endDate || "Present"}
            </p>
            <p>{exp.description}</p>
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

export default Experience;
