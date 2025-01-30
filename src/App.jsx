import { useEffect, useState } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./services/localStorage";
import PersonalInfo from "./components/forms/PersonalInfo";
import Education from "./components/forms/Education";
import Experience from "./components/forms/Experience";
import Skills from "./components/forms/Skills";
import Profile from "./components/forms/Profile";
import Projects from "./components/forms/Projects";
import PDFViewer from "./components/core/PDFViewer"; // Import PDFViewer
import { ResumeProvider } from "./contexts/ResumeContext";
 

const App = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
  });

  // Load saved data from localStorage on initialization
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setResumeData(savedData);
    }
  }, []);

  // Save data to localStorage when the user leaves the platform
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage(resumeData);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [resumeData]);

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col md:flex-row">
        {/* Left Panel: Form Sections */}
        <div className="w-full md:w-1/2 p-8 space-y-6 bg-white shadow-lg rounded-lg m-4">
          <h1 className="text-4xl font-extrabold text-black-700 mb-6">
            Resume Builder
          </h1>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black-600">
              Personal Information
            </h2>
            <PersonalInfo />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black-600">
              Profile
            </h2>
            <Profile />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black-600">
              Education
            </h2>
            <Education />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black-600">
              Experience
            </h2>
            <Experience />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black-600">
              Skills
            </h2>
            <Skills />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black-600">
              Projects
            </h2>
            <Projects />
          </section>
        </div>

        {/* Right Panel: PDF Viewer */}
        <div className="w-full md:w-1/2 p-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">
              Resume Preview
            </h2>
            <PDFViewer data={resumeData} />
          </div>
        </div>
      </div>
    </ResumeProvider>
    
  );
};

export default App;
