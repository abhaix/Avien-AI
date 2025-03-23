import React, { useState } from "react";

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
        <div>
          <h2>We are looking forward to starting a new project</h2>
          <h3>Let's take your business to the next level!</h3>
        </div>
        <div>
          <button className="button-primary" onClick={() => setShowPopup(true)}>
            Request a Call-back
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => {
              setShowPopup(false);
              setMessage("");
              setPhone("");
            }}>&times;</span>
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
              <button 
                className="button-primary" 
                type="submit" 
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
            {message && (
              <p className={message.includes("✅") ? "success" : "error"}>
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;