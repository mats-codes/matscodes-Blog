import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"
import PaginationLinks from "../components/PaginationLinks"

const IndexPage = () => {
  const postsPerPage = 2
  let numberOfPages

  return (
    <Layout pageTitle="Mats.codes">
      <SEO title="Home" />
      <StaticQuery
        query={indexQuery}
        render={data => {
          numberOfPages = Math.ceil(
            data.allContentfulBlogPost.totalCount / postsPerPage
          )
          return (
            <div>
              {data.allContentfulBlogPost.edges.map(({ node }) => (
                <Post
                  key={node.id}
                  title={node.title}
                  author={node.author}
                  slug={node.slug}
                  date={node.datePublished}
                  body={node.excerpt}
                  fluid={node.mainImage.fluid}
                  tags={node.tags}
                />
              ))}
              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            </div>
          )
        }}
      />
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    allContentfulBlogPost(
      sort: { fields: [publishedDate], order: DESC }
      limit: 2
    ) {
      edges {
        node {
          id
          title
          publishedDate(formatString: "MMMM Do YYYY")
          author
          tags
          slug
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

export default IndexPage
