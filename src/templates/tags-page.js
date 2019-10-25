import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

import { Button, Badge } from "reactstrap"
import { slugify } from "../util/utilityFunctions"

const tagsPage = ({ pageContext }) => {
  const { tags, tagPostCounts } = pageContext
  return (
    <Layout pageTitle="All tags">
      <SEO title="All tags" keywords={["tags", "topics"]} />
      <ul>
        {tags.map(tag => (
          <li key={tag} style={{ marginBottom: "10px" }}>
            <Button className="tagButton" href={`/tag/${slugify(tag)}`}>
              {/* This syntax should ONLY be used when we need to access a property that is not known before runtime */}
              {tag} <Badge color="dark">{tagPostCounts[tag]}</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default tagsPage
