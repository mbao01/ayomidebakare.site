import React from 'react'
import { css } from '@emotion/core'

export default ({
  children,
  maxWidth = 600,
  horizontalPadding,
  verticalPadding,
}) => (
  <div
    css={theme => css`
      width: 100%;
      margin: 0 auto;
      max-width: calc(${`${maxWidth + (horizontalPadding ? 0 : 80)}px`});
      padding: ${`${verticalPadding ? 40 : 0}px ${
        horizontalPadding ? 40 : 0
      }px`};
      ${theme.media.maxSM} {
        padding: 20px;
      }
    `}
  >
    {children}
  </div>
)
