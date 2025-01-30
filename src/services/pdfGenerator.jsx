import generatePDFDocument from "./PDFDocuments";

const generateComplexPDF = async (data, selectedTemplate, selectedTheme) => {
  try {
    // Generate the PDF using pdf-lib
    const pdfBytes = await generatePDFDocument(
      data,
      selectedTemplate,
      selectedTheme
    );

    // Convert PDF to a Blob
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    // Generate a dynamic filename
    const userName = data?.personalInfo?.name || "resume";
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:T]/g, "-");
    const fileName = `${userName}-${selectedTemplate}-${timestamp}.pdf`;

    // Create a URL for the Blob and initiate download
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate the PDF. Please try again.");
  }
};

export default generateComplexPDF;
