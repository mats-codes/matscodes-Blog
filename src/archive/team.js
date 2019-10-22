import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import authors from "../util/authors"
import { Row, Card, CardText, CardBody, CardTitle, Button } from "reactstrap"

import matsImg from "../images/me.jpg"
import { slugify } from "../util/utilityFunctions"

const TeamPage = () => (
  <Layout pageTitle="Our Team">
    <SEO title="Team" keywords={[`gatsby`, `application`, `react`]} />
    <Row className="mb-4">
      <div className="col-md-3">
        <img src={matsImg} style={{ maxWidth: "100%" }} alt="Mats Profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: "100%" }}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardText>{authors[0].bio}</CardText>
            <Button
              color="primary"
              href={`/author/${slugify(authors[0].name)}`}
            >
              View Posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default TeamPage
