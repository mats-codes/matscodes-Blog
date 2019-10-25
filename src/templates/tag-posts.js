import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Post from "../components/Post"

const tagPosts = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { totalCount } = data.allContentfulBlogPost
  const pageHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
      {data.allContentfulBlogPost.edges.map(({ node }) => (
        <Post
          key={node.id}
          slug={node.slug}
          title={node.title}
          author={node.author}
          date={node.publishedDate}
          body={node.excerpt}
          tags={node.tags}
          fluid={node.mainImage.fluid}
        />
      ))}
    </Layout>
  )
}

export const tagQuery = graphql`
  query($tag: String!) {
    allContentfulBlogPost(
      sort: { fields: [publishedDate], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      edges {
        node {
          id
          title
          publishedDate(formatString: "MMMM Do YYYY")
          author
          tags
          slug
          excerpt
          mainImage {
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
      totalCount
    }
  }
`

export default tagPosts
