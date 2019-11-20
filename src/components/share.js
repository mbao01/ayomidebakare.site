import React from 'react'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { TwitterShareButton, FacebookShareButton } from 'react-share'
import { rhythm } from '../lib/typography'
import Link from '../components/link'

const Share = ({ type, url, title, twitterHandle }) => (
  <div
    css={theme => css`
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        cursor: pointer;
        color: ${theme.linkColor};
        display: flex;
        :not(:last-of-type) {
          margin-right: ${rhythm(1 / 2)};
        }

        :hover {
          color: ${theme.linkHoverColor};
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
      {type === 'icon' ? (
        <FontAwesomeIcon color="#00acee" icon={faTwitter} />
      ) : (
        `Twitter`
      )}
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      quote={title}
      via={twitterHandle.split('@').join('')}
    >
      {type === 'icon' ? (
        <FontAwesomeIcon color="#3b5998" icon={faFacebook} />
      ) : (
        `Facebook`
      )}
    </FacebookShareButton>
  </div>
)

const SocialEngagement = ({ blogPostUrl, editLink }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: ${rhythm(1 / 2)} 0;
      `}
    >
      <small>
        {blogPostUrl && (
          <Link
            to={`https://twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Discuss on Twitter"
          >
            <span
              css={css`
                margin-right: ${rhythm(0.2)};
              `}
            >
              Discuss on
            </span>
            <FontAwesomeIcon color="#00acee" icon={faTwitter} />
          </Link>
        )}
        {blogPostUrl && editLink && (
          <span
            css={css`
              margin: 0 ${rhythm(0.3)};
            `}
          >
            OR
          </span>
        )}
        {editLink && (
          <Link
            to={editLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Edit post on Github"
          >
            <span
              css={css`
                margin-right: ${rhythm(0.2)};
              `}
            >
              Edit on
            </span>
            <FontAwesomeIcon color="#6e5494" icon={faGithub} />
          </Link>
        )}
      </small>
    </div>
  )
}

export { SocialEngagement }
export default Share
