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
import styled from '@emotion/styled'

const NotebookContainer = styled.div`
  pre {
    ${({ theme }) => !theme.isDark && 'background-color: #fafafa !important;'}
  }

  code {
    :not(span) {
      ${({ theme }) => theme.isDark && 'color: #b5c3d8 !important;'}
    }
    padding: 0;
    background: unset;
  }
`

export default function Post({ data: { mdx, notebook } }) {
  const post = mdx || notebook
  const {
    editLink,
    title,
    slug,
    date,
    description,
    banner,
    bannerCredit,
  } = post.fields
  const blogPostUrl = `${config.siteUrl}${slug}`

  return (
    <Layout fields={post.fields}>
      <SEO
        fields={post.fields}
        metaImage={get(post, 'fields.banner.childImageSharp.fluid.src')}
        isBlogPost
      />
      <Container>
        <article
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              margin-bottom: ${rhythm(1)};
            `}
          >
            <h1
              css={css`
                text-align: center;
                margin-bottom: ${rhythm(1)};
              `}
            >
              {title}
            </h1>

            {date && (
              <span
                css={css`
                  display: block;
                  text-align: center;
                  font-size: ${rhythm(4 / 7)};
                  opacity: 0.6;
                  font-weight: normal;
                  margin: 0 5px;
                `}
              >
                {date}
              </span>
            )}
          </div>

          {banner && (
            <div
              css={theme => css`
                padding: ${rhythm(4 / 3)};

                ${theme.media.maxSM} {
                  padding: 0;
                }
              `}
            >
              <div
                css={css`
                  text-align: right;
                  font-size: ${rhythm(4 / 7)};
                  opacity: 0.6;
                  font-weight: normal;
                  margin-bottom: 4px;
                `}
              >
                <span>{bannerCredit}</span>
              </div>
              <Img sizes={banner.childImageSharp.fluid} />
            </div>
          )}

          {description && (
            <div
              css={css`
                font-style: italic;
                text-align: center;
                margin-top: ${rhythm(1 / 3)};
                margin-bottom: ${rhythm(2)};
              `}
            >
              {description}
            </div>
          )}

          {post.code && <MDXRenderer>{post.code.body}</MDXRenderer>}
          {post.html && (
            <NotebookContainer
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          )}

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
    mdx(fields: { id: { eq: $id } }) {
      fields {
        editLink
        title
        date(formatString: "MMMM DD, YYYY")
        description
        bannerCredit
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
    notebook: jupyterNotebook(fields: { id: { eq: $id } }) {
      fields {
        editLink
        title
        date(formatString: "MMMM DD, YYYY")
        description
        bannerCredit
        categories
        banner {
          ...bannerImage720
        }
        slug
        keywords
      }
      html
    }
  }
`
