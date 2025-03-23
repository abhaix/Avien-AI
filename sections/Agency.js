import Banner from "@/components/Banner";
import Brand from "@/components/Brand";
import Testimonial from "@/components/Testimonial";
import { Title, TitleSm } from "@/components/common/Title";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const Agency = () => {
  return (
    <>
      {/* ✅ Agency Section with animations */}
      <section className="agency bg-top">
        <div className="container">
          <motion.div 
            className="heading-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <TitleSm title="ABOUT AGENCY" /> <br />
            <br />
            <Title title="The last digital agency you will ever need!" className="title-bg" />
          </motion.div>

          <div className="content flex1">
            {/* ✅ Left Section */}
            <motion.div 
              className="left w-60 py"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <TitleSm title="Turning your business ideas into smart digital products since 2024" />
              <p className="desc-p text-justify">
                Since 2024, <span className="font-semibold">Avien AI</span> has been dedicated to transforming visionary business ideas 
                into <span className="font-semibold">intelligent, cutting-edge digital products</span>. We specialize in AI-powered 
                solutions that streamline operations, enhance user experiences, and drive business growth.
              </p>

              {/* ✅ Animated Stats */}
              <motion.div 
                className="grid-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div className="box" whileHover={{ scale: 1.1 }}>
                  <h1 className="indigo">3+</h1>
                  <h3>Years of experience</h3>
                </motion.div>
                <motion.div className="box" whileHover={{ scale: 1.1 }}>
                  <h1 className="indigo">10+</h1>
                  <h3>Successful cases</h3>
                </motion.div>
                <motion.div className="box" whileHover={{ scale: 1.1 }}>
                  <h1 className="indigo">0+</h1>
                  <h3>Industry awards</h3>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ✅ Right Image */}
            <motion.div 
              className="right w-40 ml"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <img src="/images/s1.jpg" alt="Img" className="round" width="100%" height="100%" />
            </motion.div>
          </div>

          {/* ✅ Mission Section */}
          <div className="content flex">
            {/* ✅ Left Image */}
            <motion.div 
              className="left w-40 py"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <img src="/images/s4.jpg" alt="Img" className="round" width="100%" height="100%" />
            </motion.div>

            {/* ✅ Right Section */}
            <motion.div 
              className="right w-60 ml"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <TitleSm title="Our Mission" />
              <br />
              <p className="misson-p text-justify">
                At <span className="font-semibold">Avien AI</span>, our mission is to revolutionize the way businesses and individuals interact with 
                artificial intelligence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ✅ Brand Section with Animation */}
      <motion.section 
        className="brand-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Brand />
      </motion.section>

      {/* ✅ Testimonial Section */}
      <Testimonial />

      {/* ✅ Banner Section with Animation */}
      <motion.section 
        className="banner-section"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Banner />
      </motion.section>

      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Agency;
