import React from 'react'
import Link from './link'
import { css } from '@emotion/core'
import config from '../config/website'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faLinkedin,
  faGithub,
  faGitlab,
} from '@fortawesome/free-brands-svg-icons'
import { useTheme } from 'emotion-theming'

const SocialIcon = ({ url, icon, label = '', color, hoverColor }) => {
  const theme = useTheme()

  return (
    <Link
      to={url}
      css={css`
        margin-left: 10px;

        svg:hover {
          color: ${hoverColor || theme.linkHoverColor};
        }
      `}
      aria-label={label}
    >
      <FontAwesomeIcon color={color || theme.linkColor} icon={icon} />
    </Link>
  )
}

const Twitter = () => (
  <SocialIcon
    url={config.twitter}
    icon={faTwitter}
    color="#00acee"
    label="Tweet at me"
  />
)

const LinkedIn = () => (
  <SocialIcon
    url={config.linkedin}
    icon={faLinkedin}
    color="#0072b1"
    label="Link with me"
  />
)

const GitHub = () => (
  <SocialIcon
    url={config.github}
    icon={faGithub}
    color="#6e5494"
    label="Visit my github"
  />
)

const GitLab = () => (
  <SocialIcon
    url={config.gitlab}
    icon={faGitlab}
    color="#fca326"
    label="Visit my gitlab"
  />
)

export { Twitter, GitHub, GitLab, LinkedIn }
