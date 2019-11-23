import React, { useState, useCallback } from 'react'
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
    .email('🙄 Invalid email')
    .required('Hey👋, required'),
  first_name: Yup.string().required("What's your name? 🤓"),
})

const PostSubmissionMessage = () => {
  return (
    <Message
      illustration={PleaseConfirmIllustration}
      title="Great, one last thing..."
      body="I just sent you an email with the confirmation link. 
          **Please check your inbox!**"
    />
  )
}

const Subscribe = (
  { uKey = 'newsletter', header = 'Join the Newsletter' },
  { mixpanel },
) => {
  const [values, setValues] = useState()

  const { email_address, first_name, created } = values || {}

  const data =
    email_address && first_name
      ? {
          members: [
            {
              email_address,
              created,
              status: 'subscribed',
              merge_fields: {
                FIRST_NAME: first_name,
              },
            },
          ],
        }
      : null

  const { pending, response, error } = useFetch({
    url: process.env.MAILCHIMP_PROXY_URL,
    data,
    headers: {
      'xp-content-type': 'application/json',
      'xp-authorization': `Basic ${btoa(
        `any:${process.env.MAILCHIMP_API_KEY}`,
      )}`,
    },
  })

  const handleSubmit = useCallback(_values => {
    setValues({ ..._values, created: new Date() })
  }, [])

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
      <Formik
        initialValues={{
          email_address: '',
          first_name: '',
        }}
        validationSchema={SubscribeSchema}
        onSubmit={handleSubmit}
        enableReinitialize={submitted}
        render={() => (
          <>
            {!successful && (
              <>
                <h4
                  css={css`
                    margin-bottom: ${rhythm(1 / 2)};
                    margin-top: 0;
                    text-align: center;
                  `}
                >
                  {header}
                </h4>

                <Form
                  css={theme => css`
                    display: flex;
                    padding: ${rhythm(1 / 2)} 0;
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
                      font-size: ${rhythm(4 / 7)};
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
              </>
            )}

            {submitted && !pending && <PostSubmissionMessage />}

            {error && (
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
                  {'Something went wrong!'}
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

export default Subscribe
