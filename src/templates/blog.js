import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Link from '../components/link'
import theme from '../../config/theme';
import PostCard from '../components/post/post-card';

const Blog = ({ data: { site, blog }, pageContext: { pagination, categories },}) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page
    .map(id =>
      blog.edges.find(
        edge =>
          edge.node.id === id &&
          edge.node.parent.sourceInstanceName !== 'pages',
      ),
    )
    .filter(post => post !== undefined)

  return (
    <Layout site={site}
            headerColor={theme.colors.primary}
            headerBg={theme.brand.secondary}>
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          a,
          p {
          }
          h2 {
            a {
              color: inherit;
            }
          }
          small {
            display: block;
          }
        `}
      >
        {posts.map(({ node: post }) => <PostCard key={post.id} post={post} type='large'/>)}
        <br />
        <br />
        <div>
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
            </Link>
          )}
          {previousPagePath && (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          )}
        </div>
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
        image
      }
    }
    blog: allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            keywords
          }
        }
      }
    }
  }
`
