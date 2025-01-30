import { useContext, useState } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import generateComplexPDF from "../../services/pdfGenerator";

const Download = () => {
  const { state } = useContext(ResumeContext);
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const handleDownload = () => {
    if (selectedFormat === "pdf") {
      generateComplexPDF(state); // Call the new PDF generator
    } else if (selectedFormat === "json") {
      const jsonData = JSON.stringify(state, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resume.json";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* File Format Selection */}
      <label className="text-sm font-medium text-gray-700">
        Select File Format
      </label>
      <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
        className="w-2/3 max-w-md p-2 text-base border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
      >
        <option value="pdf">PDF</option>
        <option value="json">JSON</option>
      </select>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="cta flex items-center justify-center bg-gradient-to-r from-primary to-primaryDark text-white py-3 px-6 text-lg rounded-lg shadow-lg hover:scale-105 hover:shadow-custom-dark transition-all"
      >
        <span className="hover-underline-animation">Download Resume</span>
      </button>
    </div>
  );
};

export default Download;
