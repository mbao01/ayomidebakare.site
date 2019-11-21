import React from 'react'
import { css, keyframes } from '@emotion/core'
import Markdown from 'react-markdown'
import Link from '../link'
import { rhythm } from '../../lib/typography'

const FadeIn = keyframes`
  ${'from, 0%'} {
    opacity: 0;
  }
  ${'to, 100%'} {
    opacity: 1;
  }
`

export default ({
  illustration,
  title,
  body,
  note,
  fullscreen = false,
  articleTitle,
  articleSlug,
  vertical,
}) => {
  return (
    <div
      css={theme => css`
        min-height: ${fullscreen ? '100vh' : 'auto'};
        margin: 0;
        width: 100vw;
        max-width: 100% !important;
        padding: 0 ${rhythm(1 / 2)};
        display: flex;
        flex-direction: ${vertical ? 'column' : 'row'};
        align-items: center;
        justify-content: center;
        text-align: center;
        transition: ${theme.transition.ease};

        ${theme.media.maxSM} {
          flex-direction: column;
        }

        p {
          margin-top: 10px;
          max-width: 400px;
          line-height: 1.5;
          font-weight: 400;

          strong {
            font-weight: 600;
          }
        }

        > div {
          margin: ${rhythm(1 / 2)};
        }
      `}
    >
      <div>{illustration}</div>

      <div>
        <h2
          css={css`
            font-size: ${rhythm(1)};
            margin: 0;
            animation: ${FadeIn} 400ms ease-in-out 1;
          `}
        >
          {title}
        </h2>

        {body && <Markdown>{body}</Markdown>}

        {note && (
          <div
            css={css`
              color: rgba(0, 0, 0, 0.7);
              transform: scale(0.85);
              span:hover {
                opacity: 1;
                color: rgba(0, 0, 0, 1);
              }
            `}
          >
            <span>
              <Markdown>{note}</Markdown>
            </span>
          </div>
        )}

        {articleTitle && (
          <div>
            <Link to={`/${articleSlug}`}>{articleTitle}</Link>
          </div>
        )}
      </div>
    </div>
  )
}
