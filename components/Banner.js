import React, { useState } from "react";

const Banner = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/savePhoneNumber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.replace(/\D/g, '') }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save number');

      setMessage("✅ We've received your number! We'll contact you shortly.");
      setPhone("");
      setTimeout(() => {
        setShowPopup(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
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
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <h3>Enter Your Phone Number</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                pattern="[0-9]{10,15}"
                required
              />
              <button className="button-primary" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
            {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;
