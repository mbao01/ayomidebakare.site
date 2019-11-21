import React from 'react'
import { css } from '@emotion/core'
import { UnsubscribeIllustration } from '../components/confirm-message/illustrations'
import Message from '../components/confirm-message/message'
import { rhythm } from '../lib/typography'
import Layout from '../components/layout'

export default () => (
  <Layout noSubscribeForm>
    <div
      css={css`
        margin: ${rhythm(2)} auto;

        h2 {
          font-size: ${rhythm(1.3)};
          margin-bottom: ${rhythm(2 / 5)};
        }
        p {
          max-width: 440px;
        }
      `}
    >
      <Message
        illustration={UnsubscribeIllustration}
        body={
          "It looks like you're looking for what doesn't exist... the sadness."
        }
        title="NOT FOUND"
      />
    </div>
  </Layout>
)
