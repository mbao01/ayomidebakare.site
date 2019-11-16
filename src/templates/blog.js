import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Link from '../components/link'
import PostCard from '../components/post/post-card'
import { rhythm } from '../lib/typography'

const Blog = ({ data: { site, blog }, pageContext: { pagination } }) => {
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
    <Layout site={site}>
      <SEO />
      <Container>
        {posts.map(({ node: post }) => (
          <PostCard key={post.id} post={post} type="large" />
        ))}

        <div
          css={css`
            clear: both;
            height: ${rhythm(1)};
          `}
        >
          {!nextPagePath && (
            <small
              css={css`
                float: left;
              `}
            >
              <Link to={nextPagePath} aria-label="View next page">
                Next Page →
              </Link>
            </small>
          )}
          {!previousPagePath && (
            <small
              css={css`
                float: right;
              `}
            >
              <Link to={previousPagePath} aria-label="View previous page">
                ← Previous Page
              </Link>
            </small>
          )}
        </div>
        <hr
          css={css`
            margin: 0 0 ${rhythm(2)} 0;
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
            categories
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
              ...bannerImage640
            }
            keywords
          }
        }
      }
    }
  }
`
