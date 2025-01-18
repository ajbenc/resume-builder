import { pdf } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocuments.jsx";

const generatePDF = async (data) => {
  const pdfDoc = <PDFDocument data={data} />;

  const blob = await pdf(pdfDoc).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "resume.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default generatePDF;
