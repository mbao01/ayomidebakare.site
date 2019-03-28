import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
import {css} from '@emotion/core'
import {rhythm} from '../lib/typography';

const Announcement = () => {

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              image
              social {
                handle
              }
            }
          }
        }
      `}
      render={ props => <div>Announcement
        <h1
          css={css`
          position: relative;
          z-index: 5;
          line-height: 1.5;
          margin: 0;
          max-width: ${rhythm(15)};
        `}
        >
          Hi! Welcome to my blog. Feel free to leave a comment, let me know what interests you on here!
        </h1>
      </div> }
    />
  )
}

export default Announcement
