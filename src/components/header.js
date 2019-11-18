import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/core'
import Container from './container'
import { GitHub, Twitter } from './social'
import { rhythm } from '../lib/typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const abHeader = theme => css`
  width: 100%;
  flex-shrink: 0;
  background: none;
  padding: 10px 20px;
  background: transparent;

  nav {
    width: 100%;
    min-height: 56px;
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
        font-size: ${rhythm(7 / 13)};
      }
      img {
        margin: 0 20px 0 0;
        max-width: 50px;
        border-radius: 100%;
      }
    }

    .abNavTitle {
      font-size: 16px;
      font-weight: bold;
    }

    .abNavSocial {
      display: inline;

      a {
        & {
          margin: 5px;
        }
      }

      .active {
        display: none;
        visibility: hidden;
      }
    }

    .abToggler {
      cursor: pointer;

      :hover,
      :focus {
        color: ${theme.headerColor === theme.colors.white.base
          ? 'white'
          : theme.linkHoverColor};
      }
    }
  }
`

export default ({ dark, toggleDark }) => {
  const [hover, setHover] = useState(false)

  const handleHover = () => {
    setHover(!hover)
  }

  const data = useStaticQuery(graphql`
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
  `)

  return (
    <header css={abHeader}>
      <Container maxWidth={900}>
        <nav className="abNav">
          <div
            className="abNavBrand"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            <Link
              to="/"
              aria-label="go to homepage"
              activeClassName="active"
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <img
                src={`/${data.site.siteMetadata.image}`}
                alt={data.site.siteMetadata.title}
              />
            </Link>

            {hover && (
              <div
                css={theme => css`
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  transition: ${theme.transition.ease};
                `}
              >
                <div className="abNavTitle">{data.site.siteMetadata.title}</div>
                <div className="abNavSocial">
                  <span>{data.site.siteMetadata.social.handle}</span>
                  <Twitter />
                  <GitHub />
                </div>
              </div>
            )}
          </div>

          <div className="abToggler" onClick={toggleDark}>
            <FontAwesomeIcon icon={dark ? faSun : faMoon} />
          </div>
        </nav>
      </Container>
    </header>
  )
}
