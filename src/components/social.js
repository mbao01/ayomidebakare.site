import React from 'react'
import Link from './link'
import theme from '../../config/theme'
import { css } from '@emotion/core'
import config from '../../config/website'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faGithub, faGitlab} from '@fortawesome/free-brands-svg-icons';

export const Twitter = ({
  color = `${theme.colors.body_color}`,
  url = `${config.twitter}`,
}) => (
  <Link
    to={url}
    css={css`
      color: ${color};
      margin-left: 10px;
      :hover {
        color: ${theme.brand.primary};
      }
    `}
    aria-label="Visit my Twitter"
  >
    <FontAwesomeIcon
      className=''
      icon={faTwitter}/>
  </Link>
)

export const LinkedIn = ({
  color = `${theme.colors.body_color}`,
  url = `${config.linkedin}`,
}) => (
  <Link
    to={url}
    css={css`
      margin-left: 10px;
      color: ${color};
      :hover {
        color: ${theme.brand.primary};
      }
    `}
    aria-label="Visit my LinkedIn"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
    >
      <path
        fill="currentColor"
        d="M21.6,0 L0.988235294,0 C0.423529412,0 0,0.418546713 0,0.976608997 L0,21.4853979 C0,21.9039446 0.423529412,22.3224913 0.988235294,22.3224913 L21.7411765,22.3224913 C22.3058824,22.3224913 22.7294118,21.9039446 22.7294118,21.3458824 L22.7294118,0.976608997 C22.5882353,0.418546713 22.1647059,0 21.6,0 Z M6.63529412,18.9741176 L3.38823529,18.9741176 L3.38823529,8.37093426 L6.77647059,8.37093426 L6.77647059,18.9741176 L6.63529412,18.9741176 Z M5.08235294,6.97577855 C3.95294118,6.97577855 3.10588235,5.99916955 3.10588235,5.02256055 C3.10588235,3.90643599 3.95294118,3.06934256 5.08235294,3.06934256 C6.21176471,3.06934256 7.05882353,3.90643599 7.05882353,5.02256055 C6.91764706,5.99916955 6.07058824,6.97577855 5.08235294,6.97577855 Z M19.2,18.9741176 L15.8117647,18.9741176 L15.8117647,13.8120415 C15.8117647,12.5564014 15.8117647,11.0217301 14.1176471,11.0217301 C12.4235294,11.0217301 12.1411765,12.4168858 12.1411765,13.8120415 L12.1411765,19.1136332 L8.75294118,19.1136332 L8.75294118,8.37093426 L12,8.37093426 L12,9.76608997 C12.4235294,8.92899654 13.5529412,8.09190311 15.1058824,8.09190311 C18.4941176,8.09190311 19.0588235,10.3241522 19.0588235,13.1144637 L19.0588235,18.9741176 L19.2,18.9741176 Z"
      />
    </svg>
  </Link>
)

export const GitHub = ({
  color = `${theme.colors.body_color}`,
  url = `${config.github}`,
}) => (
  <Link
    to={url}
    css={css`
      margin-left: 10px;
      color: ${color};
      :hover {
        color: ${theme.brand.primary};
      }
    `}
    aria-label="Visit my GitHub"
  >
    <FontAwesomeIcon
      className=''
      icon={faGithub}/>
  </Link>
)

export const GitLab = ({
  color = `${theme.colors.body_color}`,
  url = `${config.gitlab}`,
}) => (
  <Link
    to={url}
    css={css`
      margin-left: 10px;
      color: ${color};
      :hover {
        color: ${theme.brand.primary};
      }
    `}
    aria-label="Visit my GitLab"
  >
    <FontAwesomeIcon
      className=''
      icon={faGitlab}/>
  </Link>
)
