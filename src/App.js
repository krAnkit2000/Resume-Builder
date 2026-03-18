import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import DownloadButtons from "./components/DownloadButtons";

export default function App() {
  const [resumeData, setResumeData] = useState(null);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">ATS-friendly Resume Builder</h1>

      <ResumeForm onSubmit={(data) => setResumeData(data)} />

      {resumeData && (
        <>
          <ResumePreview data={resumeData} />
          <DownloadButtons data={resumeData} />
        </>
      )}
    </div>
  );
}