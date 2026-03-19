import React from "react";
import { Card } from "react-bootstrap";

export default function ResumePreview({ data }) {
  if (!data) return null;

  const skills = data.skills ? data.skills.split(",") : [];

  const sectionTitleStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid black",
    paddingBottom: "4px",
    marginTop: "20px",
    marginBottom: "8px",
    fontSize: "15px",
    textTransform: "uppercase",
  };

  const bulletListStyle = {
    paddingLeft: "20px",
    marginTop: 0,
    marginBottom: "15px",
    textAlign: "justify",
  };

  return (
    <Card className="p-4 mt-4" style={{ fontFamily: "'Arial', sans-serif", fontSize: "14px" }}>
      {/* Name */}
      <div style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center", marginBottom: "6px" }}>
        {data.name}
      </div>

      {/* Contact info */}
      <div style={{ fontSize: "12px", textAlign: "center", marginBottom: "15px" }}>
        {data.email} &#8226; {data.phone} &#8226;{" "}
        <a href={data.linkedin} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
          {data.linkedin.replace(/^https?:\/\//, "")}
        </a>{" "}
        &#8226;{" "}
        <a href={data.github} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
          {data.github.replace(/^https?:\/\//, "")}
        </a>
      </div>

      {/* Professional Summary */}
      <div style={sectionTitleStyle}>Professional Summary</div>
      <p style={{ textAlign: "justify", marginTop: 0 }}>{data.summary}</p>

      {/* Work Experience */}
      <div style={sectionTitleStyle}>Work Experience</div>
      <ul style={bulletListStyle}>
        {data.experiences.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "6px" }}>
            {item}
          </li>
        ))}
      </ul>

      {/* Projects */}
      <div style={sectionTitleStyle}>Projects</div>
      <ul style={bulletListStyle}>
        {data.projects.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "6px" }}>
            {item}
          </li>
        ))}
      </ul>

      {/* Education */}
      <div style={sectionTitleStyle}>Education</div>
      <ul style={bulletListStyle}>
        {data.educations.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "6px" }}>
            {item}
          </li>
        ))}
      </ul>

      {/* Certifications */}
      <div style={sectionTitleStyle}>Certifications</div>
      <ul style={bulletListStyle}>
        {data.certifications.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "6px" }}>
            {item}
          </li>
        ))}
      </ul>

      {/* Technical Skills */}
      <div style={sectionTitleStyle}>Technical Skills</div>
      <p style={{ marginTop: 0 }}>{skills.map((s) => s.trim()).join(", ")}</p>
    </Card>
  );
}