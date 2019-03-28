import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

import {TwitterShareButton, FacebookShareButton} from 'react-share'

const Share = ({color = theme.colors.gray_dark, type, url, title, twitterHandle}) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div {
        cursor: pointer;
        color: ${color};
        :not(:last-of-type) {
          margin-right: 20px;
        }
        :hover {
          color: ${theme.brand.primary};
        }
      }
      span {
        margin-right: 20px;
        font-size: 70%;
        text-transform: uppercase;
        line-height: 2.5;
        opacity: 0.7;
      }
    `}
  >
    <div
      css={css`
        flex-grow: 1;
        border-top: 1px solid ${theme.colors.gray};
      `}
    />
    <span>Share post</span>
    <TwitterShareButton
      url={url}
      title={title}
      via={twitterHandle.split('@').join('')}
    >
      {type === 'icon' ?
        <FontAwesomeIcon
          /*color={color}*/
          icon={faTwitter}/> : `Twitter`}
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      quote={title}
      via={twitterHandle.split('@').join('')}
      css={css`
        cursor: pointer;
      `}
    >
      {type === 'icon' ?
        <FontAwesomeIcon
          /*color={color}*/
          icon={faFacebook}/> : `Facebook`}
    </FacebookShareButton>
  </div>
)

export default Share
