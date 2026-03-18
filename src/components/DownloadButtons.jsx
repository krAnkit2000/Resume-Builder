// src/components/DownloadButtons.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function DownloadButtons({ data }) {
  if (!data) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text(data.name, 10, y); y += 10;
    doc.setFontSize(12);
    doc.text(`${data.email} | ${data.phone}`, 10, y); y += 7;
    doc.text(`LinkedIn: ${data.linkedin} | GitHub: ${data.github}`, 10, y); y += 10;

    doc.text("Professional Summary:", 10, y); y += 7;
    doc.text(data.summary, 10, y); y += 10;

    const renderArray = (label, array) => {
      doc.text(`${label}:`, 10, y); y += 7;
      array.forEach(item => { doc.text("- " + item, 12, y); y += 7; });
      y += 5;
    };

    renderArray("Work Experience", data.experiences);
    renderArray("Projects", data.projects);
    renderArray("Education", data.educations);
    renderArray("Certifications", data.certifications);

    doc.text("Technical Skills: " + data.skills, 10, y);

    doc.save("resume.pdf");
  };

  const downloadWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({ children: [new TextRun({ text: data.name, bold: true })] }),
          new Paragraph(`${data.email} | ${data.phone}`),
          new Paragraph(`LinkedIn: ${data.linkedin} | GitHub: ${data.github}`),
          new Paragraph("Professional Summary:"),
          new Paragraph(data.summary),
          new Paragraph("Work Experience:"),
          ...data.experiences.map(e => new Paragraph("- " + e)),
          new Paragraph("Projects:"),
          ...data.projects.map(p => new Paragraph("- " + p)),
          new Paragraph("Education:"),
          ...data.educations.map(ed => new Paragraph("- " + ed)),
          new Paragraph("Certifications:"),
          ...data.certifications.map(c => new Paragraph("- " + c)),
          new Paragraph("Technical Skills:"),
          ...data.skills.split(",").map(s => new Paragraph(s.trim())),
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3">
      <Button className="me-2" variant="success" onClick={downloadPDF}>Download PDF</Button>
      <Button variant="warning" onClick={downloadWord}>Download Word</Button>
    </div>
  );
}