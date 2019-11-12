import React from 'react'
import Link from './link'
import { css } from '@emotion/core'
import { rhythm } from '../lib/typography'

const abBadge = theme => css`
  text-transform: capitalize;
  margin-right: ${rhythm(0.2)};
  a {
    color: ${theme.colors.white.base};
    padding: ${rhythm(0.1)} ${rhythm(0.25)};
    border-radius: 3px;
    background: ${theme.colors.primary.base};
    font-size: 12px;

    :hover,
    :focus {
      color: ${theme.colors.white.base};
      background: ${theme.linkHoverColor};
    }
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
