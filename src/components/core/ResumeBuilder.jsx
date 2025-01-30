import { useContext, useState } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import PersonalInfo from "../forms/PersonalInfo";
import Profile from "../forms/Profile";
import Education from "../forms/Education";
import Experience from "../forms/Experience";
import Skills from "../forms/Skills";
import Projects from "../forms/Projects";
import PDFViewer from "./PDFViewer";
import DragDrop from "../utils/DragDrop";
import ImageUpload from "../utils/ImageUpload";
import TemplateSelector from "./TemplateSelector";
import Download from "./Download";

const DEFAULT_TEMPLATE = "modern";
const DEFAULT_THEME = "light";

const Sidebar = ({ setActiveSection, activeSection }) => (
  <div className="w-1/4 bg-gray-100 p-4 min-h-screen">
    <h2 className="text-xl font-bold mb-4">Navigation</h2>
    <ul className="space-y-2">
      {["personal-info", "profile", "skills", "experience", "projects", "education"].map((section) => (
        <li key={section}>
          <button
            onClick={() => setActiveSection(section)}
            className={`w-full text-left px-4 py-2 rounded transition ${
              activeSection === section ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            aria-current={activeSection === section ? "page" : undefined}
          >
            {section
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ResumeBuilder = () => {
  const { state, dispatch } = useContext(ResumeContext);

  // Load persistent settings
  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("selectedTemplate") || DEFAULT_TEMPLATE
  );
  const [appliedTemplate, setAppliedTemplate] = useState(selectedTemplate);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("selectedTheme") || DEFAULT_THEME
  );
  const [activeSection, setActiveSection] = useState("personal-info");

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem("selectedTemplate", template);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("selectedTheme", theme);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    dispatch({
      type: "REORDER_SECTIONS",
      payload: {
        sourceIndex: source.index,
        destinationIndex: destination.index,
      },
    });
  };

  const sectionComponents = {
    "personal-info": (
      <>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Personal Information</h2>
        <PersonalInfo />
        <ImageUpload />
      </>
    ),
    profile: (
      <>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Profile</h2>
        <Profile />
      </>
    ),
    skills: (
      <>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Skills</h2>
        <Skills />
      </>
    ),
    experience: (
      <>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Experience</h2>
        <Experience />
      </>
    ),
    projects: (
      <>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Projects</h2>
        <Projects />
      </>
    ),
    education: (
      <>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Education</h2>
        <Education />
      </>
    ),
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-100 min-h-screen">
        {/* Form Section */}
        <div>
          <h1 className="text-4xl font-extrabold mb-6 text-gray-700">Resume Builder</h1>

          {/* Template and Theme Selector */}
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
            selectedTheme={selectedTheme}
            onThemeChange={handleThemeChange}
            onApplyTemplate={() => setAppliedTemplate(selectedTemplate)}
          />

          {/* Render Active Section */}
          {sectionComponents[activeSection] || (
            <p className="text-gray-500">Select a section to begin editing.</p>
          )}

          {/* Dynamic Sections with Drag-and-Drop */}
          <DragDrop sections={state.sections} onDragEnd={handleDragEnd}>
            {(section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">{section.title}</h2>
                {section.type === "skills" && <Skills />}
                {section.type === "experience" && <Experience />}
                {section.type === "projects" && <Projects />}
                {section.type === "education" && <Education />}
              </div>
            )}
          </DragDrop>

          {/* Download Button */}
          <div className="mt-6">
            <Download
              selectedTemplate={appliedTemplate} // Pass applied template
              selectedTheme={selectedTheme} // Pass theme to Download
            />
          </div>
        </div>

        {/* PDF Viewer Section */}
        <div className="bg-white p-6 rounded shadow">
          <PDFViewer
            selectedTemplate={appliedTemplate} // Pass applied template for rendering
            selectedTheme={selectedTheme} // Pass theme to PDFViewer
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
