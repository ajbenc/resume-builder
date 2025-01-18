import { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";

const Profile = () => {
  const { state, dispatch } = useContext(ResumeContext);
  const { personalInfo } = state;
  const [summary, setSummary] = useState(personalInfo.summary);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    setWordCount(newSummary.trim().split(/\s+/).filter(Boolean).length); // Count words
  };

  // Save the summary when it changes
  useEffect(() => {
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { summary },
    });
  }, [summary, dispatch]);

  return (
    <div>
      <label className="block font-medium">Profile Summary</label>
      <textarea
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        rows="4"
        value={summary}
        onChange={handleChange}
        placeholder="Write a brief summary of your professional background and career goals."
      />
      <p className="mt-2 text-sm text-gray-500">Word Count: {wordCount}</p>
    </div>
  );
};

export default Profile;
