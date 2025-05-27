import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane, FaPlus } from "react-icons/fa";
import { generateResume } from "../api/ResumeService";
import { BiBook, BiEditAlt } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import Resume from "../components/Resume";

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: {
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
      linkedin: "",
      gitHub: "",
      portfolio: "",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    achievements: [],
    interests: [],
  });

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: data,
  });

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  // Field arrays
  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({ control, name: "certifications" });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });
  const achievementsFields = useFieldArray({ control, name: "achievements" });

  const onSubmit = (formData) => {
    setData({ ...formData });
    setShowFormUI(false);
    setShowPromptInput(false);
    setShowResumeUI(true);
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description!");
      return;
    }

    try {
      setLoading(true);
      const responseData = await generateResume(description);
      reset(responseData.data);
      setData(responseData.data);
      
      toast.success("Resume Generated Successfully!", {
        duration: 3000,
        position: "top-center",
      });
      
      setShowFormUI(true);
      setShowPromptInput(false);
      setShowResumeUI(false);
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error("Error Generating Resume! Please try again.");
    } finally {
      setLoading(false);
      setDescription("");
    }
  };

  const handleClear = () => setDescription("");

  const renderInput = (name, label, type = "text") => (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );

  const renderFieldArray = (fields, label, name, keys) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{label}</h3>
        {fields.fields.map((field, index) => (
          <div key={field.id} className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md mb-4">
            {keys.map((key) => (
              <div key={key} className="mb-4 last:mb-0">
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <FaTrash /> Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => fields.append(keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <FaPlus /> Add {label}
        </button>
      </div>
    );
  };

  const ShowInputField = () => (
    <div className="relative max-w-2xl w-full">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
            <FaBrain className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Resume Generator
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Describe your professional background and let our AI craft the perfect resume
          </p>
        </div>

        <textarea
          disabled={loading}
          className="w-full h-48 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm mb-6 resize-none"
          placeholder="Example: I'm a software engineer with 5 years of experience in React and Node.js. I've worked at tech companies building scalable web applications..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            disabled={loading || !description.trim()}
            onClick={handleGenerate}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <span className="relative z-10 flex items-center gap-2">
                  <FaPaperPlane /> Generate Resume
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </>
            )}
          </button>
          
          <button
            onClick={handleClear}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2"
          >
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    </div>
  );

  const showFormFunction = () => (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Customize Your
          </span>{" "}
          Resume
        </h1>
        <p className="text-xl text-gray-600">
          Fine-tune your AI-generated resume for the perfect application
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {renderInput("personalInformation.fullName", "Full Name")}
          {renderInput("personalInformation.email", "Email", "email")}
          {renderInput("personalInformation.phoneNumber", "Phone Number", "tel")}
          {renderInput("personalInformation.location", "Location")}
          {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
          {renderInput("personalInformation.gitHub", "GitHub", "url")}
          {renderInput("personalInformation.portfolio", "Portfolio", "url")}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Summary</h3>
          <textarea
            {...register("summary")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm"
            rows={4}
            placeholder="A results-driven software engineer with 5+ years of experience..."
          ></textarea>
        </div>

        {renderFieldArray(skillsFields, "Skills", "skills", ["title", "level"])}
        {renderFieldArray(experienceFields, "Experience", "experience", [
          "jobTitle", "company", "location", "duration", "responsibility"
        ])}
        {renderFieldArray(educationFields, "Education", "education", [
          "degree", "university", "location", "graduationYear"
        ])}
        {renderFieldArray(certificationsFields, "Certifications", "certifications", [
          "title", "issuingOrganization", "year"
        ])}
        {renderFieldArray(projectsFields, "Projects", "projects", [
          "title", "description", "technologiesUsed", "githubLink"
        ])}
        {renderFieldArray(achievementsFields, "Achievements", "achievements", [
          "title", "year", "extraInformation"
        ])}
        {renderFieldArray(languagesFields, "Languages", "languages", ["name"])}
        {renderFieldArray(interestsFields, "Interests", "interests", ["name"])}

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Generate Final Resume
        </button>
      </form>
    </div>
  );

  const showResume = () => (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Perfect
          </span>{" "}
          Resume
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ready to impress employers
        </p>
      </div>

      <Resume data={data} />

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <button
          onClick={() => {
            setShowPromptInput(true);
            setShowFormUI(false);
            setShowResumeUI(false);
          }}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2"
        >
          Generate Another
        </button>
        <button
          onClick={() => {
            setShowPromptInput(false);
            setShowFormUI(true);
            setShowResumeUI(false);
          }}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
        >
          <BiEditAlt /> Edit Resume
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      {showPromptInput && <ShowInputField />}
      {showFormUI && showFormFunction()}
      {showResumeUI && showResume()}
    </div>
  );
};

export default GenerateResume;