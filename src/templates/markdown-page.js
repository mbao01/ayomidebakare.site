import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../components/layout'

function MarkdownPage({ children, pageContext: { frontmatter } }) {
  return (
    <Layout
      pageTitle={frontmatter.title}
      noFooter={frontmatter.noFooter}
      fields={frontmatter}
    >
      <SEO fields={frontmatter} />
      <Container maxWidth={700}>{children}</Container>
    </Layout>
  )
}

export default MarkdownPage
