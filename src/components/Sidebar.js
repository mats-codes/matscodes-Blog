import React from "react"
import {
  Card,
  CardText,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap"
import Img from "gatsby-image"
import { graphql, StaticQuery, Link } from "gatsby"
import addToMailchimp from "gatsby-plugin-mailchimp"

const Sidebar = ({ author, authorFluid }) => {
  const handleSubmit = e => {
    console.log(e.target)
    e.preventDefault()
    console.log(process.env.MAILCHIMP_ENDPOINT)

    addToMailchimp("test@me.de", {
      PATHNAME: "test",
      FNAME: "Ben",
      LNAME: "CODE",
    })
  }

  return (
    <div>
      {author && (
        <Card>
          <Img className="card-image-top" fluid={authorFluid} />
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              {author.name}
            </CardTitle>
            <CardText>{author.bio}</CardText>
            <div className="author-social-links text-center">
              <ul>
                <li>
                  <a
                    href={author.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook"
                  >
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter"
                  >
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={author.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram"
                  >
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                  >
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={author.dev}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dev"
                  >
                    <i className="fab fa-dev fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={author.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="medium"
                  >
                    <i className="fab fa-medium fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Newsletter
          </CardTitle>
          <Form className="text-center" onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="Your email address ..."
              />
            </FormGroup>
            <button className="btn btn-outline-success text-uppercase">
              Subscribe
            </button>
          </Form>
        </CardBody>
      </Card>

      {/* <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase">
          Advertisement
        </CardTitle>
        <img
          src="https://via.placeholder.com/320x200"
          alt="Advert"
          style={{ width: "100%" }}
        />
      </CardBody>
    </Card> */}

      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Recent Posts
          </CardTitle>
          <StaticQuery
            query={sidebarQuery}
            render={data => (
              <div>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                  <Card key={node.id}>
                    <Link to={`/${node.fields.slug}`}>
                      <Img
                        className="card-image-top"
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                      />
                    </Link>
                    <CardBody>
                      <CardTitle>
                        <Link to={`/${node.fields.slug}`}>
                          {node.frontmatter.title}
                        </Link>
                      </CardTitle>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  )
}

const sidebarQuery = graphql`
  query sidebarQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Sidebar
