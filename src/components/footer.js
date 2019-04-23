import React from 'react'
import { css } from '@emotion/core'
import SubscribeForm from './forms/subscribe'
import { Twitter, GitHub, GitLab } from './social'
import Container from './container'
import { rhythm } from '../lib/typography'
import theme from '../../config/theme'

const Footer = ({ author, noSubscribeForm }) => (
  <footer>
    <Container>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        `}
      >
        {!noSubscribeForm && (
          <div
            css={css`
              background-color: ${theme.colors.primary};
              padding: ${rhythm(0.5)};
              border-radius: 6px;
              h4,
              h3 {
                color: ${theme.colors.white};
              }
            `}
          >
            <SubscribeForm />
          </div>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: ${rhythm(1)} 0;
            padding: ${rhythm(0.5)};
          `}
        >
          <div
            css={css`
              font-size: 90%;
              opacity: 0.7;
              margin-bottom: ${rhythm(0.4)};
            `}
          >
            {author && `${author} \u00A9 ${new Date().getFullYear()}`}
          </div>

          <div>
            <Twitter color={theme.colors.primary} />
            <GitLab color={theme.colors.primary} />
            <GitHub color={theme.colors.primary} />
          </div>
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
