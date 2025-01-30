import { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";

const ImageUpload = () => {
  const { state, dispatch } = useContext(ResumeContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({
          type: "UPDATE_PERSONAL_INFO",
          payload: { profilePicture: reader.result }, // Save Base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
      {state.personalInfo.profilePicture && (
        <img
          src={state.personalInfo.profilePicture}
          alt="Profile Preview"
          className="mt-4 w-32 h-32 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default ImageUpload;
