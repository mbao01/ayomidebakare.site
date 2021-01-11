import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { rhythm } from '../lib/typography'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import styled from '@emotion/styled'
import { useInterval } from '../utilities/hooks'

const AnnouncementContainer = styled.div`
  position: relative;
  margin: ${rhythm(1)} auto;

  > small {
    position: absolute;
    z-index: 1;
    top: ${rhythm(-1 / 2)};
    font-size: ${rhythm(1 / 2)};
    left: ${rhythm(1)};
    max-height: ${rhythm(1)};
    padding: 3px ${rhythm(1 / 2)};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px rgba(20, 20, 20, 0.1);
    background-color: ${({ badgeColor, theme }) =>
      badgeColor || theme.linkColor};
  }

  > pre {
    position: relative;
    width: ${rhythm(20)};
    height: ${rhythm(15 / 2)};
    max-height: ${rhythm(10)};
    padding: ${rhythm(1)} ${rhythm(3 / 2)};
    color: ${({ theme }) => theme.colors.white.base};
    white-space: pre-wrap;
    word-wrap: break-word;

    ${({ theme }) => theme.media.maxMD} {
      width: ${rhythm(15)};
    }

    ${({ theme }) => theme.media.maxSM} {
      width: auto;
      max-width: ${rhythm(15)};
    }

    a {
      color: ${({ badgeColor, theme }) =>
        badgeColor || theme.colors.green.base};
      text-decoration: underline;
    }
  }
`

const Announcements = ({ group, announcements }) => {
  const [index, setIndex] = useState(0)

  useInterval(
    () => {
      setIndex(Math.floor(Math.random() * announcements.length))
    },
    announcements.length > 1 ? 10000 : null,
  )

  const { fields, code } = announcements[index]

  return (
    <AnnouncementContainer badgeColor={fields.badgeColor} key={group}>
      {fields.type && <small> {fields.type} </small>}
      <pre>
        <MDXRenderer>{code.body}</MDXRenderer>
      </pre>
    </AnnouncementContainer>
  )
}

/**
 * Announcement Component
 * @returns {*}
 * @constructor
 */
export default () => {
  const { announcements } = useStaticQuery(graphql`
    query {
      announcements: allMdx(
        filter: {
          fields: { published: { ne: false } }
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
  `)

  const groupedAnnouncements = {}

  announcements.edges.forEach(({ node }) => {
    const {
      fields: { expiryDate, type = 'defaut' },
    } = node
    if (new Date(expiryDate) > Date.now()) {
      if (groupedAnnouncements[type]) {
        groupedAnnouncements[type].push(node)
      } else {
        groupedAnnouncements[type] = [node]
      }
    }
  })

  return Object.entries(groupedAnnouncements).map(
    ([group, filteredAnnouncements], index) => (
      <Announcements
        key={index}
        group={group}
        announcements={filteredAnnouncements}
      />
    ),
  )
}
