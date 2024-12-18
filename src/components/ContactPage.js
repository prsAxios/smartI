import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    message: "",
    organizationName: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleCaptchaSuccess = () => {
    setIsCaptchaVerified(true);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.contactNumber) errors.contactNumber = "Contact number is required";
    if (!formData.message) errors.message = "Message is required";
    if (!formData.organizationName) errors.organizationName = "Organization name is required";
    if (!formData.email) errors.email = "Email is required";
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // If there are validation errors, don't submit the form
    }

    if (!isCaptchaVerified) {
      alert("Please complete the captcha before submitting.");
      return;
    }

    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setFormData({
        name: "",
        contactNumber: "",
        message: "",
        organizationName: "",
        email: ""
      });
      setFormErrors({});
    }, 5000);
  };

  return (
    <>
      <div className={`min-h-screen flex items-center justify-center relative ${isModalOpen ? "blur-sm" : ""}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#003c4f] to-gray-900 z-0"></div>
        <div className="flex-1 flex flex-col items-center z-10 text-white p-6">
          <div className="text-center mt-10">
            <h1 className="text-6xl font-bold mb-4">Get in touch</h1>
            <p className="text-gray-400 text-3xl">Need our expertise for choosing your next futuristic innovation?</p>
          </div>

          <form className="p-6 mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`w-full p-3 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl ${formErrors.name ? "border-red-500" : ""}`}
              />
              {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

              <input
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Contact Number"
                className={`w-full p-3 bg-gray-700 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.contactNumber ? "border-red-500" : ""}`}
              />
              {formErrors.contactNumber && <p className="text-red-500 text-sm">{formErrors.contactNumber}</p>}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                rows="4"
                className={`w-full p-3 bg-gray-700 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.message ? "border-red-500" : ""}`}
              />
              {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
            </div>

            <div className="flex flex-col gap-6">
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Organization Name"
                className={`w-full p-3 bg-gray-700 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.organizationName ? "border-red-500" : ""}`}
              />
              {formErrors.organizationName && <p className="text-red-500 text-sm">{formErrors.organizationName}</p>}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email ID"
                className={`w-full p-3 bg-gray-700 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? "border-red-500" : ""}`}
              />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

              <div className="flex flex-col gap-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-[40%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-bold"
                >
                  Verify Captcha
                </button>
                <button
                  type="submit"
                  className={`w-[40%] ${isCaptchaVerified ? "bg-red-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"} text-white py-3 rounded-2xl font-bold`}
                  disabled={!isCaptchaVerified}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
          <div className="bg-white rounded-lg p-6 text-center w-96">
            <h2 className="text-lg font-bold mb-4">Complete the Captcha</h2>
            <Captcha onVerify={handleCaptchaSuccess} />
            <button onClick={() => setIsModalOpen(false)} className="mt-4 text-red-600">
              Cancel
            </button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-green-500 text-white text-center p-10 rounded-lg w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h2>
            <p>Your details have been successfully submitted. We will get back to you soon.</p>
          </div>
        </div>
      )}
    </>
  );
};

const Captcha = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState(generateRandomText());
  const [userInput, setUserInput] = useState("");

  function generateRandomText() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleVerify = () => {
    if (userInput === captchaText) {
      alert("Captcha verified!");
      onVerify();
    } else {
      alert("Captcha verification failed. Try again.");
      setCaptchaText(generateRandomText());
      setUserInput("");
    }
  };

  return (
    <div>
      <div className="mb-4 bg-gray-100 text-black p-3 rounded-lg text-lg font-mono">
        {captchaText}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter captcha text"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleVerify}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Verify
      </button>
    </div>
  );
};

export default ContactPage;
