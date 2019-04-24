import React, { useReducer, useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import theme from '../../../config/theme'
import { rhythm } from '../../lib/typography'
import Message from '../confirm-message/message'
import { PleaseConfirmIllustration } from '../confirm-message/illustrations'
import PropTypes from 'prop-types'
import { cold } from 'react-hot-loader'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string(),
})

const PostSubmissionMessage = () => {
  return (
    <div
      css={css`
        max-width: 280px;
        color: ${theme.colors.white};
      `}
    >
      <Message
        illustration={PleaseConfirmIllustration}
        title="Great, one last thing..."
        body="I just sent you an email with the confirmation link. 
          **Please check your inbox!**"
      />
    </div>
  )
}

function fetchReducer(state, { type, response, error }) {
  switch (type) {
    case 'fetching': {
      return { error: null, response: null, pending: true }
    }
    case 'success': {
      return { error: null, response, pending: false }
    }
    case 'error': {
      return { error, response: null, pending: false }
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function useFetch({ url, body }) {
  const [state, dispatch] = useReducer(fetchReducer, {
    error: null,
    response: null,
    pending: false,
  })
  const bodyString = !!body && JSON.stringify(body)

  useEffect(() => {
    if (url && bodyString) {
      dispatch({ type: 'fetching' })
      fetch(url, {
        method: 'post',
        body: bodyString,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          mode: 'no-cors',
        },
      })
        .then(r => r.json())
        .then(response => {
          return dispatch({ type: 'success', response })
        })
        .catch(error => dispatch({ type: 'error', error }))
    }
  }, [bodyString, url])

  return state
}

const Subscribe = (
  { uKey = 'newsletter', header = 'Join the Newsletter' },
  { mixpanel },
) => {
  const [values, setValues] = useState()

  const { email_address, first_name } = values || {}

  const body =
    email_address && first_name
      ? {
          email_address,
          merge_fields: {
            FIRST_NAME: first_name,
          },
        }
      : null

  const { pending, response, error } = useFetch({
    url: process.env.MAILCHIMP_LIST_ID,
    body,
    uKey,
  })

  const errorMessage = error ? 'Something went wrong!' : null
  const submitted = Boolean(response)

  const successful = response && response.status === 'success'

  if (submitted && mixpanel) {
    mixpanel.people.set_once(body)
    mixpanel.identify(body.email_address)
    mixpanel.track(uKey, {
      ...body,
      response,
    })
  }

  return (
    <div>
      {!successful && (
        <h4
          css={css`
            margin-bottom: ${rhythm(1)};
            margin-top: 0;
            text-align: center;
          `}
        >
          {header}
        </h4>
      )}

      <Formik
        initialValues={{
          email_address: '',
          first_name: '',
          created: Date.now(),
        }}
        validationSchema={SubscribeSchema}
        onSubmit={setValues}
        render={() => (
          <div>
            {!successful && (
              <Form
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  font-size: 16px;
                  label {
                    margin-bottom: ${rhythm(0.4)};
                  }
                  button {
                    margin-bottom: ${rhythm(0.4)};
                    color: ${theme.colors.white};
                    background-color: ${theme.colors.green};
                    border: none;
                  }
                  .field-error {
                    display: block;
                    color: ${theme.colors.red};
                    background-color: ${theme.colors.white};
                    padding: 0 ${rhythm(0.2)};
                    font-size: 70%;
                    font-weight: bold;
                    border-radius: 2px;
                  }
                  input {
                    width: 100%;
                    font-size: 14px;
                    color: ${theme.colors.primary_dark};
                    border-radius: 3px;
                  }
                `}
              >
                <label htmlFor="first_name">
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
                    <ErrorMessage
                      name="first_name"
                      component="span"
                      className="field-error"
                    />
                  </div>
                  <Field
                    aria-label="your first name"
                    aria-required="false"
                    name="first_name"
                    placeholder="First Name e.g Jane"
                    type="text"
                  />
                </label>
                <label htmlFor="email">
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
                    <ErrorMessage
                      name="email_address"
                      component="span"
                      className="field-error"
                    />
                  </div>
                  <Field
                    aria-label="your email address"
                    aria-required="true"
                    name="email_address"
                    placeholder="Email e.g jane@acme.com"
                    type="email"
                  />
                </label>
                <button data-element="submit" type="submit" disabled={pending}>
                  {!pending && 'Subscribe'}
                  {pending && 'Subscribing...'}
                </button>
              </Form>
            )}
            {submitted && !pending && (
              <PostSubmissionMessage response={response} />
            )}
            {errorMessage && (
              <div
                css={css`
                  color: ${theme.colors.red};
                  background-color: ${theme.colors.white};
                  padding: 0 ${rhythm(0.2)};
                  font-size: 80%;
                  text-align: center;
                  font-weight: bold;
                  border-radius: 2px;
                `}
              >
                {errorMessage}
              </div>
            )}
          </div>
        )}
      />
    </div>
  )
}

Subscribe.contextTypes = {
  mixpanel: PropTypes.object,
}

export default cold(Subscribe)
