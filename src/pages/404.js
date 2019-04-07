import React from 'react'
import {css} from '@emotion/core'
import {UnsubscribeIllustration} from '../components/confirm-message/illustrations'
import Message from '../components/confirm-message/message'
import { rhythm } from '../lib/typography';

export default () => (
  <div
    css={css`
      h2 {
        font-size: ${rhythm(1.3)};
        margin-bottom: ${rhythm(0.4)};
      }
      p {
        max-width: 440px;
      }
    `}>
    <Message
      illustration={UnsubscribeIllustration}
      body={'You just hit a route that doesn\'t exist... the sadness.'}
      title='NOT FOUND'
      fullscreen={true}
    />
  </div>
)
