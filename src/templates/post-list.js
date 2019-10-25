import React from "react"
import Layout from "../components/layout"
import Post from "../components/post"
import { graphql } from "gatsby"
import PaginationLinks from "../components/PaginationLinks"

const postList = props => {
  const posts = props.data.allContentfulBlogPost.edges
  const { currentPage, numberOfPages } = props.pageContext

  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      {posts.map(({ node }) => (
        <Post
          key={node.id}
          slug={node.slug}
          title={node.title}
          author={node.author}
          date={node.publishedDate}
          body={node.excerpt}
          tags={node.tags}
          // fluid={node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
      <PaginationLinks
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Layout>
  )
}

export const postListQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: [publishedDate], order: DESC }
      limit: $limit
      skip: $skip
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
        }
      }
      totalCount
    }
  }
`

export default postList
