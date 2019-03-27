import React from 'react'
import {Link, StaticQuery, graphql} from 'gatsby'
import {css} from '@emotion/core'
import theme from '../../config/theme'

import Container from './container'
import {GitHub, GitLab, Twitter} from './social';

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
          a:hover {
            color: ${headerColor === theme.colors.white
          ? 'white'
          : theme.colors.link_color_hover};
          }
        `}
      >
        <Link css={css`
                display: flex;
                align-items: center;
              `}
              to="/" aria-label="go to homepage" activeClassName="active">
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
          <Twitter/>
          <GitLab/>
          <GitHub/>
        </div>
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
    render={data => <Header site={data.site} {...props} bgColor={theme.brand.primary}/>}
  />
)
