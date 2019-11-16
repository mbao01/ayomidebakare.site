import React from 'react'
import Link from './link'
import { css } from '@emotion/core'
import { rhythm } from '../lib/typography'

const abBadge = theme => css`
  text-transform: capitalize;
  margin-right: ${rhythm(0.2)};

  a {
    background-color: ${theme.linkColor};
    border-radius: 3px;
    color: ${theme.colors.white.base};
    font-size: 12px;
    padding: ${rhythm(0.1)} ${rhythm(0.25)};
    text-decoration: none;
  }

  a:hover {
    background-color: ${theme.linkHoverColor};
  }
`

const Badge = ({ text, link }) => {
  return (
    <small css={abBadge}>
      {link ? (
        <Link aria-label={`View ${text}`} to={link}>
          {text}
        </Link>
      ) : (
        { text }
      )}
    </small>
  )
}

export default Badge
