import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../components/layout'
import theme from '../../config/theme'
import {graphql} from 'gatsby';

function MarkdownPage({children, pageContext: {frontmatter}}) {
  return (
    <>
      <SEO frontmatter={frontmatter} />
      <Layout
        pageTitle={frontmatter.title}
        noFooter={frontmatter.noFooter}
        frontmatter={frontmatter}
        headerColor={theme.colors.primary}
        headerBg={theme.brand.secondary}
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
