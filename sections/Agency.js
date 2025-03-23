import Banner from "@/components/Banner"
import Brand from "@/components/Brand"
import Testimonial from "@/components/Testimonial"
import { Title, TitleSm } from "@/components/common/Title"

const Agency = () => {
  return (
    <>
      <section className='agency bg-top'>
        <div className='container'>
          <div className='heading-title'>
            <TitleSm title='ABOUT AGENCY' /> <br />
            <br />
            <Title title='The last digital agency you will ever need!' className='title-bg' />
          </div>

          <div className='content flex1'>
            <div className='left w-60 py'>
              <TitleSm title='Turning your business ideas into smart digital products since 2024' />
              <p className='desc-p text-justify'>
                Since 2024, <span className="font-semibold">Avien AI</span> has been dedicated to transforming visionary business ideas 
                into <span className="font-semibold">intelligent, cutting-edge digital products</span>. We specialize in AI-powered 
                solutions that streamline operations, enhance user experiences, and drive business growth.
                <br /><br />
                Our expertise lies in combining <span className="font-semibold">innovation, automation, and machine learning</span> to develop 
                smart applications that adapt to your needs. Whether it's an AI-driven chatbot, an advanced data analytics tool, or a custom 
                automation system, we ensure that every product we create is <span className="font-semibold">efficient, scalable, and future-ready</span>.
                <br /><br />
                At Avien AI, we believe that technology should work <span className="font-semibold">for you, not against you</span>. That’s why we focus on 
                delivering tailored, user-friendly AI solutions that help businesses thrive in the digital era. Let’s turn your ideas into 
                reality with the power of artificial intelligence!
              </p>
              <div className='grid-3'>
                <div className='box'>
                  <h1 className='indigo'>3+</h1>
                  <h3>Years of experience</h3>
                </div>
                <div className='box'>
                  <h1 className='indigo'>20+</h1>
                  <h3>Successful cases</h3>
                </div>
                <div className='box'>
                  <h1 className='indigo'>0+</h1>
                  <h3>Industry awards</h3>
                </div>
              </div>
            </div>
            <div className='right w-40 ml'>
              <img src='/images/s1.jpg' alt='Img' className='round' width='100%' height='100%' />
            </div>
          </div>

          <div className='content flex'>
            <div className='left w-40 py'>
              <img src='/images/s4.jpg' alt='Img' className='round' width='100%' height='100%' />
            </div>
            <div className='right w-60 ml'>
              <TitleSm title='Our Mission' />
              <br />
              <p className='misson-p text-justify'>
                At <span className="font-semibold">Avien AI</span>, our mission is to revolutionize the way businesses and individuals interact with 
                artificial intelligence. We are committed to developing <span className="font-semibold">intelligent, efficient, and user-friendly AI 
                solutions</span> that enhance productivity, simplify complex tasks, and drive innovation.
                <br /><br />
                Our goal is to <span className="font-semibold">bridge the gap between humans and technology</span> by making AI more accessible, ethical, and impactful. 
                Whether it's AI-powered automation, smart assistants, or cutting-edge machine learning models, we strive to deliver solutions that 
                empower businesses, improve lives, and shape the future of AI-driven innovation.
                <br /><br />
                With a focus on <span className="font-semibold">accuracy, security, and continuous improvement</span>, we are dedicated to pushing the boundaries of 
                AI technology while maintaining a strong ethical foundation. At Avien AI, we believe in creating AI that works 
                <span className="font-semibold"> for everyone, everywhere</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Brand />
      <Testimonial />
      <Banner />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export default Agency
