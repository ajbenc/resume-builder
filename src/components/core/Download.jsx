import { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import generatePDF from "../../services/pdfGenerator.jsx";

const Download = () => {
  const { state } = useContext(ResumeContext);

  const handleDownload = () => {
    generatePDF(state); // Pass the entire state or the relevant data
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Download PDF
    </button>
  );
};

export default Download;
