const { slugify } = require("./src/util/utilityFunctions")
const path = require("path")
const authors = require("./src/util/authors")
const _ = require("lodash")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPage: path.resolve("src/templates/tags-page.js"),
    tagPosts: path.resolve("src/templates/tag-posts.js"),
    postList: path.resolve("src/templates/post-list.js"),
    authorList: path.resolve("src/templates/author-posts.js"),
  }

  return graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
            tags
            author
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allContentfulBlogPost.edges

    // Create single blog post pages
    posts.forEach(({ node }) => {
      if (node.isTemplate) return
      createPage({
        path: node.slug,
        component: templates.singlePost,
        context: {
          // Passing slug for template to use to get post
          slug: node.slug,

          // Find author imageUrl from authors and pass it to the single post template
          imageUrl: authors.find(x => x.name === node.author).imageUrl,
        },
      })
    })

    // Get all tags
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.tags")) {
        tags = tags.concat(edge.node.tags)
      }
    })

    let tagPostCounts = {}
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })

    tags = _.uniq(tags)

    // Create tags page
    createPage({
      path: `/tags`,
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts,
      },
    })

    // Create tag posts pages
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        },
      })
    })

    const postsPerPage = 5
    const numberOfPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1

      if (isFirstPage) return

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage,
          numberOfPages,
        },
      })

      authors.forEach(author => {
        createPage({
          path: `/author/${slugify(author.name)}`,
          component: templates.authorList,
          context: {
            authorName: author.name,
            imageUrl: author.imageUrl,
          },
        })
      })
    })
  })
}
