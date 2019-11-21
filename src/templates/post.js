import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from '../components/seo'
import { css } from '@emotion/core'
import Container from '../components/container'
import Layout from '../components/layout'
import { rhythm } from '../lib/typography'
import Share, { SocialEngagement } from '../components/share'
import config from '../config/website'
import { get } from 'lodash'
import { PostCategories } from '../components/post/post-card'

export default function Post({ data: { site, post } }) {
  const { editLink, title, slug, date, description, banner } = post.fields
  const blogPostUrl = `${config.siteUrl}${slug}`

  return (
    <Layout frontmatter={post.fields}>
      <SEO
        frontmatter={post.fields}
        metaImage={get(post, 'fields.banner.childImageSharp.fluid.src')}
        isBlogPost
      />
      <Container>
        <article
          css={css`
            width: 100%;
          `}
        >
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
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          >
            {date && <h3>{date}</h3>}
          </div>
          {banner && (
            <div
              css={theme => css`
                padding: 30px;
                ${theme.media.maxSM} {
                  padding: 0;
                }
              `}
            >
              <Img sizes={banner.childImageSharp.fluid} />
            </div>
          )}
          <br />
          {description ? (
            <div
              css={css`
                font-style: italic;
                text-align: center;
                margin-bottom: ${rhythm(2)};
              `}
            >
              {description}
            </div>
          ) : null}
          <MDXRenderer>{post.code.body}</MDXRenderer>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: ${rhythm(1 / 2)} 0;
            `}
          >
            <PostCategories categories={post.fields.categories} />
          </div>

          <Share
            url={blogPostUrl}
            title={title}
            type="icon"
            twitterHandle={config.twitterHandle}
          />
          <SocialEngagement blogPostUrl={blogPostUrl} editLink={editLink} />
        </article>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    post: mdx(fields: { id: { eq: $id } }) {
      fields {
        editLink
        title
        date(formatString: "MMMM DD, YYYY")
        description
        categories
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
