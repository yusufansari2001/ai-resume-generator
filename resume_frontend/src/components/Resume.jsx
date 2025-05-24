import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef } from "react";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

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

      <section className="flex justify-center mt-4">
        <button 
          onClick={handleDownloadPdf} 
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Download PDF
        </button>
      </section>
    </>
  );
};

export default Resume;