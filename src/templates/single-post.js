import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Badge, Card, CardBody, CardSubtitle } from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/utilityFunctions"
import authors from "../util/authors"
import { DiscussionEmbed } from "disqus-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const SinglePost = ({ data, pageContext }) => {
  const post = data.contentfulBlogPost
  const author = authors.find(x => x.name === post.author)

  const baseUrl = "https://mats.codes"

  const disqusShortname = process.env.GATSBY_DISQUS_NAME
  const disqusConfig = {
    shortname: disqusShortname,
    identifier: post.id,
    url: baseUrl + pageContext.slug,
  }

  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} className="centerImage" />
      },
    },
  }

  return (
    <Layout
      pageTitle={post.title}
      postAuthor={author}
      authorImageFluid={data.file.childImageSharp.fluid}
    >
      <SEO title={post.title} />
      <Card>
        <Img className="card-image-top" fluid={post.mainImage.fluid} />
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.publishedDate}</span> by{" "}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div className="blog-post">
            {documentToReactComponents(post.body.json, options)}
          </div>
          <div className="post-tags">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </div>
        </CardBody>
      </Card>
      <h3 className="text-center">Share this post</h3>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a
              href={
                "https://www.facebook.com/sharer/sharer.php?u" +
                baseUrl +
                pageContext.slug
              }
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
          </li>
          <li>
            <a
              href={
                "https://www.twitter.com/shareArticle?url=" +
                baseUrl +
                pageContext.slug +
                "&text=" +
                post.title +
                "&via" +
                "MatsCodes"
              }
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </li>
          <li>
            <a
              href={
                "https://www.linkedin.com/shareArticle?url=" +
                baseUrl +
                pageContext.slug +
                "&text=" +
                post.title +
                "&via" +
                "MatsCodes"
              }
              className="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </li>
        </ul>
      </div>
      <DiscussionEmbed {...disqusConfig} />
    </Layout>
  )
}

export const postQuery = graphql`
  query($slug: String!, $imageUrl: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      title
      author
      publishedDate(formatString: "MMM Do YYYY")
      tags
      body {
        json
      }
      mainImage {
        fluid(maxWidth: 700) {
          ...GatsbyContentfulFluid
        }
      }
    }
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default SinglePost
