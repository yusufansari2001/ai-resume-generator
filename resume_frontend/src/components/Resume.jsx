import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef, useState } from "react";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);
  const [atsScore, setAtsScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownloadPdf = () => {
    toPng(resumeRef.current, { quality: 1.0 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(dataUrl, "PNG", 10, 10, 190, 0);
        pdf.save(`${data.personalInformation.fullName}.pdf`);
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  };

  const handleCheckATSScore = async () => {
    setIsLoading(true);
    setError(null);
    setAtsScore(null);

    try {
      const requestPayload = {
        think: null,
        data: data
      };

      const response = await fetch("http://localhost:8080/api/v1/resume/calculate-ats-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("ATS Score result:", result);
      setAtsScore(result.atsScore);
    } catch (error) {
      console.error("Error fetching ATS score:", error);
      setError("Failed to calculate ATS score. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        ref={resumeRef}
        className="max-w-4xl mx-auto p-8 space-y-6 bg-white text-black"
      >
        {/* Header Section */}
        <div className="text-center space-y-2 border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold uppercase">
            {data.personalInformation.fullName}
          </h1>
          <p className="text-sm text-gray-600">
            {data.personalInformation.location}
          </p>

          <div className="flex justify-center space-x-4 mt-2 text-sm">
            {data.personalInformation.email && (
              <a
                href={`mailto:${data.personalInformation.email}`}
                className="flex items-center text-gray-700 hover:underline"
              >
                <FaEnvelope className="mr-1" /> {data.personalInformation.email}
              </a>
            )}
            {data.personalInformation.phoneNumber && (
              <p className="flex items-center text-gray-700">
                <FaPhone className="mr-1" />{" "}
                {data.personalInformation.phoneNumber}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-2 text-sm">
            {data.personalInformation.gitHub && (
              <a
                href={data.personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:underline flex items-center"
              >
                <FaGithub className="mr-1" /> GitHub
              </a>
            )}
            {data.personalInformation.linkedIn && (
              <a
                href={data.personalInformation.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:underline flex items-center"
              >
                <FaLinkedin className="mr-1" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <section className="mt-4">
          <h2 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1">
            Summary
          </h2>
          <p className="text-gray-700 mt-2 text-sm">{data.summary}</p>
        </section>

        {/* Skills Section */}
        <section className="mt-4">
          <h2 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="inline-block bg-gray-100 text-gray-800 rounded px-2 py-1 text-xs font-medium whitespace-nowrap"
              >
                {skill.title}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mt-4">
          <h2 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1">
            Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.jobTitle}</h3>
                <p className="text-gray-600 text-sm">{exp.duration}</p>
              </div>
              <p className="text-gray-700 text-sm italic">
                {exp.company} | {exp.location}
              </p>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                {exp.responsibility.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="mt-4">
          <h2 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.graduationYear}</p>
              </div>
              <p className="text-gray-700 text-sm">
                {edu.university}, {edu.location}
              </p>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="mt-4">
          <h2 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1">
            Projects
          </h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mt-3">
              <h3 className="font-bold">{proj.title}</h3>
              <p className="text-gray-700 text-sm mt-1">
                {proj.description}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                <span className="font-medium">Technologies:</span> {proj.technologiesUsed}
              </p>
              {proj.githubLink && (
                <a
                  href={proj.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs"
                >
                  View on GitHub
                </a>
              )}
            </div>
          ))}
        </section>

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <section className="mt-4">
            <h2 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1">
              Certifications
            </h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="mt-3">
                <div className="flex justify-between">
                  <h3 className="font-bold">{cert.title}</h3>
                  <p className="text-gray-600 text-sm">{cert.year}</p>
                </div>
                <p className="text-gray-700 text-sm">
                  {cert.issuingOrganization}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Languages Section */}
        {data.languages.length > 0 && (
          <section className="mt-4">
            <h2 className="text-xl font-semibold uppercase border-b border-gray-300 pb-1">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.languages.map((lang, index) => (
                <div
                  key={index}
                  className="inline-block bg-gray-100 text-gray-800 rounded px-2 py-1 text-xs font-medium whitespace-nowrap"
                >
                  {lang.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handleDownloadPdf}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Download PDF
        </button>

        <button
          onClick={handleCheckATSScore}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Calculating..." : "ATS Score"}
        </button>
      </section>

      {/* ATS Score Display Section */}
      {(atsScore !== null || error) && (
        <section className="flex justify-center mt-4">
          <div className="bg-gray-50 border rounded-lg p-4 max-w-md w-full text-center">
            {error ? (
              <div className="text-red-600">
                <h3 className="font-semibold text-lg">Error</h3>
                <p className="text-sm mt-1">{error}</p>
              </div>
            ) : (
              <div className="text-gray-800">
                <h3 className="font-semibold text-lg">ATS Score</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-blue-600">{atsScore}</span>
                  <span className="text-lg text-gray-600">/100</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {atsScore >= 80 ? "Excellent ATS compatibility!" : 
                   atsScore >= 60 ? "Good ATS compatibility." : 
                   "Consider optimizing for better ATS compatibility."}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Resume;