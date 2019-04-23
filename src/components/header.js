import React, { useState } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import theme from '../../config/theme'
import Container from './container'
import { GitHub, GitLab, Twitter } from './social'
import { rhythm } from '../lib/typography'
import lighten from 'polished/lib/color/lighten'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { bpMaxSM } from '../lib/breakpoints'
import darken from 'polished/lib/color/darken'

const abNavItem = css`
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  margin-left: auto;
  margin-right: 20px;

  .abNavLink {
    display: flex;
    border-radius: 3px;
    color: ${theme.colors.white};
    padding: ${rhythm(0.15)} ${rhythm(0.35)};
    align-items: center;
    :not(:last-of-type) {
      margin-right: 10px;
    }
    :hover,
    &.active {
      span {
        color: ${theme.colors.white};
      }
    }
    :hover {
      background-color: ${lighten(0.1, theme.brand.primary)};
    }
    &.active {
      background-color: ${lighten(0.05, theme.brand.primary)};
    }
    span {
      font-size: 16px;
      transition: ${theme.transition.ease};
    }
  }
`

const abHeader = ({ dark, bgColor, headerColor }) => css`
  width: 100%;
  flex-shrink: 0;
  background: none;
  padding: 15px 0;
  background: ${dark ? '#090909' : `${bgColor}` || 'none'};

  .abNav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${headerColor};
    a {
      color: ${headerColor ? headerColor : theme.colors.body_color};
    }
    a:hover,
    a:focus {
      color: ${headerColor === theme.colors.white
        ? 'white'
        : theme.colors.link_color_hover};
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

      ${bpMaxSM} {
        display: none;
      }
    }

    .abNavSocial {
      font-size: 16px;
      line-height: 1.25;
      display: flex;
      align-items: center;

      a {
        color: ${dark ? '#fbfbfb' : 'rgba(0,0,0,0.85)'};
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

      ${bpMaxSM} {
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

const Header = ({
  dark,
  bgColor = 'none',
  siteTitle,
  headerColor = 'black',
  site,
}) => {
  const [isToggled, setToggle] = useState(false)

  return (
    <header css={abHeader({ dark, bgColor, headerColor })}>
      <Container maxWidth={900} noVerticalPadding>
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
          <span className="abNavToggler" onClick={() => setToggle(!isToggled)}>
            <FontAwesomeIcon
              css={css`
                :hover {
                  color: ${darken(0.08, headerColor)};
                }
              `}
              size="lg"
              icon={isToggled ? faTimes : faBars}
            />
          </span>
        </nav>
      </Container>
    </header>
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
    render={data => (
      <Header site={data.site} bgColor={theme.brand.primary} {...props} />
    )}
  />
)
