import React from "react";
import {
  FaShieldAlt,
  FaEye,
  FaUserShield,
  FaCookieBite,
  FaEnvelope,
  FaDatabase,
  FaSyncAlt,
} from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="mt-20 mb-16 text-gray-700 px-6 sm:px-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-[#10267e] mb-3 flex items-center justify-center gap-2">
          <FaShieldAlt className="text-[#4A6CF7]" />
          Privacy Policy
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          At PrescripWell, your privacy and trust are very important to us.
          This policy explains how we collect, use, and protect your personal
          information when you use our platform.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-10 max-w-4xl mx-auto leading-7">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaDatabase className="text-[#4A6CF7]" />
            Information We Collect
          </h2>
          <p>
            We collect personal details such as your name, email address, phone
            number, and appointment history to provide you with seamless
            healthcare services. Additionally, we may gather non-personal data
            like browser type, device information, and usage statistics to
            enhance user experience.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaEye className="text-[#4A6CF7]" />
            How We Use Your Information
          </h2>
          <p>
            Your information helps us manage doctor appointments, provide
            updates, and improve our services. We may also use it for
            communication regarding your appointments or important service
            announcements.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaShieldAlt className="text-[#4A6CF7]" />
            Data Protection
          </h2>
          <p>
            We use industry-standard encryption and secure servers to ensure
            your data is safe. Access to your personal information is restricted
            to authorized personnel only.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaUserShield className="text-[#4A6CF7]" />
            Sharing of Information
          </h2>
          <p>
            We do not sell or rent your personal data. However, we may share
            information with trusted healthcare professionals, payment
            processors, or partners solely to deliver our services effectively.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaCookieBite className="text-[#4A6CF7]" />
            Cookies
          </h2>
          <p>
            PrescripWell uses cookies to improve site functionality and user
            experience. You can control cookie preferences in your browser
            settings at any time.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaUserShield className="text-[#4A6CF7]" />
            Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal
            information at any time. Please contact us if you wish to make any
            such changes.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaSyncAlt className="text-[#4A6CF7]" />
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be
            reflected on this page with an updated revision date.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-medium text-[#4A6CF7] mb-2 flex items-center gap-3">
            <FaEnvelope className="text-[#4A6CF7]" />
            Contact Us
          </h2>
          <p>
            For any concerns or questions about our privacy practices, please
            reach out to us at
            <span className="text-[#4A6CF7] font-medium">
              {" "}
              prescripwell@gmail.com
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
