import { useContext } from "react";
import DOMPurify from "dompurify";
import { ResumeContext } from "../../contexts/ResumeContext";
import Download from "./Download";

const PDFViewer = ({ selectedTemplate }) => {
  const { state } = useContext(ResumeContext);
  const {
    personalInfo: { name, email, phone, summary, profilePicture },
    experience,
    education,
    projects,
    skills,
  } = state;

  const renderRichText = (htmlContent) => {
    const sanitizedHTML = DOMPurify.sanitize(htmlContent || "");
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
  };

  const renderModernTemplate = () => (
    <div
      className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-xl shadow-lg border border-gray-200"
      id="pdf-content"
    >
      {/* Header */}
      <div className="border-b border-gray-300 pb-6 mb-6 flex items-center">
        {profilePicture && (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-6 shadow-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {name || "Your Name"}
          </h1>
          <p className="text-gray-600">{email || "your.email@example.com"}</p>
          <p className="text-gray-600">{phone || "123-456-7890"}</p>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primaryDark mb-2">
            Profile Summary
          </h2>
          <div className="text-gray-700 whitespace-pre-wrap break-words">
            {renderRichText(summary)}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primaryDark mb-2">
            Skills
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primaryDark mb-2">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div
              key={index}
              className="mb-4 bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <h3 className="font-semibold text-gray-800">
                {exp.role} at {exp.company}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
              <div className="text-gray-700 break-words whitespace-pre-wrap">
                {renderRichText(exp.description)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primaryDark mb-2">
            Education
          </h2>
          {education.map((edu, index) => (
            <div
              key={index}
              className="mb-4 bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <h3 className="font-semibold text-gray-800">
                {edu.degree} at {edu.school}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {edu.startDate} - {edu.endDate || "Present"}
              </p>
              <div className="text-gray-700 break-words whitespace-pre-wrap overflow-auto max-h-32">
                {edu.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primaryDark mb-2">
            Projects
          </h2>
          {projects.map((proj, index) => (
            <div
              key={index}
              className="mb-4 bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <h3 className="font-semibold text-gray-800">{proj.name}</h3>
              <div className="text-gray-700 break-words whitespace-pre-wrap">
                {proj.description}
              </div>
              <p className="text-gray-600 mt-2">
                Technologies: {proj.technologies}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder for Empty State */}
      {experience.length === 0 &&
        education.length === 0 &&
        projects.length === 0 && (
          <div className="text-gray-500 text-center italic">
            Add sections to preview them here.
          </div>
        )}

      {/* Download Button */}
      <div className="mt-6">
        <Download />
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="p-8 rounded-lg border border-gray-300 bg-white shadow">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
        {name || "Your Name"}
      </h1>
      {/* Similar logic as modern, different design */}
    </div>
  );

  // Template Rendering Logic
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return renderModernTemplate();
      case "classic":
        return renderClassicTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return renderTemplate();
};

export default PDFViewer;
