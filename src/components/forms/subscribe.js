import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import { rhythm } from '../../lib/typography'
import Message from '../confirm-message/message'
import { PleaseConfirmIllustration } from '../confirm-message/illustrations'
import PropTypes from 'prop-types'
import { cold } from 'react-hot-loader'
import Input from './input'
import { useFetch } from '../../utilities/hooks'

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
    url: 'http://x.com',
    data,
    headers: {
      authorization: `Basic ${btoa(`any:${process.env.MAILCHIMP_API_KEY}`)}`,
    },
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
                css={theme => css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-wrap: wrap;

                  ${theme.media.maxXS} {
                    flex-flow: column;
                  }
                `}
              >
                <Input
                  name="first_name"
                  placeholder="First Name e.g Clem"
                  label="your first name"
                />
                <Input
                  name="email_address"
                  type="email"
                  placeholder="Email e.g ck@clem.ng"
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
