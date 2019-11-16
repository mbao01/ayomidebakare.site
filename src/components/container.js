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
      max-width: calc(
        ${`${typeof maxWidth == 'number' ? `${maxWidth}px` : maxWidth} + ${
          horizontalPadding ? 0 : '80px'
        }`}
      );
      padding: ${`${verticalPadding ? 40 : 0}px ${
        horizontalPadding ? 40 : 0
      }px`};
      ${theme.media.maxSM} {
        padding: 0 20px;
      }
    `}
  >
    {children}
  </div>
)
