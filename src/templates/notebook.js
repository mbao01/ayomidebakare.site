import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Link from '../components/link'
import PostCard from '../components/post/post-card'
import { rhythm } from '../lib/typography'

const Notebook = ({ data: { notebook }, pageContext: { pagination } }) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page
    .map(id =>
      notebook.edges.find(
        edge =>
          edge.node.id === id &&
          edge.node.parent.sourceInstanceName !== 'pages',
      ),
    )
    .filter(post => post !== undefined)

  return (
    <Layout>
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
          {nextPagePath && (
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
          {previousPagePath && (
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
            margin: 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Notebook

export const pageQuery = graphql`
  query {
    notebook: allJupyterNotebook(
      sort: { fields: [metadata___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            categories
            excerpt
            date(formatString: "MMMM DD, YYYY")
            banner {
              ...bannerImage640
            }
            keywords
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  }
`
