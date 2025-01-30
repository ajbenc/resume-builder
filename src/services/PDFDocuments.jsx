import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const generatePDFDocument = async (data) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const margin = 50;
    let cursorY = page.getHeight() - margin;

    // Colors
    const primaryColor = rgb(0, 0, 0); // Black for titles
    const secondaryColor = rgb(0.4, 0.4, 0.4); // Gray for details
    const accentColor = rgb(0, 0, 0); // Black for dividers and emphasis
    const dividerColor = rgb(0.85, 0.85, 0.85); // Light gray for dividers

    // Utility function to draw text with proper line spacing
    const drawText = (text, x, y, size = 12, color = primaryColor, isBold = false, lineHeight = 16) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: isBold ? fontBold : font,
        color,
      });
      return y - lineHeight; // Move cursor down
    };

    // Draw section headers
    const drawSectionHeader = (text, y) => {
      let newY = drawText(text, margin, y, 18, primaryColor, true, 22);
      page.drawLine({
        start: { x: margin, y: newY + 5 },
        end: { x: page.getWidth() - margin, y: newY + 5 },
        thickness: 1.5,
        color: accentColor,
      });
      return newY - 15; // Add spacing
    };

    // Draw dividers
    const drawDivider = (y) => {
      page.drawLine({
        start: { x: margin, y },
        end: { x: page.getWidth() - margin, y },
        thickness: 1,
        color: dividerColor,
      });
      return y - 20;
    };

    // Load profile image if available
    let profileImage;
    if (data.personalInfo.profilePicture) {
      try {
        const imageData = data.personalInfo.profilePicture;
        if (imageData.startsWith("data:image/png")) {
          profileImage = await pdfDoc.embedPng(imageData.split(",")[1]);
        } else if (imageData.startsWith("data:image/jpeg")) {
          profileImage = await pdfDoc.embedJpg(imageData.split(",")[1]);
        }
      } catch (error) {
        console.error("Error processing profile image:", error);
      }
    }

    // Profile Header
    if (profileImage) {
      const imgSize = 80;
      const imgX = margin;
      const imgY = cursorY - imgSize;
      page.drawImage(profileImage, { x: imgX, y: imgY, width: imgSize, height: imgSize });

      const textX = imgX + imgSize + 20;
      drawText(data.personalInfo.name || "Your Name", textX, cursorY - 5, 24, primaryColor, true);
      cursorY -= 30;
      drawText(data.personalInfo.email || "your.email@example.com", textX, cursorY, 12, secondaryColor);
      cursorY -= 18;
      drawText(data.personalInfo.phone || "123-456-7890", textX, cursorY, 12, secondaryColor);
      cursorY -= 40;
    } else {
      drawText(data.personalInfo.name || "Your Name", margin, cursorY, 24, primaryColor, true);
      cursorY -= 30;
      drawText(data.personalInfo.email || "your.email@example.com", margin, cursorY, 12, secondaryColor);
      cursorY -= 18;
      drawText(data.personalInfo.phone || "123-456-7890", margin, cursorY, 12, secondaryColor);
      cursorY -= 40;
    }

    cursorY = drawDivider(cursorY);

    // Profile Summary
    if (data.personalInfo.summary) {
      cursorY = drawSectionHeader("Profile Summary", cursorY);
      cursorY = drawText(data.personalInfo.summary, margin, cursorY, 12, secondaryColor);
      cursorY -= 20;
    }

    // Skills Section
    if (data.skills.length > 0) {
      cursorY = drawSectionHeader("Skills", cursorY);
      for (const skill of data.skills) {
        cursorY = drawText(`• ${skill}`, margin + 10, cursorY, 12, secondaryColor);
      }
      cursorY -= 20;
    }

    // Experience Section
    if (data.experience.length > 0) {
      cursorY = drawSectionHeader("Work Experience", cursorY);
      for (const exp of data.experience) {
        cursorY = drawText(exp.role, margin, cursorY, 14, primaryColor, true);
        cursorY = drawText(exp.company, margin, cursorY, 12, secondaryColor);
        cursorY = drawText(`${exp.startDate} - ${exp.endDate || "Present"}`, margin, cursorY, 12, secondaryColor);
        if (exp.description) {
          const lines = exp.description.split("\n");
          for (const line of lines) {
            cursorY = drawText(`• ${line}`, margin + 10, cursorY, 12, secondaryColor);
          }
        }
        cursorY -= 10;
      }
      cursorY -= 10;
    }

    // Education Section
    if (data.education.length > 0) {
      cursorY = drawSectionHeader("Education", cursorY);
      for (const edu of data.education) {
        cursorY = drawText(edu.degree, margin, cursorY, 14, primaryColor, true);
        cursorY = drawText(edu.school, margin, cursorY, 12, secondaryColor);
        cursorY = drawText(`${edu.startDate} - ${edu.endDate || "Present"}`, margin, cursorY, 12, secondaryColor);
        cursorY -= 10;
      }
      cursorY -= 10;
    }

    // Projects Section
    if (data.projects && data.projects.length > 0) {
      cursorY = drawSectionHeader("Projects", cursorY);
      for (const proj of data.projects) {
        cursorY = drawText(proj.name, margin, cursorY, 14, primaryColor, true);
        if (proj.description) {
          const lines = proj.description.split("\n");
          for (const line of lines) {
            cursorY = drawText(`• ${line}`, margin + 10, cursorY, 12, secondaryColor);
          }
        }
        if (proj.technologies) {
          cursorY = drawText(`Technologies: ${proj.technologies}`, margin + 10, cursorY, 12, secondaryColor);
        }
        cursorY -= 10;
      }
      cursorY -= 10;
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("PDF generation failed.");
  }
};

export default generatePDFDocument;
