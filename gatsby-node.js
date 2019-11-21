const path = require('path')
const _ = require('lodash')
const slugify = require('@sindresorhus/slugify')
const { createFilePath } = require('gatsby-source-filesystem')
const remark = require('remark')
const stripMarkdownPlugin = require('strip-markdown')

const PAGINATION_OFFSET = 7

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

const createPaginatedPages = (
  createPage,
  edges,
  rootPathPrefix,
  pathPrefix,
  paginationTemplate,
  context,
) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    acc[pageIndex].push(value.node.id)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`
    const nextPagePath =
      index === 1 ? rootPathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${rootPathPrefix}`,
      component: paginationTemplate,
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    })
  })
}

const createCategoryPages = (
  createPage,
  edges,
  pathPrefix,
  paginationTemplate,
  context,
) => {
  const categoryPages = edges.reduce((acc, value) => {
    const categories = value.node.fields.categories || []

    categories.forEach(category => {
      if (!acc[category]) {
        acc[category] = []
      }

      acc[category].push(value)
    })

    return acc
  }, {})

  const categoryPathPrefix = `${pathPrefix}/category`

  const sortedCategories = Object.keys(categoryPages).sort()

  sortedCategories.forEach((category, index) => {
    const previousCategoryPath =
      index === sortedCategories.length - 1
        ? null
        : `${categoryPathPrefix}/${sortedCategories[index + 1]}`
    const nextCategoryPath =
      index === 0
        ? null
        : `${categoryPathPrefix}/${sortedCategories[index - 1]}`

    createPaginatedPages(
      createPage,
      categoryPages[category],
      `${categoryPathPrefix}/${category}`,
      `${categoryPathPrefix}/${category}`,
      paginationTemplate,
      {
        category: {
          category,
          nextCategoryPath,
          previousCategoryPath,
          categoryPathPrefix,
        },
        ...context,
      },
    )
  })
}

function stripMarkdown(markdownString) {
  return remark()
    .use(stripMarkdownPlugin)
    .processSync(markdownString)
    .toString()
}

function createBlogPages({ blogPath, data, paginationTemplate, actions }) {
  if (!data || _.isEmpty(data.edges)) {
    throw new Error('There are no posts!')
  }

  const { edges } = data
  const { createRedirect, createPage } = actions

  createPosts(createPage, createRedirect, edges)

  createPaginatedPages(
    actions.createPage,
    edges,
    blogPath,
    `${blogPath}/page`,
    paginationTemplate,
    {
      categories: [],
    },
  )

  createCategoryPages(actions.createPage, edges, blogPath, paginationTemplate, {
    categories: [],
  })

  return null
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    let slug =
      node.frontmatter.slug ||
      createFilePath({ node, getNode, basePath: `pages` })

    //::TODO:: Find a wasy to scope fields to particular directory or Mdx data
    if (node.fileAbsolutePath.includes('content/blog/')) {
      slug = `/blog/${node.frontmatter.slug || slugify(parent.name)}`
    }

    // Create common fields
    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'unlisted',
      node,
      value: node.frontmatter.unlisted,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/mbao01/ayomidebakare.site/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })

    // Create fields from Blog
    createNodeField({
      name: 'author',
      node,
      value: node.frontmatter.author || 'Ayomide Bakare',
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'plainTextDescription',
      node,
      value: stripMarkdown(node.frontmatter.description),
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'bannerCredit',
      node,
      value: node.frontmatter.bannerCredit,
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })

    // Create fields from Announcements
    createNodeField({
      name: 'expiryDate',
      node,
      value: node.frontmatter.expiryDate
        ? node.frontmatter.expiryDate.split(' ')[0]
        : '',
    })

    createNodeField({
      name: 'type',
      node,
      value: node.frontmatter.type,
    })

    createNodeField({
      name: 'images',
      node,
      value: node.frontmatter.images,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    fragment PostDetails on Mdx {
      fileAbsolutePath
      id
      parent {
        ... on File {
          name
          sourceInstanceName
        }
      }
      excerpt(pruneLength: 250)
      fields {
        title
        slug
        description
        categories
        date
        redirects
      }
      code {
        scope
      }
    }
    query {
      blog: allMdx(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "//content/blog//" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
      announcements: allMdx(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "//content/announcements//" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fileAbsolutePath
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
              scope
            }
          }
        }
      }
    }
  `)

  const { blog } = data

  if (errors) {
    return Promise.reject(errors)
  }

  createBlogPages({
    blogPath: '/blog',
    data: blog,
    paginationTemplate: path.resolve(`src/templates/blog.js`),
    actions,
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  })
}
