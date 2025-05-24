import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="min-h-[50vh] bg-base-200 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">About Our Resume Builder</h1>
          <p className="text-xl mb-8">
            We're revolutionizing resume creation with AI-powered tools that help job seekers
            craft professional resumes in minutes, not hours.
          </p>
          <Link to="/generate-resume" className="btn btn-primary">
            Try It Now
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="card bg-base-200 shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'AI-Powered',
                description: 'Our algorithms optimize your resume for both human readers and ATS systems.'
              },
              {
                icon: '💼',
                title: 'Job-Specific',
                description: 'Tailor your resume for specific roles with intelligent suggestions.'
              },
              {
                icon: '📊',
                title: 'Data-Driven',
                description: 'Get insights on how to improve your resume based on industry standards.'
              }
            ].map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="card-title text-2xl mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Enter Your Information',
                description: 'Fill in your work history, education, and skills through our intuitive interface.'
              },
              {
                step: '2',
                title: 'AI Analysis & Optimization',
                description: 'Our system analyzes your input and suggests improvements.'
              },
              {
                step: '3',
                title: 'Download & Apply',
                description: 'Get your professionally formatted resume in PDF format, ready to send to employers.'
              }
            ].map((item, index) => (
              <div key={index} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-xl">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-lg">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 text-xl">
            Join thousands of users who have improved their job prospects with our resume builder.
          </p>
          <Link to="/generate-resume" className="btn btn-primary btn-lg">
            Create Your Resume Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;