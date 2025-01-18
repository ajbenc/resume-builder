import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const generatePDFDocument = async (data) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const margin = 50;
    let cursorY = page.getHeight() - margin;

    // Embed profile picture
    let profileImage;
    const imgSize = 80; // Profile picture size
    if (data.personalInfo.profilePicture) {
      try {
        const imageData = data.personalInfo.profilePicture;
        const isPng = imageData.startsWith("data:image/png");
        const isJpg = imageData.startsWith("data:image/jpeg");

        if (isPng) {
          profileImage = await pdfDoc.embedPng(imageData.split(",")[1]);
        } else if (isJpg) {
          profileImage = await pdfDoc.embedJpg(imageData.split(",")[1]);
        }
      } catch (error) {
        console.error("Error processing profile image:", error);
      }
    }

    const drawText = (
      text,
      x,
      y,
      size = 12,
      color = rgb(0, 0, 0),
      isBold = false
    ) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: isBold ? fontBold : font,
        color,
      });
    };

    const drawDivider = (y) => {
      page.drawRectangle({
        x: margin,
        y,
        width: page.getWidth() - 2 * margin,
        height: 1,
        color: rgb(0.8, 0.8, 0.8),
      });
    };

    // Profile Section
    if (profileImage) {
      const imgX = margin;
      const imgY = cursorY - imgSize;
      page.drawImage(profileImage, {
        x: imgX,
        y: imgY,
        width: imgSize,
        height: imgSize,
      });

      const textX = imgX + imgSize + 20;
      drawText(
        data.personalInfo.name || "Your Name",
        textX,
        cursorY - 10,
        26,
        rgb(0, 0, 0),
        true
      );
      cursorY -= 35;
      drawText(
        data.personalInfo.email || "your.email@example.com",
        textX,
        cursorY,
        14
      );
      cursorY -= 20;
      drawText(data.personalInfo.phone || "123-456-7890", textX, cursorY, 14);
      cursorY -= 50;
    }

    // Profile Summary
    if (data.personalInfo.summary) {
      drawDivider(cursorY);
      cursorY -= 20;
      drawText("Profile Summary", margin, cursorY, 18, rgb(0, 0, 0), true);
      cursorY -= 20;
      drawText(data.personalInfo.summary, margin, cursorY, 12);
      cursorY -= 40;
    }

    // Skills Section
    if (data.skills.length > 0) {
      drawDivider(cursorY);
      cursorY -= 20;
      drawText("Skills", margin, cursorY, 18, rgb(0, 0, 0), true);
      cursorY -= 20;
      for (const skill of data.skills) {
        drawText(`• ${skill}`, margin, cursorY, 12);
        cursorY -= 15;
      }
      cursorY -= 15;
    }

    // Experience Section
    if (data.experience.length > 0) {
      drawDivider(cursorY);
      cursorY -= 20;
      drawText("Experience", margin, cursorY, 18, rgb(0, 0, 0), true);
      cursorY -= 20;
      for (const exp of data.experience) {
        drawText(
          `${exp.role} at ${exp.company}`,
          margin,
          cursorY,
          14,
          rgb(0, 0, 0),
          true
        );
        cursorY -= 15;
        drawText(
          `${exp.startDate} - ${exp.endDate || "Present"}`,
          margin,
          cursorY,
          12,
          rgb(0.5, 0.5, 0.5)
        );
        cursorY -= 15;
        drawText(exp.description || "", margin, cursorY, 12);
        cursorY -= 30;
      }
    }

    // Education Section
    if (data.education.length > 0) {
      drawDivider(cursorY);
      cursorY -= 20;
      drawText("Education", margin, cursorY, 18, rgb(0, 0, 0), true);
      cursorY -= 20;
      for (const edu of data.education) {
        drawText(
          `${edu.degree} at ${edu.school}`,
          margin,
          cursorY,
          14,
          rgb(0, 0, 0),
          true
        );
        cursorY -= 15;
        drawText(
          `${edu.startDate} - ${edu.endDate || "Present"}`,
          margin,
          cursorY,
          12,
          rgb(0.5, 0.5, 0.5)
        );
        cursorY -= 30;
      }
    }

    // Projects Section (NEW SECTION ADDED HERE)
    if (data.projects && data.projects.length > 0) {
      drawDivider(cursorY);
      cursorY -= 20;
      drawText("Projects", margin, cursorY, 18, rgb(0, 0, 0), true);
      cursorY -= 20;

      for (const project of data.projects) {
        // Project Name
        drawText(project.name, margin, cursorY, 14, rgb(0, 0, 0), true);
        cursorY -= 15;

        // Project Description with bullet points
        if (project.description) {
          const lines = project.description.split("\n");
          for (const line of lines) {
            drawText(`• ${line}`, margin, cursorY, 12);
            cursorY -= 12;
          }
        }

        // Technologies
        if (project.technologies) {
          drawText(
            `Technologies: ${project.technologies}`,
            margin,
            cursorY,
            12,
            rgb(0.3, 0.3, 0.3)
          );
          cursorY -= 15;
        }

        cursorY -= 10; // Space between projects
      }
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("PDF generation failed.");
  }
};

export default generatePDFDocument;
