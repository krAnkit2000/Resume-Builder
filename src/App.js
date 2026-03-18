// src/App.jsx
import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import DownloadButtons from "./components/DownloadButtons";
import { Container } from "react-bootstrap";

function App() {
  const [resumeData, setResumeData] = useState(null);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">ATS-Friendly Resume Builder</h1>
      <ResumeForm onSubmit={setResumeData} />
      <ResumePreview data={resumeData} />
      <DownloadButtons data={resumeData} />
    </Container>
  );
}

export default App;