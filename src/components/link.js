import React from 'react'
import GatsbyLink from 'gatsby-link'
import { css } from '@emotion/core'

const Link = ({ children, to, ...other }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink to={to} {...other}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

export default Link
