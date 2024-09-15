import "./footer.css";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
          with ❤️ by Ganis Arindatu
        </p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/ganis-arindatu/">
          <FaLinkedin />
          </a>
          <a href="https://www.tiktok.com/@ganis_arindatu?_t=8nCBftSxVeU&_r=1">
          <FaTiktok />
          </a>
          <a href="https://www.instagram.com/ganis_arindatu/">
          <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@ganisad">
          <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
