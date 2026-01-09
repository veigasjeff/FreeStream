
import React from 'react';

const ContactUs: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you shortly.");
    // In a real app, this would handle form submission
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display font-bold text-4xl mb-8 border-l-4 border-primary pl-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-gray-300 mb-4">
            Have questions, concerns, or feedback? We'd love to hear from you. Please fill out the form, and our team will get back to you as soon as possible.
          </p>
          <p className="text-gray-400">
            For DMCA notices or other legal inquiries, please specify the nature of your request in the subject line.
          </p>
          <div className="mt-6 space-y-4">
              <p className="flex items-center gap-3">
                  <i className="fas fa-envelope text-primary"></i>
                  <span>support@freestream.example.com</span>
              </p>
              <p className="flex items-center gap-3">
                  <i className="fas fa-info-circle text-primary"></i>
                  <span>Please note: We do not host any files on our server.</span>
              </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
            <input type="text" id="name" name="name" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
            <input type="email" id="email" name="email" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
