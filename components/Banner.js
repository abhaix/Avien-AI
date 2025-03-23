import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion

const Banner = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone.match(/^\d{10,15}$/)) {
      setMessage("❌ Please enter a valid phone number (10-15 digits)");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/savePhoneNumber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save number');
      }

      setMessage("✅ We've received your number! We'll contact you shortly.");
      setPhone("");
      setTimeout(() => {
        setShowPopup(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(`❌ ${error.message || 'Failed to submit. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="banner">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>We are looking forward to starting a new project</h2>
          <h3>Let's take your business to the next level!</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            className="button-primary"
            onClick={() => setShowPopup(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Call-back
          </button>
        </motion.div>
      </div>

      {/* ✅ Animated Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="popup-content">
              <motion.span
                className="close"
                onClick={() => {
                  setShowPopup(false);
                  setMessage("");
                  setPhone("");
                }}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </motion.span>
              <h3>Enter Your Phone Number</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  pattern="[0-9]{10,15}"
                  required
                  disabled={loading}
                />
                <motion.button
                  className="button-primary"
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? "Sending..." : "Submit"}
                </motion.button>
              </form>
              {message && (
                <motion.p
                  className={message.includes("✅") ? "success" : "error"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {message}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Banner;
