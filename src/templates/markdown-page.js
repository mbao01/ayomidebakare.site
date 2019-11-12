import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { useTheme } from 'emotion-theming'
import { graphql } from 'gatsby'

function MarkdownPage({ children, pageContext: { frontmatter } }) {
  const theme = useTheme()

  return (
    <>
      <SEO frontmatter={frontmatter} />
      <Layout
        pageTitle={frontmatter.title}
        noFooter={frontmatter.noFooter}
        frontmatter={frontmatter}
        headerColor={theme.colors.primary.base}
        headerBg={theme.colors.secondary.base}
      >
        <Container maxWidth={700}>{children}</Container>
      </Layout>
    </>
  )
}

export default MarkdownPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        image
      }
    }
  }
`
