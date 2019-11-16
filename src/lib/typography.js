import Typography from 'typography'
import quoraTheme from 'typography-theme-quora'

const typography = new Typography(quoraTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const { rhythm, scale, options } = typography
