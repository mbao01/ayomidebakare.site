import {bpMaxSM} from '../../lib/breakpoints';
import Link from '../link';
import {css} from '@emotion/core'
import React from 'react';
import styled from '@emotion/styled';
import {rhythm} from '../../lib/typography';
import theme from '../../../config/theme';

const PostTitle = styled.h2`
  margin: ${rhythm(0.4)} 0;
  transition: ${theme.transition.ease};
  :hover {
    color: ${theme.brand.primary};
    transition: ${theme.transition.ease};
  }
`

const Description = styled.p`
  margin-bottom: ${rhythm(0.3)};
  display: inline-block;
  text-align: justify;
`

const PostCard = ({post: {id, excerpt, fields, frontmatter}}) => (
  <div
    key={id}
    css={css`
      margin-bottom: ${rhythm(1)};
      padding: ${rhythm(.4)} ${rhythm(1)};
      box-shadow: 0 0 ${rhythm(0.4)} rgba(40, 40, 40, .05);
    `}
  >
    <Link
      to={fields.slug}
      aria-label={`View ${frontmatter.title}`}
    >
      <PostTitle>{frontmatter.title}</PostTitle>
    </Link>
    <Description>
      {excerpt}{' '}
      <Link
        to={fields.slug}
        aria-label={`View ${frontmatter.title}`}
      >
        Read →
      </Link>
    </Description>
    <span />
  </div>
)

export default PostCard
