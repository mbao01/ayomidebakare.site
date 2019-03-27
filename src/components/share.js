import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

import {TwitterShareButton, FacebookShareButton} from 'react-share'

const Share = ({type, url, title, twitterHandle}) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div {
        margin-right: 20px;
        cursor: pointer;
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
          className=''
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
          className=''
          icon={faFacebook}/> : `Facebook`}
    </FacebookShareButton>
  </div>
)

export default Share
