import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../components/layout'

function MarkdownPage({ children, pageContext: { fields } }) {
  return (
    <Layout pageTitle={fields.title} noFooter={fields.noFooter} fields={fields}>
      <SEO fields={fields} />
      <Container maxWidth={700}>{children}</Container>
    </Layout>
  )
}

export default MarkdownPage
