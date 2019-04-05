import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from '../components/seo'
import { css } from '@emotion/core'
import Container from '../components/container'
import Layout from '../components/layout'
import {fonts, rhythm} from '../lib/typography'
import Share from '../components/share'
import config from '../../config/website'
import { bpMaxSM } from '../lib/breakpoints'
import {get} from 'lodash'
import theme from '../../config/theme';

export default function Post({data: { site, post }}) {
  const {
    editLink,
    title,
    slug,
    date,
    description,
    banner,
  } = post.fields

  const blogPostUrl = `${config.siteUrl}${slug}`

  return (
    <Layout site={site}
            headerColor={theme.colors.primary}
            headerBg={theme.brand.secondary}
            frontmatter={post.fields}>
      <SEO frontmatter={post.fields}
           metaImage={get(post, 'fields.banner.childImageSharp.fluid.src')}
           isBlogPost />
      <article
        css={css`
          width: 100%;
          display: flex;
        `}
      >
        <Container>
          <h1
            css={css`
              text-align: center;
              margin-bottom: 20px;
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
              h3,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-family: ${fonts.regular}, sans-serif;
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          >
            {date && <h3>{date}</h3>}
          </div>
          {banner && (
            <div
              css={css`
                padding: 30px;
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
            </div>
          )}
          <br />
          {description ? <div css={css`font-style: italic; text-align: center; margin-bottom: ${rhythm(2)};`}>{description}</div> : null}
          <MDXRenderer>{post.code.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <Share
          url={blogPostUrl}
          title={title}
          type='icon'
          twitterHandle={config.twitterHandle}
        />
        <br />
      </Container>
      <Container noVerticalPadding>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
          >
            Discuss on Twitter
          </a>
          {` • `}
          <a target="_blank" rel="noopener noreferrer" href={editLink}>
            Edit post on GitHub
          </a>
        </p>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        image
        keywords
      }
    }
    post: mdx(fields: { id: { eq: $id } }) {
      fields {
        editLink
        title
        date(formatString: "MMMM DD, YYYY")
        description
        banner {
          ...bannerImage720
        }
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`
