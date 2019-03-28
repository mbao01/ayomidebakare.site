import React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import Layout from '../components/layout'
import Link from '../components/link'
import Container from '../components/container'
import {rhythm} from '../lib/typography'
import theme from '../../config/theme'
import PostCard from '../components/post/post-card';
import Announcement from '../components/announcement';

const Intro = () => (
  <section
    css={css`
      * {
        color: ${theme.colors.white};
      }
      width: 100%;
      background: ${theme.brand.primary};
      padding: 20px 0 0 0;
      display: flex;
      flex-flow: column;
    `}
  >
    <Container
      maxWidth={'80%'}
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <Announcement />
      {/*<img src={site.siteMetadata.image} alt={site.siteMetadata.title} />*/}
    </Container>
  </section>
)

export default function Index({data: {site, blog}}) {
  return (
    <Layout
      site={site}
      headerColor={theme.colors.white}
      headerBg={theme.brand.primary}
    >
      <Intro/>
      <Container
        maxWidth={840}
        noVerticalPadding={true}
        css={css`
          padding-bottom: 0;
        `}
      >
        <Container
          maxWidth={720}
          css={css`
            background-color: rgba(120, 120, 120, .01);
          `}>
          <h2
            css={css`
              margin-bottom: ${rhythm(1)};
              font-size: ${rhythm(1)};
            `}>Blog</h2>
          {blog.edges.map(({node: post}) => <PostCard key={post.id} post={post} type='small'/>)}
          <Link
            to="/blog"
            aria-label="Visit blog page"
            className="button-secondary"
          >
            View all posts
          </Link>
        </Container>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
        image
      }
    }
    blog: allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {published: {ne: false}}
        fileAbsolutePath: {regex: "//content/blog//"}
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
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
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
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
