import React from "react";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function DownloadButtons({ data }) {
  if (!data) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    // Name - center and bold, size 20
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(data.name, 105, y, { align: "center" });
    y += 10;

    // Contact - smaller font, centered
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const contactLine = `${data.email} • ${data.phone} • LinkedIn: ${data.linkedin} • GitHub: ${data.github}`;
    doc.text(contactLine, 105, y, { align: "center", maxWidth: 190 });
    y += 12;

    const drawSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title.toUpperCase(), 10, y);
      y += 3;
      doc.setLineWidth(0.5);
      doc.line(10, y, 200, y);
      y += 6;
    };

    const drawBullets = (items) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      items.forEach((item) => {
        const lines = doc.splitTextToSize(item, 180);
        lines.forEach((line, i) => {
          if (i === 0) doc.text(`• ${line}`, 15, y);
          else doc.text(line, 20, y);
          y += 6;
        });
        y += 3;
      });
    };

    // Professional Summary
    drawSectionTitle("Professional Summary");
    const summaryLines = doc.splitTextToSize(data.summary, 190);
    summaryLines.forEach((line) => {
      doc.text(line, 10, y);
      y += 6;
    });
    y += 5;

    // Other sections
    const sections = [
      { title: "Work Experience", items: data.experiences },
      { title: "Projects", items: data.projects },
      { title: "Education", items: data.educations },
      { title: "Certifications", items: data.certifications },
    ];

    sections.forEach(({ title, items }) => {
      drawSectionTitle(title);
      drawBullets(items);
    });

    // Technical Skills
    drawSectionTitle("Technical Skills");
    const skillsText = data.skills.split(",").map((s) => s.trim()).join(", ");
    const skillLines = doc.splitTextToSize(skillsText, 190);
    skillLines.forEach((line) => {
      doc.text(line, 10, y);
      y += 6;
    });

    doc.save("resume.pdf");
  };

  const downloadWord = async () => {
    const createSectionTitle = (text) =>
      new Paragraph({
        text: text.toUpperCase(),
        bold: true,
        spacing: { before: 200, after: 100 },
        thematicBreak: true,
      });

    const createBullets = (items) =>
      items.map(
        (item) =>
          new Paragraph({
            text: item,
            bullet: { level: 0 },
            spacing: { after: 100 },
          })
      );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: data.name, bold: true, size: 36 })],
              alignment: "center",
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `${data.email} • ${data.phone} • LinkedIn: ${data.linkedin} • GitHub: ${data.github}`,
              alignment: "center",
              spacing: { after: 200 },
            }),

            createSectionTitle("Professional Summary"),
            new Paragraph({ text: data.summary, spacing: { after: 200 } }),

            createSectionTitle("Work Experience"),
            ...createBullets(data.experiences),

            createSectionTitle("Projects"),
            ...createBullets(data.projects),

            createSectionTitle("Education"),
            ...createBullets(data.educations),

            createSectionTitle("Certifications"),
            ...createBullets(data.certifications),

            createSectionTitle("Technical Skills"),
            new Paragraph({ text: data.skills }),
          ],
        },
      ],
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
      <Button className="me-2" variant="success" onClick={downloadPDF}>
        Download PDF
      </Button>
      <Button variant="warning" onClick={downloadWord}>
        Download Word
      </Button>
    </div>
  );
}