import { useContext } from "react";
import { useFormik } from "formik";
import { ResumeContext } from "../../contexts/ResumeContext";
import { projectSchema } from "../../services/validation";

const Projects = () => {
  const { state, dispatch } = useContext(ResumeContext);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      technologies: "",
    },
    validationSchema: projectSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch({
        type: "ADD_PROJECT",
        payload: values,
      });
      resetForm();
    },
  });

  const handleDelete = (index) => {
    dispatch({
      type: "DELETE_PROJECT",
      payload: index,
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-custom-light transition-all hover:shadow-custom-dark"
    >
      {/* Project Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">Project Name</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Description */}
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
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
          rows="3"
          placeholder="Use bullet points for each item, e.g., • Item 1"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-semibold mb-2">Technologies</label>
        <input
          type="text"
          name="technologies"
          value={formik.values.technologies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.technologies && formik.errors.technologies
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.technologies && formik.errors.technologies && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.technologies}
          </p>
        )}
      </div>

      {/* Add Project Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-primary to-primaryDark text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-custom-dark transition-all"
      >
        Add Project
      </button>

      {/* Displaying Projects */}
      <div className="mt-6 space-y-4">
        {state.projects.map((proj, index) => (
          <div
            key={index}
            className="p-4 mb-4 rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="font-semibold text-lg text-gray-800">{proj.name}</h3>
            <div className="mt-2 text-gray-700">
              {proj.description.split("\n").map((line, i) => (
                <span key={i} className="block">
                  • {line}
                </span>
              ))}
            </div>
            <p className="text-gray-500 mt-2">
              Technologies:{" "}
              <span className="font-medium">{proj.technologies}</span>
            </p>
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

export default Projects;
