import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
import {css} from '@emotion/core'
import {rhythm} from '../lib/typography';
import theme from '../../config/theme'
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

function renderAnnouncements(announcements) {
  console.log(announcements)
  return (announcements && announcements.map(({node: {id, code, fields}}) =>
    <div
      key={id}
      css={css`
        position: relative;
      `}
    >
      {fields.type && <small
        css={css`
              position: absolute;
              z-index: 1;
              background-color: ${fields.typeColor || theme.colors.green};
              top: -15px;
              font-size: 13px;
              left: 20px;
              max-height: 40px;
              padding: 5px 10px;
              border-radius: 3px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 5px rgba(20, 20, 20, .1);
            `}
      >
        {fields.type}
      </small>}
      <pre
        css={css`
              position: relative;
              max-width: ${rhythm(15)};
              min-height: 100px;
              max-height: 200px;
              padding: ${rhythm(1)} ${rhythm(1.5)};
              background-color: ${theme.colors.white};
              white-space: pre-wrap;
              word-wrap: break-word;
              a {
                color: ${fields.typeColor || theme.colors.green};
                text-decoration: underline;
              }
            `}>
              <MDXRenderer>{code.body}</MDXRenderer>
          </pre>
    </div>
  ))
}

const Announcement = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          announcements: allMdx(
            filter: {
              frontmatter: {published: {ne: false}}
              fileAbsolutePath: {regex: "//content/announcements//"}
            }
            sort: {order: DESC, fields: [frontmatter___date]}
          ) {
            edges {
              node {
                id
                parent {
                  ... on File {
                    name
                    sourceInstanceName
                  }
                }
                excerpt
                fields {
                  date
                  expiryDate
                  title
                  type
                  published
                  unlisted
                }
                code {
                  body
                }
              }
            }
          }
        }
      `}
      render={({announcements}) => (
        announcements && announcements.edges &&
        renderAnnouncements(announcements.edges.filter(({node}) =>
          new Date(node.fields.expiryDate) > Date.now()))
      )}
    />
  )
}

export default Announcement
