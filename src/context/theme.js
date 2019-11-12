import React from 'react'
import theme from '../config/theme'

const defaultState = {
  dark: false,
  toggleDark: () => {},
  theme: theme.light,
}

const ThemeContext = React.createContext(defaultState)

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches === true
}

class ThemeProvider extends React.Component {
  state = {
    dark: JSON.parse(localStorage.getItem('dark')) || supportsDarkMode(),
  }

  toggleDark = () => {
    this.setState(({ dark }) => {
      dark = !dark

      localStorage.setItem('dark', JSON.stringify(dark))

      return { dark }
    })
  }

  render() {
    const { children } = this.props
    const { dark } = this.state

    return (
      <ThemeContext.Provider
        value={{
          dark,
          theme: dark ? theme.dark : theme.light,
          toggleDark: this.toggleDark,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
