import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, faFacebook} from '@fortawesome/free-brands-svg-icons'

import {TwitterShareButton, FacebookShareButton} from 'react-share'

const abShare = ({color}) => css`
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
  
  .abShareContainer {
    flex-grow: 1;
    border-top: 1px solid ${theme.colors.gray};
  }
`

const Share = ({color = theme.colors.gray_dark, type, url, title, twitterHandle}) => (
  <div css={abShare({color})}>
    <div className='abShareContainer'/>
    <span>Share post</span>
    <TwitterShareButton url={url}
                        title={title}
                        via={twitterHandle.split('@').join('')}>
      {
        type === 'icon' ?
        <FontAwesomeIcon icon={faTwitter}
                         /*color={color}*//> : `Twitter`
      }
    </TwitterShareButton>
    <FacebookShareButton url={url}
                         quote={title}
                         via={twitterHandle.split('@').join('')}>
      {
        type === 'icon' ?
        <FontAwesomeIcon icon={faFacebook}
                         /*color={color}*//> : `Facebook`
      }
    </FacebookShareButton>
  </div>
)

export default Share
