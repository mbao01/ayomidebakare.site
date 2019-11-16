import React from 'react'
import Link from '../link'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { rhythm } from '../../lib/typography'
import config from '../../config/website'
import Share from '../share'
import Img from 'gatsby-image'
import Badge from '../badge'

const PostCard = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#f8f8f8' : '#fafafa')};
  border-radius: 4px;
  color: ${({ theme }) => (theme.isDark ? theme.bgColor : theme.textColor)};
  margin-bottom: ${rhythm(2)};
`

const SmallPostCard = styled.div`
  padding: ${rhythm(1 / 2)} ${rhythm(1)};
`

const LargePostCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rhythm(3 / 2)};

  ${({ theme }) => theme.media.maxSM} {
    padding: ${rhythm(1)};
  }
  :not(:first-of-type) {
    margin-top: ${rhythm(1)};
  }
  :first-of-type {
    margin-top: ${rhythm(1)};
  }
`

const PostTitle = styled.h2`
  margin: ${rhythm(2 / 5)} 0;
  transition: ${({ theme }) => theme.transition.ease};

  a:hover {
    transition: ${({ theme }) => theme.transition.ease};
    text-decoration: none;
  }
`

const PostDescription = styled.p`
  margin-top: ${rhythm(2 / 5)};
  display: inline-block;
  text-align: justify;
`

const PostBanner = styled.div`
  margin: ${rhythm(2 / 5)} 0;
  display: inline-block;
`

const PostCategories = ({ categories }) => (
  <div
    css={css`
      padding: ${rhythm(2 / 5)} 0;
      display: flex;
      flex-wrap: wrap;
    `}
  >
    {categories &&
      categories.map((category, index) => (
        <Badge
          key={index}
          text={category}
          link={`/blog/category/${category}`}
        />
      ))}
  </div>
)

export default ({ post: { excerpt, fields, frontmatter }, type = 'small' }) => (
  <PostCard>
    {type === 'small' ? (
      <SmallPostCard>
        <PostTitle>
          <Link to={fields.slug} aria-label={`View ${frontmatter.title}`}>
            {frontmatter.title}
          </Link>
        </PostTitle>

        <small>{frontmatter.date}</small>

        <PostDescription>{excerpt}</PostDescription>

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: ${rhythm(1 / 2)} 0;
          `}
        >
          <PostCategories categories={fields.categories} />

          <Link to={fields.slug} aria-label={`View ${frontmatter.title}`}>
            <small>Read</small>
          </Link>
        </div>

        <Share
          type="icon"
          url={`${config.siteUrl}${fields.slug}`}
          title={frontmatter.title}
          twitterHandle={config.twitterHandle}
        />
      </SmallPostCard>
    ) : type === 'large' ? (
      <LargePostCard>
        {frontmatter.banner && (
          <PostBanner>
            <Link
              aria-label={`View ${frontmatter.title} article`}
              to={`${fields.slug}`}
            >
              <Img sizes={frontmatter.banner.childImageSharp.fluid} />
            </Link>
            <div>
              <small>{frontmatter.bannerCredit}</small>
            </div>
          </PostBanner>
        )}
        <PostTitle>
          <Link
            aria-label={`View ${frontmatter.title} article`}
            to={`${fields.slug}`}
          >
            {frontmatter.title}
          </Link>
        </PostTitle>

        <small>{frontmatter.date}</small>

        <PostDescription>{excerpt}</PostDescription>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: ${rhythm(1 / 2)} 0;
          `}
        >
          <PostCategories categories={fields.categories} />

          <Link to={fields.slug} aria-label={`View ${frontmatter.title}`}>
            <small>Read</small>
          </Link>
        </div>
      </LargePostCard>
    ) : null}
  </PostCard>
)
