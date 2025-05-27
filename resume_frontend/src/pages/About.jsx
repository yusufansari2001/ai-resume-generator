import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🚀',
    title: 'AI-Powered',
    description:
      'Our algorithms optimize your resume for both human readers and ATS systems.',
  },
  {
    icon: '💼',
    title: 'Job-Specific',
    description:
      'Tailor your resume for specific roles with intelligent suggestions.',
  },
  {
    icon: '📊',
    title: 'Data-Driven',
    description:
      'Get insights on how to improve your resume based on industry standards.',
  },
];

const steps = [
  {
    step: '1',
    title: 'Enter Your Information',
    description:
      'Fill in your work history, education, and skills through our intuitive interface.',
  },
  {
    step: '2',
    title: 'AI Analysis & Optimization',
    description:
      'Our system analyzes your input and suggests improvements.',
  },
  {
    step: '3',
    title: 'Download & Apply',
    description:
      'Get your professionally formatted resume in PDF format, ready to send to employers.',
  },
];

function About() {
  return (
    <div className="bg-gradient-to-b from-base-100 to-base-200 text-gray-900">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">About Our Resume Builder</h1>
          <p className="text-xl mb-8 opacity-90">
            We're revolutionizing resume creation with AI-powered tools that help job seekers
            craft professional resumes in minutes, not hours.
          </p>
          <Link to="/generate-resume" className="btn btn-accent btn-lg shadow-md">
            Try It Now
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-base-100">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
            Our Mission
          </h2>
          <p className="text-lg mb-4">
            Our mission is to democratize access to professional resume building tools.
            We believe everyone deserves a resume that accurately represents their skills
            and experience, without needing to hire expensive professionals.
          </p>
          <p className="text-lg">
            Using AI-powered technology, we've simplified the resume creation process
            while maintaining the highest standards of quality.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-base-100 to-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-base-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
            How It Works
          </h2>
          <div className="space-y-8">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-xl flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 text-xl">
            Join thousands of users who have improved their job prospects with our resume builder.
          </p>
          <Link to="/generate-resume" className="btn btn-neutral btn-lg">
            Create Your Resume Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
