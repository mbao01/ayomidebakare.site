import React from 'react'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { TwitterShareButton, FacebookShareButton } from 'react-share'
import { rhythm } from '../lib/typography'

const Share = ({ type, url, title, twitterHandle }) => (
  <div
    css={theme => css`
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        cursor: pointer;
        color: ${theme.colors.primary.base};
        display: flex;
        :not(:last-of-type) {
          margin-right: ${rhythm(1 / 2)};
        }

        :hover {
          color: ${theme.colors.primary.base};
        }
      }

      span {
        margin-right: ${rhythm(2 / 3)};
        font-size: ${rhythm(1 / 2)};
        text-transform: uppercase;
        opacity: 0.7;
      }
    `}
  >
    <span>Share post</span>
    <TwitterShareButton
      url={url}
      title={title}
      via={twitterHandle.split('@').join('')}
    >
      {type === 'icon' ? <FontAwesomeIcon icon={faTwitter} /> : `Twitter`}
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      quote={title}
      via={twitterHandle.split('@').join('')}
    >
      {type === 'icon' ? <FontAwesomeIcon icon={faFacebook} /> : `Facebook`}
    </FacebookShareButton>
  </div>
)

export default Share
