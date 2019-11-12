import React, { useState } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import Container from './container'
import { GitHub, GitLab, Twitter } from './social'
import { rhythm } from '../lib/typography'
import lighten from 'polished/lib/color/lighten'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faTimes,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import ThemeContext from '../context/theme'

const abNavItem = theme => css`
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  margin-left: auto;
  margin-right: 20px;

  .abNavLink {
    display: flex;
    border-radius: 3px;
    color: ${theme.colors.white.base};
    padding: ${rhythm(0.15)} ${rhythm(0.35)};
    align-items: center;
    :not(:last-of-type) {
      margin-right: 10px;
    }
    :hover,
    &.active {
      span {
        color: ${theme.colors.white.base};
      }
    }
    :hover {
      background-color: ${lighten(0.1, theme.colors.primary.base)};
    }
    &.active {
      background-color: ${lighten(0.05, theme.colors.primary.base)};
    }
    span {
      font-size: 16px;
      transition: ${theme.transition.ease};
    }
  }
`

const abHeader = theme => css`
  width: 100%;
  flex-shrink: 0;
  background: none;
  padding: 15px 0;
  background: ${theme.bgColor};

  .abNav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${theme.headerColor};
    a {
      color: ${theme.headerColor ? theme.headerColor : theme.bodyColor};
    }
    a:hover,
    a:focus {
      color: ${theme.headerColor === theme.colors.white.base
        ? 'white'
        : theme.linkHoverColor};
    }

    .abNavBrand {
      display: flex;
      align-items: center;

      span {
        font-size: 110%;
      }

      img {
        margin: 0 20px 0 0;
        max-width: 50px;
        border-radius: 100%;
      }
    }

    .abNavItemsGroup {
      display: flex;

      ${theme.media.maxSM} {
        display: none;
      }
    }

    .abNavSocial {
      font-size: 16px;
      line-height: 1.25;
      display: flex;
      align-items: center;

      a {
        color: ${theme.dark ? '#fbfbfb' : 'rgba(0,0,0,0.85)'};
        text-decoration: none;

        & {
          margin-left: 20px;
        }
      }

      .active {
        display: none;
        visibility: hidden;
      }

      span {
        font-weight: bold;
      }
    }

    .abNavToggler {
      display: none;

      ${theme.media.maxSM} {
        display: block;
        cursor: pointer;
        padding: 2px;
      }
    }
  }
`

const NavItems = ({ items = [] }) => (
  <div css={abNavItem}>
    {items.map((item, i) => (
      <Link
        key={i}
        className="abNavLink"
        to={item.url}
        aria-label="go to homepage"
        activeClassName="active"
      >
        <span>{item.name}</span>
      </Link>
    ))}
  </div>
)

const Header = ({ siteTitle, headerColor = 'black', site }) => {
  const [isToggled, setToggle] = useState(false)

  return (
    <ThemeContext.Consumer>
      {({ dark, toggleDark }) => (
        <header css={abHeader}>
          <Container maxWidth={900}>
            <nav
              className={isToggled ? 'abNav responsive-header' : 'abNav'}
              id="navigationMenu"
            >
              <Link
                className="abNavBrand"
                to="/"
                aria-label="go to homepage"
                activeClassName="active"
              >
                <img
                  src={`/${site.siteMetadata.image}`}
                  alt={site.siteMetadata.title}
                />
                <span>{siteTitle}</span>
              </Link>
              <div className="abNavItemsGroup">
                <NavItems items={site.siteMetadata.hotRoutes} />
                <div className="abNavSocial">
                  <span>{site.siteMetadata.social.handle}</span>
                  <Twitter color={headerColor} />
                  <GitLab color={headerColor} />
                  <GitHub color={headerColor} />
                </div>
              </div>
              <span
                className="abNavToggler"
                onClick={() => setToggle(!isToggled)}
              >
                <FontAwesomeIcon
                  css={css`
                    :hover {
                    }
                  `}
                  size="lg"
                  icon={isToggled ? faTimes : faBars}
                />
              </span>
              <span className="dark-switcher" onClick={toggleDark}>
                <FontAwesomeIcon
                  css={css`
                    cursor: pointer;
                    :hover {
                      color: '#000';
                    }
                  `}
                  size="md"
                  icon={dark ? faSun : faMoon}
                />
              </span>
            </nav>
          </Container>
        </header>
      )}
    </ThemeContext.Consumer>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            image
            hotRoutes {
              name
              url
            }
            social {
              handle
            }
          }
        }
      }
    `}
    render={data => <Header site={data.site} {...props} />}
  />
)
