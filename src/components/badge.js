import React from 'react'
import Link from './link'
import {css} from '@emotion/core'
import {rhythm} from '../lib/typography'
import theme from '../../config/theme'

const abBadge = css`
  text-transform: capitalize;
  margin-right: ${rhythm(0.2)};
  a {
    color: ${theme.colors.white};
    padding: ${rhythm(0.1)} ${rhythm(0.25)};
    border-radius: 3px;
    background: ${theme.colors.primary};
    font-size: 12px;

    :hover, :focus {
      color: ${theme.colors.white};
      background: ${theme.colors.link_color_hover};
    }
  }
`

const Badge = ({text, link}) => (
  <small
    css={abBadge}>
    {link ?
      <Link
        aria-label={`View ${text}`}
        to={link}
      >
        {text}
      </Link> : {text}
    }
  </small>
)

export default Badge
