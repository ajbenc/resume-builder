import { useContext } from "react";
import { useFormik } from "formik";  
import { ResumeContext } from "../../contexts/ResumeContext";
import { personalInfoSchema } from "../../services/validation";  

const PersonalInfo = () => {
  const { state, dispatch } = useContext(ResumeContext);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: state.personalInfo.name || "",
      email: state.personalInfo.email || "",
      phone: state.personalInfo.phone || "",
    },
    validationSchema: personalInfoSchema,
    onSubmit: (values) => {
      console.log("Submitting Personal Info:", values);
      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: values,
      });
      console.log("Updated Personal Info State:", state.personalInfo);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Name</label>
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
        <label className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          } rounded`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border ${
            formik.touched.phone && formik.errors.phone
              ? "border-red-500"
              : "border-gray-300"
          } rounded`}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Personal Info
      </button>
    </form>
  );
};

export default PersonalInfo;
