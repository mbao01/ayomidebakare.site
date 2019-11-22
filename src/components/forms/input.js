import React from 'react'
import { css } from '@emotion/core'
import { Field, ErrorMessage } from 'formik'
import { rhythm } from '../../lib/typography'

export default ({ type = 'text', name, label = '', placeholder = '' }) => {
  return (
    <label
      css={css`
        margin: 0;
        position: relative;
      `}
      htmlFor={name}
    >
      <ErrorMessage
        name={name}
        component="span"
        css={theme => css`
          background-color: ${theme.colors.white.base};
          bottom: 32px;
          border-radius: 4px;
          color: ${theme.colors.red.base};
          font-size: 70%;
          font-weight: bold;
          left: 19px;
          padding: 0 ${rhythm(0.2)};
          position: absolute;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
      />
      <Field
        aria-label={label}
        aria-required="true"
        name={name}
        placeholder={placeholder}
        type={type}
        css={css`
          border-radius: 3px;
          font-size: ${rhythm(2 / 3)};
          margin: ${rhythm(1 / 4)} ${rhythm(1 / 2)};
        `}
      />
    </label>
  )
}
