import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function ResumeForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");

  const [experiences, setExperiences] = useState([""]);
  const [projects, setProjects] = useState([""]);
  const [educations, setEducations] = useState([""]);
  const [certifications, setCertifications] = useState([""]);

  const handleArrayChange = (setter, array, index, value) => {
    const newArr = [...array];
    newArr[index] = value;
    setter(newArr);
  };

  const addEntry = (setter, array) => setter([...array, ""]);
  const removeEntry = (setter, array, index) =>
    setter(array.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      phone,
      linkedin,
      github,
      summary,
      skills,
      experiences,
      projects,
      educations,
      certifications,
    });
  };

  const renderDynamicField = (label, array, setter) => (
    <>
      <Form.Label>{label}</Form.Label>
      {array.map((item, idx) => (
        <Row className="mb-2" key={idx}>
          <Col>
            <Form.Control
              as="textarea"
              rows={2}
              value={item}
              onChange={(e) => handleArrayChange(setter, array, idx, e.target.value)}
              placeholder={`Enter ${label} #${idx + 1}`}
              required={idx === 0}
            />
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            {idx === array.length - 1 && (
              <Button variant="success" onClick={() => addEntry(setter, array)}>
                +
              </Button>
            )}
            {array.length > 1 && (
              <Button
                variant="danger"
                className="ms-2"
                onClick={() => removeEntry(setter, array, idx)}
              >
                −
              </Button>
            )}
          </Col>
        </Row>
      ))}
    </>
  );

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your full name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="example@mail.com"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Your phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>LinkedIn URL</Form.Label>
        <Form.Control
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>GitHub URL</Form.Label>
        <Form.Control
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/yourusername"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Professional Summary</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Write a brief summary about your professional background"
          required
        />
      </Form.Group>

      {renderDynamicField("Work Experience", experiences, setExperiences)}
      {renderDynamicField("Projects", projects, setProjects)}
      {renderDynamicField("Education", educations, setEducations)}
      {renderDynamicField("Certifications", certifications, setCertifications)}

      <Form.Group className="mb-3 mt-3">
        <Form.Label>Technical Skills (comma separated)</Form.Label>
        <Form.Control
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. AWS, React, Node.js, Docker"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Preview Resume
      </Button>
    </Form>
  );
}