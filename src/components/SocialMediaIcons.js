import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
  faInstagram,
  faGithub,
  faDev,
  faMedium,
} from "@fortawesome/free-brands-svg-icons"

const SocialMediaIcons = () => (
  <div className="footer-social-links">
    <ul className="social-links-list">
      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="facebook"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} size="2x" />
        </a>
      </li>

      <li>
        <a
          href="https://www.twitter.com"
          target="_blank"
          className="twitter"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="instagram"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="linkedin"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="github"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="dev"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faDev} size="2x" />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="medium"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faMedium} size="2x" />
        </a>
      </li>
    </ul>
  </div>
)

export default SocialMediaIcons
