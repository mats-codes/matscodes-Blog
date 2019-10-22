import React from "react"
import {
  Card,
  CardText,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap"
import Img from "gatsby-image"
import { graphql, StaticQuery, Link } from "gatsby"
import addToMailchimp from "gatsby-plugin-mailchimp"
import SocialMediaIcons from "./SocialMediaIcons"

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: undefined,
      successMessage: undefined,
      mail: "",
    }
  }

  updateMail = mail => {
    this.setState({
      mail: mail.nativeEvent.srcElement.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    // addToMailchimp(this.state.mail, {
    //   PATHNAME: "test",
    //   FNAME: "Ben",
    //   LNAME: "CODE",
    // })
    addToMailchimp(this.state.mail)
      .then(res => {
        console.log(res)
        if (res.result === "success") {
          this.setState({
            successMessage:
              "Thanks for your support <3 We'll keep you up to date!",
          })
        } else {
          if (res.msg.includes("is already subscribed")) {
            this.setState({
              successMessage: "Good news, you are already subscribed!",
            })
          } else {
            this.setState({
              successMessage:
                "Sorry, something went wrong :( Please try again!",
            })
          }
        }
      })
      .catch(err => {
        console.error(err)
        console.log("Gea")
        this.setState({
          errorMessage:
            "Sorry, we could not reach our servers. Please try again.",
        })
      })
  }

  render() {
    const { author, authorFluid } = this.props
    const { errorMessage, successMessage } = this.state
    return (
      <div className="sidebar">
        {author && (
          <Card className="elevatedCard">
            <Img className="card-image-top" fluid={authorFluid} />
            <CardBody>
              <CardTitle className="text-center text-uppercase mb-3">
                {author.name}
              </CardTitle>
              <CardText>{author.bio}</CardText>
              <SocialMediaIcons />
            </CardBody>
          </Card>
        )}
        <Card className="elevatedCard">
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              Newsletter
            </CardTitle>
            {successMessage === undefined && errorMessage === undefined ? (
              <Form className="text-center" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email address ..."
                    onChange={this.updateMail}
                  />
                </FormGroup>
                <Button className="subscribeButton">Subscribe</Button>
              </Form>
            ) : successMessage === undefined ? (
              <p>{errorMessage}</p>
            ) : (
              <p>{successMessage}</p>
            )}
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

        <Card className="elevatedCard">
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              Recent Posts
            </CardTitle>
            <StaticQuery
              query={sidebarQuery}
              render={data => (
                <div>
                  {data.allMarkdownRemark.edges.map(({ node }) => (
                    <Card key={node.id} className="elevated2Card">
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
