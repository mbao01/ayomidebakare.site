import React, {Fragment} from 'react'
import Helmet from 'react-helmet'
import {graphql, StaticQuery} from 'gatsby'
import {MDXProvider} from '@mdx-js/tag'
import {Global, css} from '@emotion/core'
import {ThemeProvider} from 'emotion-theming'
import {bpMaxSM} from '../lib/breakpoints'
import theme from '../../config/theme'
import mdxComponents from './mdx'
import Header from './header'
import reset from '../lib/reset'
import {fonts} from '../lib/typography'
import config from '../../config/website'
import Footer from './footer'
import './styles.css'

export const globalStyles = css`
  .button-secondary {
    border-radius: 4px;
    padding: 12px 12px;
    background: ${theme.colors.secondary_light};
  }
  ${bpMaxSM} {
    p,
    em,
    strong {
      font-size: 90%;
    }
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 24px;
    }
  }
  hr {
    margin: 50px 0;
    border: none;
    border-top: 1px solid ${theme.colors.gray};
    background: none;
  }
  em {
    font-family: ${fonts.regularItalic};
  }
  strong {
    em {
      font-family: ${fonts.semiboldItalic};
    }
  }
  input {
    border-radius: 4px;
    border: 1px solid ${theme.colors.gray};
    padding: 5px 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    font-family: ${fonts.regular};
    margin-top: 5px;
    ::placeholder {
      opacity: 0.4;
    }
  }
  .gatsby-resp-image-image {
    background: none !important;
    box-shadow: 0;
  }
  button {
    border-radius: 4px;
    background-color: ${theme.brand.primary};
    border: none;
    color: ${theme.colors.white};
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid ${theme.brand.primary};
    transition: ${theme.transition.ease};
    :hover {
      background: ${theme.colors.link_color_hover};
      border: 1px solid ${theme.colors.link_color_hover};
      transition: ${theme.transition.ease};
    }
  }
  pre {
    background-color: #061526 !important;
    border-radius: 4px;
    font-size: 16px;
    padding: 10px;
    overflow-x: auto;
    white-space: nowrap;
    /* Track */
    ::-webkit-scrollbar {
      width: 100%;
      height: 5px;
      border-radius: 0 0 5px 5px;
    }
    ::-webkit-scrollbar-track {
      background: #061526;
      border-radius: 0 0 4px 4px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }
  }
  ${reset};
`

function Layout(
  {
    data,
    frontmatter = {},
    children,
    dark,
    headerBg,
    headerColor,
    noFooter,
    noSubscribeForm = true,
  }) {
  const {
    site: {
      siteMetadata,
      siteMetadata: {description: siteDescription, keywords: siteKeywords},
    },
  } = data

  const {
    keywords = siteKeywords,
    description = siteDescription,
    title = config.siteTitle,
  } = frontmatter


  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global styles={globalStyles}/>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100vh;
          `}
        >
          <Helmet
            title={title || config.siteTitle}
            meta={[
              {name: 'description', content: description},
              {name: 'keywords', content: keywords},
            ]}
          >
            <html lang="en"/>
            <noscript>This site runs best with JavaScript enabled.</noscript>
          </Helmet>
          <Header
            siteTitle={siteMetadata.title}
            dark={dark}
            bgColor={headerBg}
            headerColor={headerColor}
          />
          <MDXProvider components={mdxComponents}>
            <Fragment>{children}</Fragment>
          </MDXProvider>
          {!noFooter && (
            <Footer
              author={siteMetadata.author.name}
              noSubscribeForm={noSubscribeForm}
            />
          )}
        </div>
      </Fragment>
    </ThemeProvider>
  )
}

export default function LayoutWithSiteData(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
              author {
                name
              }
              keywords
            }
          }
        }
      `}
      render={data => <Layout data={data} {...props} />}
    />
  )
}
