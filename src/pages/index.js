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
import {bpMaxXS} from '../lib/breakpoints';

const Intro = ({title}) => (
  <section
    css={css`
      * {
        color: ${theme.colors.white};
      }
      width: 100%;
      background: ${theme.brand.primary};
      padding: 20px 0;
      display: flex;
      flex-flow: column;
    `}
  >
    <Container
      maxWidth='80%'
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        ${bpMaxXS} {
          flex-wrap: wrap;
        }
      `}
    >
      <Announcement />
      <div css={css`
        width: 50%;
        ${bpMaxXS} {
          width: 100%;
        }
        h2 {
          margin-top: -15px;
          padding: 0 20px;
        }
      `}>
        <h2>
          {title}
        </h2>
      </div>
    </Container>
  </section>
)

export default function Index({data: {site, blog}}) {
  const introTitle = `Hey, I'm ${site.siteMetadata.author.name}. Here's a curation of my experiences in software engineering. I hope you
          learn something.`
  return (
    <Layout
      site={site}
      headerColor={theme.colors.white}
      headerBg={theme.brand.primary}
    >
      <Intro title={introTitle}/>
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
          {blog && blog.edges && blog.edges.map(({node: post}) => <PostCard key={post.id} post={post} type='small'/>)}
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
      siteMetadata {
        title
        image
        author {
          name
          minibio        
        }
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
