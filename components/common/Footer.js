import Link from "next/link"
import { TitleLogo } from "./Title"
import { BsFacebook } from "react-icons/bs"
import { AiFillBehanceCircle, AiFillInstagram, AiFillLinkedin ,AiFillGithub} from "react-icons/ai"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='grid-4'>
            <div className='logo'>
              <TitleLogo title='Avien' caption=' AI' className='logobg' />
              <br />
              <span>
                Questions? Reach us <br /> Monday – Friday from 9 am to 6 pm
              </span>
              <br />
              <br />
              <h3>+91 9106952894</h3>
              <br />
              
            </div>
            <ul>
              <h3>COMPANY</h3>
              <li>
                <Link href='/agency'>About agency</Link>
              </li>
              <li>
                <Link href='/team'>Our team</Link>
              </li>
              <li>
                <Link href='/showcase'>Showcase</Link>
              </li>
              <li>
                <Link href='/blogs'>Blog</Link>
              </li>
              <li>
                <Link href='/services'>Demo design system</Link>
              </li>
              <li>
                <Link href='/contact'>Contact</Link>
              </li>
            </ul>
            <ul>
              <h3>SERVICES</h3>
              <li>
                <Link href='/services'>Web Design & Development</Link>
              </li>
              <li>
                <Link href='/services'>Branding & Creative Services</Link>
              </li>
              <li>
                <Link href='/services'>Digital Marketing</Link>
              </li>
              <li>
                <Link href='/services'>E-Commerce</Link>
              </li>
            </ul>
            <ul>
              <h3>CONNECT</h3>
              <div className='connect'>
                <li>
                  <Link href='/'>
                    <BsFacebook size={25} />
                  </Link>
                </li>
                <li>
                  <Link href='/'>
                    <AiFillGithub size={25} />
                  </Link>
                </li>
                <li>
                  <a href="https://www.instagram.com/avien_ai_official" target="_blank" rel="noopener noreferrer">
                  <AiFillInstagram size={25} />
                  </a>
                </li>
                <li>
                  <Link href='/'>
                    <AiFillLinkedin size={25} />
                  </Link>
                </li>
              </div>
            </ul>
          </div>
          <div className='legal connect py'>
            <div className='text'>
              <span>© 2025 AVIEN AI. ALL RIGHTS RESERVED.</span>
            </div>
            <div className='connect'>
              <span>AVIEN AI COMPANY</span>
              <span> &nbsp; | &nbsp; </span>
              <span>TERMS & CONDITIONS</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
