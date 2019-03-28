import React from 'react'
import { css } from '@emotion/core'
import SubscribeForm from './forms/subscribe'
import {Twitter, GitHub, GitLab} from './social'
import Container from './container'

const Footer = ({ author, noSubscribeForm }) => (
  <footer>
    <Container>
      {!noSubscribeForm && (
        <div>
          <SubscribeForm />
          <br />
          <br />
        </div>
      )}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            font-size: 90%;
            opacity: 0.7;
          `}
        >
          {author && `${author} \u00A9 ${new Date().getFullYear()}`}
        </div>
        <div>
          <Twitter />
          <GitLab />
          <GitHub />
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
