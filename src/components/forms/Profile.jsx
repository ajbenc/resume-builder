import { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";

const Profile = () => {
  const { state, dispatch } = useContext(ResumeContext);

  const handleSummaryChange = (event) => {
    // Update the summary in the context
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { summary: event.target.value },
    });
  };

  return (
    <div className="mb-6">
      <div className="relative p-6 rounded-lg shadow-xl bg-white">
        <label htmlFor="profileSummary" className="block text-lg font-medium mb-2">
          Profile Summary
        </label>
        <textarea
          id="profileSummary"
          className="w-full min-h-[150px] p-4 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none"
          value={state.personalInfo.summary || ""}
          onChange={handleSummaryChange}
          placeholder="Write a brief summary of your professional background and career goals."
        />
      </div>
    </div>
  );
};

export default Profile;
