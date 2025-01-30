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
      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: values,
      });
    },
  });

  // Handle profile picture upload and ensure it's in PNG format
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          // Convert image to PNG using a canvas
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const pngDataUrl = canvas.toDataURL("image/png"); // Convert to PNG
          dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { profilePicture: pngDataUrl },
          });
        };
        img.onerror = () => {
          console.error("Invalid image format. Please upload a valid image.");
          alert("Failed to process the image. Please upload a valid file.");
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-custom-light transition-all hover:shadow-custom-dark"
    >
      {/* Profile Picture Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all cursor-pointer"
        />
        {state.personalInfo.profilePicture && (
          <div className="mt-4">
            <img
              src={state.personalInfo.profilePicture}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-primary"
            />
          </div>
        )}
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-semibold">Name</label>
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

      {/* Email Field */}
      <div>
        <label className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-semibold">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border ${
            formik.touched.phone && formik.errors.phone
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-2 focus:ring-primaryDark focus:outline-none`}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
        )}
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-primary to-primaryDark text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-custom-dark transition-all"
      >
        Save Personal Info
      </button>
    </form>
  );
};

export default PersonalInfo;
