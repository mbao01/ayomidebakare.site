import React from 'react'
import Link from '../link'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import {rhythm} from '../../lib/typography'
import theme from '../../../config/theme'
import config from '../../../config/website'
import Share from '../share'
import {bpMaxSM} from '../../lib/breakpoints'
import Img from 'gatsby-image'
import Badge from '../badge'

const SmallPostCard = styled.div`
  background-color: #fafafa;
  margin-bottom: ${rhythm(1)};
  padding: ${rhythm(.4)} ${rhythm(1)};
`

const LargePostCard = styled.div`
  :not(:first-of-type) {
    margin-top: 20px;
    ${bpMaxSM} {
      margin-top: 20px;
    }
  }
  :first-of-type {
    margin-top: 20px;
    ${bpMaxSM} {
      margin-top: 20px;
    }
  }
  .gatsby-image-wrapper {
  }
  background: white;
  padding: 40px;
  ${bpMaxSM} {
    padding: 20px;
  }
  display: flex;
  flex-direction: column;
`

const PostTitle = styled.h2`
  margin: ${rhythm(1)} 0 ${rhythm(0.4)} 0;
  transition: ${theme.transition.ease};
  :hover {
    color: ${theme.brand.primary};
    transition: ${theme.transition.ease};
  }
`

const PostDescription = styled.p`
  margin-top: ${rhythm(0.4)};
  display: inline-block;
  text-align: justify;
`

const PostBanner = styled.div`
  margin-top: ${rhythm(0.4)};
  display: inline-block;
`

const PostCategories = ({categories}) => (
  <div
    css={css`
      padding: ${rhythm(0.2)} 0;
      display: flex;
      flex-wrap: wrap;
    `}>
      {
        categories &&
        categories.map((category, index) => (
          <Badge key={index} text={category} link={`/blog/category/${category}`}/>
        ))
      }
  </div>
)

const PostCard = ({post: {excerpt, fields, frontmatter}, type = 'small'}) => (
  <div>
    {type === 'small' ?
      <SmallPostCard>
        <Link
          to={fields.slug}
          aria-label={`View ${frontmatter.title}`}
        >
          <PostTitle>{frontmatter.title}</PostTitle>
        </Link>
        <PostDescription>
          {excerpt}
        </PostDescription>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}>
          <PostCategories categories={fields.categories}/>

          <Link
            to={fields.slug}
            aria-label={`View ${frontmatter.title}`}
          >
            <small>Read</small>
          </Link>
        </div>
        <Share
          type='icon'
          url={`${config.siteUrl}${fields.slug}`}
          title={frontmatter.title}
          twitterHandle={config.twitterHandle}
        />
      </SmallPostCard> :
      type === 'large' ?
        <LargePostCard>
          {frontmatter.banner && (
            <PostBanner>
              <Link
                aria-label={`View ${frontmatter.title} article`}
                to={`${fields.slug}`}
              >
                <Img sizes={frontmatter.banner.childImageSharp.fluid}/>
              </Link>
              <div>
                <small>{frontmatter.bannerCredit}</small>
              </div>
            </PostBanner>
          )}
          <Link
            aria-label={`View ${frontmatter.title} article`}
            to={`${fields.slug}`}
          >
            <PostTitle>
              {frontmatter.title}
            </PostTitle>
          </Link>
          {/* <small>{post.frontmatter.date}</small> */}
          <PostDescription>
            {excerpt}
          </PostDescription>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}>
            <PostCategories categories={fields.categories}/>

            <Link
              to={fields.slug}
              aria-label={`View ${frontmatter.title}`}
            >
              <small>Read</small>
            </Link>
          </div>
        </LargePostCard> : null
    }
  </div>
)

export default PostCard
