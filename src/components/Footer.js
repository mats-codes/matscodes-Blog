import React from "react"
import SocialMediaIcons from "./SocialMediaIcons"
import { Row, Col } from "reactstrap"
import { Link } from "gatsby"

const Footer = () => (
  <div className="site-footer">
    <Row>
      <Col md="2">© 2019 - Mattes Wieben</Col>
      <Col md="8">
        <h4 className="text-center">Mats.codes</h4>
        <p className="text-center">Follow me on social media</p>
        <SocialMediaIcons size="2x" />
      </Col>
      <Col md="2">
        <ul>
          <li>
            <Link to={"/credits"}>Credits</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </Col>
    </Row>
  </div>
)

export default Footer
