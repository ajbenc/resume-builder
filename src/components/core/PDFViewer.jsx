// src/components/core/PDFViewer.jsx
import { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import Download from "./Download";
const PDFViewer = () => {
  const { state } = useContext(ResumeContext);
  const {
    personalInfo: { name, email, phone, summary },
    experience,
    education,
    projects,
    skills,
  } = state;

  return (
    <div className="bg-white p-6 rounded shadow-md" id="pdf-content">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">{name || "Your Name"}</h1>
        <p>{email || "your.email@example.com"}</p>
        <p>{phone || "123-456-7890"}</p>
      </div>
      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Profile Summary</h2>
          <p className="whitespace-pre-wrap break-words">{summary}</p>
        </div>
      )}
      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <ul className="list-disc pl-5">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Experience Section */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="border-b pb-2">
              <h3 className="font-semibold">
                {exp.role} at {exp.company}
              </h3>
              <p className="text-gray-500 text-sm">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
              <ul className="list-disc pl-5">
                {exp.description.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="border-b pb-2">
              <h3 className="font-semibold">
                {edu.degree} at {edu.school}
              </h3>
              <p className="text-gray-500 text-sm">
                {edu.startDate} - {edu.endDate || "Present"}
              </p>
              <ul className="list-disc pl-5">
                {edu.description.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          {projects.map((proj, index) => (
            <div key={index} className="border-b pb-2">
              <h3 className="font-semibold">{proj.name}</h3>
              <ul className="list-disc pl-5">
                {proj.description.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p>Technologies: {proj.technologies}</p>
            </div>
          ))}
        </div>
      )}
      {/* Placeholder for Empty State */}
      {experience.length === 0 &&
        education.length === 0 &&
        projects.length === 0 && (
          <div className="text-gray-500 text-center">
            Add sections to preview them here.
          </div>
        )}
      {/* Download Button */}
      <Download /> {/* Include the Download component */}
      {/* Footer */}
      <footer className="mt-6 border-t pt-4 text-center text-gray-500">
        <i>Preview of your resume</i>
      </footer>
    </div>
  );
};

export default PDFViewer;
