import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xrbonzrz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please check your connection.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="text-gray-700">
      <div className="text-center text-3xl pt-10 mb-10">
        <p>
          CONTACT <span className="text-[#4A6CF7] font-semibold">US</span>
        </p>
        <p className="text-gray-500 text-sm mt-2">
          We'd love to hear from you — whether you have a question, feedback, or partnership idea.
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-14 mb-28 text-sm items-center">
        <img
          className="w-full md:max-w-[380px] rounded-lg shadow-md"
          src={assets.contact_image}
          alt="Contact PrescripWell"
        />

        <div className="flex flex-col justify-center items-start gap-6 w-full md:w-[60%]">
          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">OUR OFFICE</p>
            <p className="text-gray-500 leading-6">
              Jalandhar - Delhi G.T. Road <br /> Phagwara, Punjab (India), 144411
            </p>
            <p className="text-gray-500 mt-3">
              Tel: <span className="font-medium">+91 9326063940</span> <br />
              Email: <span className="font-medium">prescripwell@gmail.com</span>
            </p>
          </div>

          <hr className="w-full border-gray-300 my-4" />

          <div className="w-full">
            <p className="font-semibold text-lg text-gray-700 mb-3">SEND US A MESSAGE</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] resize-none"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? 'bg-gray-400' : 'bg-[#4A6CF7] hover:bg-[#3B5CE5]'
                } text-white py-3 px-6 rounded-md transition-all duration-300 self-start`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mb-10">
        <p>
          We typically respond within 24 hours. Thank you for connecting with{' '}
          <span className="text-[#4A6CF7] font-medium">PrescripWell</span>.
        </p>
      </div>
    </div>
  );
};

export default Contact;
