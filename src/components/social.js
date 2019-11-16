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

const SocialIcon = ({ url, icon, label = '' }) => {
  const theme = useTheme()

  return (
    <Link
      to={url}
      css={css`
        margin-left: 10px;

        svg:hover {
          color: ${theme.colors.primary.dark};
        }
      `}
      aria-label={label}
    >
      <FontAwesomeIcon color={theme.colors.primary.base} icon={icon} />
    </Link>
  )
}

const Twitter = () => (
  <SocialIcon url={config.twitter} icon={faTwitter} label="Tweet at me" />
)

const LinkedIn = () => (
  <SocialIcon url={config.linkedin} icon={faLinkedin} label="Link with me" />
)

const GitHub = () => (
  <SocialIcon url={config.github} icon={faGithub} label="Visit my github" />
)

const GitLab = () => (
  <SocialIcon url={config.gitlab} icon={faGitlab} label="Visit my gitlab" />
)

export { Twitter, GitHub, GitLab, LinkedIn }
