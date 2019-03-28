import { darken, lighten } from 'polished'
import { fonts } from '../src/lib/typography'

const brand = {
  primary: '#3896E6',
  secondary: '#FAFAFA',
}

const colors = {
  primary: '#3896E6',
  primary_light: `${lighten(0.15, brand.primary)}`,
  secondary_light: `${lighten(0.05, brand.secondary)}`,
  gray: '#E3E3E3',
  gray_dark: '#939393',
  black: '#000',
  white: '#fff',
  bg_color: '#fafafa',
  body_color: 'rgba(0,0,0,0.85)',
  link_color: brand.primary,
  link_color_hover: `${darken(0.07, brand.primary)}`,
  red: '#E86C60',
  green: '#29B573',
  blue: '#327CDC',
  yellow: '#FFB700',
  purple: '#8242F6',
  purple_dark: '#231c42',
}

const theme = {
  colors,
  fonts,
  brand,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  container: {
    base: '100rem',
    text: '55rem',
  },
  spacer: {
    horizontal: '2rem',
    vertical: '3rem',
  },
  transition: {
    ease: 'all 200ms ease',
  },
}

export default theme
