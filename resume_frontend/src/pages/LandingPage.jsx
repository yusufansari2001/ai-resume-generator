import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Generation",
      description: "Advanced algorithms analyze your skills and create tailored content that stands out to employers.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🎨",
      title: "Designer Templates",
      description: "Professionally crafted layouts that adapt to your industry and personal style preferences.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🎯",
      title: "Industry Optimization",
      description: "Smart matching technology ensures your resume speaks the language of your target industry.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      quote: "This AI resume maker saved me so much time! My resume looks professional and got me multiple interviews.",
      name: "John Doe",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      quote: "I love the templates and the ease of use. Highly recommend this tool to anyone looking for a job.",
      name: "Jane Smith",
      role: "Marketing Specialist",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Floating Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              scrollY > dot * 800 ? 'bg-indigo-600 border-indigo-600' : 'bg-transparent border-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Hero Section with Diagonal Split */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-ping"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            {/* Left: Hero Content */}
            <div className="space-y-8 lg:pr-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">AI-Powered Resume Builder</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Craft Your
                </span>
                <br />
                <span className="text-gray-900">Dream Resume</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Transform your career story into a compelling resume that opens doors. 
                Our AI understands what recruiters want to see.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/generate-resume" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative z-10">Start Building Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300">
                  See Examples
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">50K+</div>
                  <div className="text-sm text-gray-500">Resumes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">4.9★</div>
                  <div className="text-sm text-gray-500">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Feature Showcase */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      activeFeature === index 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-30 transform translate-y-4'
                    }`}
                  >
                    {activeFeature === index && (
                      <div className="text-center space-y-6">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${feature.gradient} text-white text-4xl shadow-lg`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Feature Navigation Dots */}
                <div className="flex justify-center space-x-2 mt-8">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeFeature === index 
                          ? 'bg-indigo-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Floating Cards */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Success Stories That
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Inspire</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who've transformed their careers with our AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/50"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-80"></div>
                
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-indigo-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Split Design */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Your Career Journey
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>
            
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed">
              Don't let another opportunity slip by. Create a resume that gets you noticed, 
              interviewed, and hired.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button className="group relative px-10 py-5 bg-white text-indigo-900 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
                <span className="relative z-10">Create My Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <div className="flex items-center space-x-2 text-indigo-200">
                <span className="text-sm">✨ No credit card required</span>
                <span className="text-sm">• Free to start</span>
              </div>
            </div>
            
            <div className="pt-12 flex justify-center space-x-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2 Minutes</div>
                <div className="text-sm text-indigo-300">To Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Instant</div>
                <div className="text-sm text-indigo-300">PDF Download</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">ATS</div>
                <div className="text-sm text-indigo-300">Optimized</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;