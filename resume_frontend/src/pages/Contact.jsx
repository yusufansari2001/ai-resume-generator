import React from 'react';
import { useForm } from 'react-hook-form';

function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const mailtoLink = `mailto:mdyousufasif6@gmail.com?subject=Contact Form Submission&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0AMessage: ${data.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="min-h-[40vh] bg-base-200 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl mb-8">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form + Info Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form - Left Side */}
            <div className="lg:w-1/2">
              <div className="card bg-base-200 shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="input input-bordered w-full"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <span className="text-error text-sm">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email Address</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="input input-bordered w-full"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <span className="text-error text-sm">{errors.email.message}</span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="input input-bordered w-full"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Message</span>
                    </label>
                    <textarea
                      {...register("message", { required: "Message is required" })}
                      className="textarea textarea-bordered w-full h-32"
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && (
                      <span className="text-error text-sm">{errors.message.message}</span>
                    )}
                  </div>

                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info - Right Side */}
            <div className="lg:w-1/2">
              <div className="card bg-base-200 shadow-xl p-8 h-full">
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                    <p className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>contact@resume-builder.com</span>
                    </p>
                    <p className="flex items-start gap-3 mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+1 (555) 123-4567</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                    <p className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>123 Resume Street<br />San Francisco, CA 94107<br />United States</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                    <p className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday - Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;