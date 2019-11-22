import { darken, lighten } from 'polished'
import { options, rhythm } from '../lib/typography'

const colors = {
  black: {
    base: '#000000',
  },
  white: {
    base: '#ffffff',
  },
  primary: {
    base: '#388ce6',
    dark: `${darken(0.07, '#388ce6')}`,
    light: `${lighten(0.15, '#388ce6')}`,
  },
  secondary: {
    base: '#e68138',
    dark: `${darken(0.05, '#e68138')}`,
    light: `${lighten(0.05, '#e68138')}`,
  },
  grey: {
    base: '#ababab',
    dark: `${darken(0.05, '#ababab')}`,
    light: `${lighten(0.05, '#ababab')}`,
  },
  red: {
    base: '#e0483d',
    dark: `${darken(0.05, '#e0483d')}`,
    light: `${lighten(0.05, '#e0483d')}`,
  },
  green: {
    base: '#6fd987',
    dark: `${darken(0.05, '#6fd987')}`,
    light: `${lighten(0.05, '#6fd987')}`,
  },
  blue: {
    base: '#6fa2d9',
    dark: `${darken(0.05, '#6fa2d9')}`,
    light: `${lighten(0.05, '#6fa2d9')}`,
  },
  yellow: {
    base: '#e3ce44',
    dark: `${darken(0.05, '#e3ce44')}`,
    light: `${lighten(0.05, '#e3ce44')}`,
  },
  indigo: {
    base: '#163457',
    dark: '#111d2e',
    light: `${lighten(0.05, '#0c1c2e')}`,
  },
}

const breakpoints = {
  xs: 576,
  sm: 767,
  md: 1023,
  lg: 1200,
}

const general = {
  media: {
    maxXS: `@media (max-width: ${breakpoints.xs}px)`,
    maxSM: `@media (max-width: ${breakpoints.sm}px)`,
    maxMD: `@media (max-width: ${breakpoints.md}px)`,
    tabletOnly: `@media (min-width: ${breakpoints.xs + 1}px) and (max-width: ${
      breakpoints.md
    }px)`,
    desktopOnly: `@media (min-width: ${breakpoints.md + 1}px)`,
  },
  container: {
    base: rhythm(100),
    text: rhythm(55),
  },
  spacer: {
    horizontal: rhythm(2),
    vertical: rhythm(3),
  },
  transition: {
    ease: 'all 300ms ease',
  },
}

const theme = {
  dark: {
    ...options,
    ...general,
    breakpoints,
    colors,
    linkColor: colors.secondary.base,
    linkHoverColor: colors.secondary.dark,
    bgColor: colors.indigo.light,
    bodyColor: colors.grey.light,
    textColor: colors.white.base,
    isDark: true,
  },
  light: {
    ...options,
    ...general,
    breakpoints,
    colors,
    linkColor: colors.primary.base,
    linkHoverColor: colors.primary.dark,
    bgColor: colors.white.base,
    bodyColor: colors.grey.light,
    textColor: colors.indigo.light,
    isDark: false,
  },
}

export default theme
