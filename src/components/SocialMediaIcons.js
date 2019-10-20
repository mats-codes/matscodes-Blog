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

const SocialMediaIcons = props => (
  <div className="footer-social-links">
    <ul className="social-links-list">
      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="facebook"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} size={props.size} />
        </a>
      </li>

      <li>
        <a
          href="https://www.twitter.com"
          target="_blank"
          className="twitter"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} size={props.size} />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="instagram"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} size={props.size} />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="linkedin"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} size={props.size} />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="github"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} size={props.size} />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="dev"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faDev} size={props.size} />
        </a>
      </li>

      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="medium"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faMedium} size={props.size} />
        </a>
      </li>
    </ul>
  </div>
)

export default SocialMediaIcons
