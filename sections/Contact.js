import { useState } from "react";
import { Title, TitleSm } from "@/components/common/Title";
import { AiFillBehanceCircle, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FiHeadphones, FiHelpCircle } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    timeframe: "",
    projectDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", budget: "", timeframe: "", projectDetails: "" });
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <motion.section
      className="contact bg-top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container">
        {/* ✅ Animated Heading */}
        <motion.div
          className="heading-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <TitleSm title="CONTACT" />
          <br />
          <br />
          <Title title="Let's start right now!" className="title-bg" />
        </motion.div>

        <div className="content py flex1">
          {/* ✅ Animated Left Section */}
          <motion.div
            className="left w-30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="contact-details">
              <div className="box">
                <FiHeadphones size={30} className="icons" />
                <h3>+91 9106952894</h3>
                <span>Call us: Mon - Sat 9:00 - 19:00</span>
              </div>
              <div className="box">
                <IoLocationOutline size={30} className="icons" />
                <h3>Gujarat</h3>
                <span>Radha Residency, Tower 3, I/403, Air Force Area, Vadodara, Gujarat 390014</span>
              </div>
              <div className="box">
                <FiHelpCircle size={30} className="icons" />
                <h3>aavienai@gmail.com</h3>
                <span>Drop us a line anytime!</span>
              </div>
            </div>
            <ul>
              <li className="icon">
                <BsFacebook size={25} />
              </li>
              <li className="icon">
                <AiFillBehanceCircle size={25} />
              </li>
              <li className="icon">
                <AiFillInstagram size={25} />
              </li>
              <li className="icon">
                <AiFillLinkedin size={25} />
              </li>
            </ul>
          </motion.div>

          {/* ✅ Animated Right Form Section */}
          <motion.div
            className="right w-70"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <TitleSm title="Make an online enquiry" />
            <p className="desc-p">Got questions? Ideas? Fill out the form below to get our proposal.</p>

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="inputs">
                  <span>Name</span>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="inputs">
                  <span>Email</span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid-2">
                <div className="inputs">
                  <span>Your Budget</span>
                  <input type="text" name="budget" value={formData.budget} onChange={handleChange} />
                </div>
                <div className="inputs">
                  <span>Timeframe</span>
                  <input type="text" name="timeframe" value={formData.timeframe} onChange={handleChange} />
                </div>
              </div>
              <div className="inputs">
                <span>TELL US A BIT ABOUT YOUR PROJECT*</span>
                <textarea name="projectDetails" value={formData.projectDetails} onChange={handleChange} required />
              </div>
              <button type="submit" className="button-primary" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>

              {message && <p className="message">{message}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
