import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="text-gray-700">
      {/* Header */}
      <div className="text-center text-3xl pt-10 mb-10">
        <p>
          ABOUT <span className="text-[#4A6CF7] font-semibold">US</span>
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Discover how PrescripWell simplifies healthcare by connecting patients and doctors with ease and trust.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 md:px-20 py-12 bg-gray-50 rounded-lg">
        <img
          className="w-full md:max-w-[400px] rounded-lg shadow-md"
          src={assets.about_image}
          alt="About PrescripWell"
        />
        <div className="flex flex-col gap-6 md:w-3/5 text-[17px] leading-relaxed text-gray-600">
          <p>
            Welcome to <span className="font-semibold text-[#4A6CF7]">PrescripWell</span>, your trusted partner in
            managing healthcare needs conveniently and efficiently. We understand how challenging it can be to schedule
            doctor appointments and manage health records — our platform ensures a seamless experience for every user.
          </p>
          <p>
            At PrescripWell, we are driven by a commitment to excellence and innovation. We continuously improve our
            platform with the latest healthcare technologies to offer a user-friendly, secure, and reliable experience
            — whether you’re booking your first appointment or managing long-term care.
          </p>
          <h2 className="text-2xl font-semibold text-[#4A6CF7] mt-2">Our Vision</h2>
          <p>
            Our vision is to make healthcare accessible, transparent, and effortless. We aim to bridge the gap between
            patients and healthcare providers, helping you get the right care at the right time.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mt-20 mb-10">
        <h2 className="text-3xl font-semibold text-gray-700">
          Why <span className="text-[#4A6CF7]">Choose Us</span>
        </h2>
        <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">
          We simplify the healthcare journey by making it faster, smarter, and more personal for every patient.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 mb-20">
        <div className="border rounded-xl shadow-sm p-8 hover:bg-[#4A6CF7] hover:text-white transition-all duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
          <p className="text-[16px] leading-relaxed">
            Streamlined appointment scheduling that fits perfectly into your busy lifestyle.
          </p>
        </div>

        <div className="border rounded-xl shadow-sm p-8 hover:bg-[#4A6CF7] hover:text-white transition-all duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-3">Convenience</h3>
          <p className="text-[16px] leading-relaxed">
            Access to a verified network of healthcare professionals right in your area.
          </p>
        </div>

        <div className="border rounded-xl shadow-sm p-8 hover:bg-[#4A6CF7] hover:text-white transition-all duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-3">Personalization</h3>
          <p className="text-[16px] leading-relaxed">
            Tailored recommendations and health reminders to help you stay proactive about your well-being.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
