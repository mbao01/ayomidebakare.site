import React from 'react'
import Link from './link'
import { css } from '@emotion/core'
import { rhythm } from '../lib/typography'

const Badge = ({ text, link }) => {
  return (
    <small
      css={theme => css`
        text-transform: capitalize;
        margin-right: ${rhythm(1 / 5)};
        margin-bottom: ${rhythm(2 / 5)};

        span,
        a {
          background-color: ${theme.linkColor};
          border-radius: 10px;
          color: ${theme.colors.white.base};
          font-size: ${rhythm(1 / 2)};
          padding: ${rhythm(1 / 10)} ${rhythm(2 / 5)};
          text-decoration: none;
        }

        span:hover,
        a:hover {
          background-color: ${theme.linkHoverColor};
        }
      `}
    >
      {link ? (
        <Link aria-label={`View ${text}`} to={link}>
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </small>
  )
}

export default Badge
