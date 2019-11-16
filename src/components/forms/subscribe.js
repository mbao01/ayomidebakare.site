import React, { useReducer, useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import { rhythm } from '../../lib/typography'
import Message from '../confirm-message/message'
import { PleaseConfirmIllustration } from '../confirm-message/illustrations'
import PropTypes from 'prop-types'
import { cold } from 'react-hot-loader'
import Input from './input'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string(),
})

const PostSubmissionMessage = () => {
  return (
    <div
      css={theme => css`
        max-width: 280px;
        color: ${theme.colors.white.base};
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

function useFetch({ url, data }) {
  const [state, dispatch] = useReducer(fetchReducer, {
    error: null,
    response: null,
    pending: false,
  })
  const dataString = !!data && JSON.stringify(data)

  useEffect(() => {
    console.log('Url: ', url)
    console.log('Data: ', dataString)

    if (url && dataString) {
      dispatch({ type: 'fetching' })
      fetch(url, {
        method: 'post',
        body: dataString,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(
            `any:${process.env.MAILCHIMP_API_KEY}`,
          )}`,
          mode: 'no-cors',
        },
      })
        .then(r => {
          console.log('Response: ', r)
          return dispatch({ type: 'success', response: r && r.json() })
        })
        .catch(error => dispatch({ type: 'error', error }))
    }
  }, [dataString, url])

  return state
}

const Subscribe = (
  { uKey = 'newsletter', header = 'Join the Newsletter' },
  { mixpanel },
) => {
  const [values, setValues] = useState()

  const { email_address, first_name } = values || {}

  const data =
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
    data,
    uKey,
  })

  const errorMessage = error ? 'Something went wrong!' : null
  const submitted = Boolean(response)

  const successful = response && response.status === 'success'

  if (submitted && mixpanel) {
    mixpanel.people.set_once(data)
    mixpanel.identify(data.email_address)
    mixpanel.track(uKey, {
      ...data,
      response,
    })
  }

  return (
    <div
      css={css`
        padding: ${rhythm(1 / 2)};
      `}
    >
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
          <>
            {!successful && (
              <Form
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-wrap: wrap;
                `}
              >
                <Input
                  name="first_name"
                  placeholder="First Name e.g Michael"
                  label="your first name"
                />
                <Input
                  name="email_address"
                  type="email"
                  placeholder="Email e.g jane@acme.com"
                  label="your email address"
                />
                <button
                  css={css`
                    font-size: ${rhythm(2 / 3)};
                    margin: ${rhythm(1 / 4)} ${rhythm(1 / 2)};
                  `}
                  data-element="submit"
                  type="submit"
                  disabled={pending}
                >
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
                  margin: ${rhythm(1 / 2)};
                  text-align: center;
                `}
              >
                <span
                  css={theme => css`
                    background-color: ${theme.colors.white.base};
                    border-radius: 4px;
                    color: ${theme.colors.red.base};
                    font-size: ${rhythm(2 / 3)};
                    padding: ${rhythm(1 / 20)} ${rhythm(1)};
                    text-align: center;
                  `}
                >
                  {errorMessage}
                </span>
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

Subscribe.contextTypes = {
  mixpanel: PropTypes.object,
}

export default cold(Subscribe)
