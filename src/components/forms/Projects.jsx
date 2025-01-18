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
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Project Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
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
            placeholder="Use bullet points for each item, e.g., • Item 1"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Technologies</label>
          <input
            type="text"
            name="technologies"
            value={formik.values.technologies}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.technologies && formik.errors.technologies
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.technologies && formik.errors.technologies && (
            <p className="text-red-500 text-sm">{formik.errors.technologies}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </form>

      {/* Displaying Projects */}
      <div className="mt-6">
        {state.projects.map((proj, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="font-semibold">{proj.name}</h3>
            <p>
              {proj.description.split("\n").map((line, i) => (
                <span key={i}>
                  • {line}
                  <br />
                </span>
              ))}
            </p>
            <p>Technologies: {proj.technologies}</p>
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

export default Projects;
