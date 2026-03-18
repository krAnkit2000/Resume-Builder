// src/components/ResumePreview.jsx
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function ResumePreview({ data }) {
  if (!data) return null;
  const skills = data.skills ? data.skills.split(",") : [];

  const renderList = (label, array) => (
    <>
      <Card.Text><strong>{label}:</strong></Card.Text>
      <ListGroup className="mb-3">
        {array.map((item, idx) => <ListGroup.Item key={idx}>{item}</ListGroup.Item>)}
      </ListGroup>
    </>
  );

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {data.email} | {data.phone} <br/>
          <a href={data.linkedin} target="_blank" rel="noreferrer">{data.linkedin}</a> | <a href={data.github} target="_blank" rel="noreferrer">{data.github}</a>
        </Card.Subtitle>

        <Card.Text><strong>Professional Summary:</strong><br />{data.summary}</Card.Text>

        {renderList("Work Experience", data.experiences)}
        {renderList("Projects", data.projects)}
        {renderList("Education", data.educations)}
        {renderList("Certifications", data.certifications)}

        <Card.Text><strong>Technical Skills:</strong></Card.Text>
        <ListGroup>
          {skills.map((s, idx) => <ListGroup.Item key={idx}>{s.trim()}</ListGroup.Item>)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}