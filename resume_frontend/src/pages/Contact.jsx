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
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl mb-4">
            Have questions or feedback? We’re here to help. Reach out to us!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card bg-base-200 shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered w-full"
                    placeholder="Your name"
                  />
                  {errors.name && <span className="text-error text-sm">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div>
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
                  {errors.email && <span className="text-error text-sm">{errors.email.message}</span>}
                </div>

                {/* Phone */}
                <div>
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

                {/* Message */}
                <div>
                  <label className="label">
                    <span className="label-text">Your Message</span>
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <span className="text-error text-sm">{errors.message.message}</span>}
                </div>

                {/* Submit */}
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary btn-block">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="card bg-base-200 shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                  <p className="flex items-start gap-3">
                    <span className="text-primary">📧</span>
                    <span>contact@resume-builder.com</span>
                  </p>
                  <p className="flex items-start gap-3 mt-2">
                    <span className="text-primary">📞</span>
                    <span>+1 (555) 123-4567</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                  <p className="flex items-start gap-3">
                    <span className="text-primary">📍</span>
                    <span>
                      123 Resume Street<br />
                      San Francisco, CA 94107<br />
                      United States
                    </span>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                  <p className="flex items-start gap-3">
                    <span className="text-primary">⏰</span>
                    <span>
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday - Sunday: Closed
                    </span>
                  </p>
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
