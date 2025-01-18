import { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import PersonalInfo from "../forms/PersonalInfo";
import Profile from "../forms/Profile";
import Education from "../forms/Education";
import Experience from "../forms/Experience";
import Skills from "../forms/Skills";
import Projects from "../forms/Projects";
import PDFViewer from "./PDFViewer";

const ResumeBuilder = () => {
  const { state } = useContext(ResumeContext);
  console.log("State in ResumeBuilder:", state); // Log the entire state

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Form Section */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>

        {/* Personal Info Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
          <PersonalInfo />
        </div>

        {/* Profile Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Profile</h2>
          <Profile />
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <Skills />
        </div>

        {/* Experience Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Experience</h2>
          <Experience />
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          <Projects />
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          <Education />
        </div>
      </div>

      {/* PDF Viewer Section */}
      <div className="bg-white p-6 rounded shadow">
        <PDFViewer />
      </div>
    </div>
  );
};

export default ResumeBuilder;
