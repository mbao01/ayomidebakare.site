import React from 'react'
import { css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'
import { useTheme } from 'emotion-theming'
import { rhythm } from '../lib/typography'
import { Twitter, GitHub, GitLab } from './social'
import SubscribeForm from './forms/subscribe'
import Container from './container'

export default function Footer({ noSubscribeForm }) {
  const theme = useTheme()
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  return (
    <footer>
      <Container>
        {!noSubscribeForm && <SubscribeForm />}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: ${rhythm(1 / 2)} 0;
            padding: ${rhythm(1 / 2)};
          `}
        >
          <span
            css={css`
              font-size: ${theme.baseFontSize};
              margin-bottom: ${rhythm(1 / 2)};
              opacity: 0.7;
            `}
          >
            {`${
              data.site.siteMetadata.author.name
            } \u00A9 ${new Date().getFullYear()}`}
          </span>

          <div>
            <Twitter color={theme.colors.primary.base} />
            <GitLab color={theme.colors.primary.base} />
            <GitHub color={theme.colors.primary.base} />
          </div>
        </div>
      </Container>
    </footer>
  )
}
