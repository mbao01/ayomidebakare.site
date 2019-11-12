import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../lib/typography'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import styled from '@emotion/styled'

const AnnouncementContainer = styled.div`
  position: relative;
  > small {
    position: absolute;
    z-index: 1;
    top: -15px;
    font-size: 13px;
    left: 20px;
    max-height: 40px;
    padding: 5px 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px rgba(20, 20, 20, 0.1);
    background-color: ${({ fields, theme }) =>
      fields.typeColor || theme.colors.green.base};
  }

  > pre {
    position: relative;
    max-width: ${rhythm(15)};
    min-height: 100px;
    max-height: 200px;
    padding: ${rhythm(1)} ${rhythm(1.5)};
    background-color: ${({ theme }) => theme.colors.white.base};
    white-space: pre-wrap;
    word-wrap: break-word;
    a {
      color: ${({ fields, theme }) =>
        fields.typeColor || theme.colors.green.base};
      text-decoration: underline;
    }
  }
`

/**
 * Announcement Component
 * @returns {*}
 * @constructor
 */
const Announcement = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          announcements: allMdx(
            filter: {
              frontmatter: { published: { ne: false } }
              fileAbsolutePath: { regex: "//content/announcements//" }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
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
      render={({ announcements }) =>
        announcements &&
        announcements.edges &&
        renderAnnouncements(
          announcements.edges.filter(
            ({ node }) => new Date(node.fields.expiryDate) > Date.now(),
          ),
        )
      }
    />
  )
}

/** Helpers **/
function renderAnnouncements(announcements) {
  return (
    announcements &&
    announcements.map(({ node: { id, code, fields } }) => (
      <AnnouncementContainer fields={fields} key={id}>
        {fields.type && <small> {fields.type} </small>}
        <pre>
          <MDXRenderer>{code.body}</MDXRenderer>
        </pre>
      </AnnouncementContainer>
    ))
  )
}

export default Announcement
