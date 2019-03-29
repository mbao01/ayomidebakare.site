import React from 'react'
import {Link, StaticQuery, graphql} from 'gatsby'
import {css} from '@emotion/core'
import theme from '../../config/theme'

import Container from './container'
import {GitHub, GitLab, Twitter} from './social'
import {rhythm} from '../lib/typography'
import lighten from 'polished/lib/color/lighten'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {bpMaxSM} from '../lib/breakpoints'
import darken from 'polished/lib/color/darken';

function toggleMenu() {
  let x = document.getElementById('navigationMenu')
  if (x.className.includes(' responsive-header')) {
    x.className = x.className.replace(' responsive-header', '')
  } else {
    x.className += ' responsive-header'
  }
}

const NavItems = ({items = []}) => (
  <div
    css={css`
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      margin-left: auto;
      margin-right: 20px;
    `}
  >
    {items.map((item, i) => (
      <Link
        key={i}
        css={css`
          display: flex;
          border-radius: 3px;
          color: ${theme.colors.white};
          padding: ${rhythm(0.15)} ${rhythm(0.35)};
          align-items: center;
          :not(:last-of-type) {
            margin-right: 10px;
          }
          :hover, &.active {
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
        `}
        to={item.url} aria-label="go to homepage" activeClassName="active"
      >
        <span>{item.name}</span>
      </Link>))}
  </div>
)

const Header = ({dark, bgColor = 'none', siteTitle, headerColor = 'black', site}) => (
  <header
    css={css`
      width: 100%;
      flex-shrink: 0;
      background: none;
      padding: 15px 0;
      background: ${dark ? '#090909' : `${bgColor}` || 'none'};
    `}
  >
    <Container maxWidth={900} noVerticalPadding>
      <nav
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${headerColor};
          a {
            color: ${headerColor ? headerColor : theme.colors.body_color};
          }
          a:hover, a:focus {
            color: ${headerColor === theme.colors.white
          ? 'white'
          : theme.colors.link_color_hover};
          }
        `}
        id={'navigationMenu'}
      >
        <Link
          css={css`
            display: flex;
            align-items: center;
            span {
              font-size: 120%;
            }
          `}
          to="/" aria-label="go to homepage" activeClassName="active"
        >
          <img
            css={css`
              margin: 0 20px 0 0;
              max-width: 50px;
              border-radius: 100%;
            `}
            src={`/${site.siteMetadata.image}`}
            alt={site.siteMetadata.title}
          />
          <span>{siteTitle}</span>
        </Link>
        <div css={css`
          display: flex;
          ${bpMaxSM} {
            display: none;
          }
        `}>
          <NavItems
            items={
            [
              {
                name: 'Blog',
                url: '/blog'
              },
              {
                name: 'About',
                url: '/about'
              },
              {
                name: 'Hire me',
                url: '/hire-me'
              }
            ]
          }/>
          <div
            css={css`
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
            `}
          >
            <span>{site.siteMetadata.social.handle}</span>
            <Twitter color={headerColor}/>
            <GitLab color={headerColor}/>
            <GitHub color={headerColor}/>
          </div>
        </div>
        <span
          css={css`
            display: none;
            ${bpMaxSM} {
              display: block;
              cursor: pointer;
              padding: 2px;
            }
          `}
          onClick={toggleMenu}>
          <FontAwesomeIcon
            css={css`
              :hover {
                color: ${darken(0.08, headerColor)};
              }
            `}
            size={'lg'}
            icon={faBars}
          />
        </span>
      </nav>
    </Container>
  </header>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            image
            social {
              handle
            }
          }
        }
      }
    `}
    render={data => <Header site={data.site} bgColor={theme.brand.primary} {...props}/>}
  />
)
