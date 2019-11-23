import { useReducer, useEffect, useRef } from 'react'
import { CustomError } from '../lib/custom-error'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
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
    case 'reset': {
      return { error: null, response: null, pending: false }
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function useFetch({ url, method = 'post', headers = {}, data }) {
  const [state, dispatch] = useReducer(fetchReducer, {
    error: null,
    response: null,
    pending: false,
  })

  const dataString = !!data && JSON.stringify(data)

  useEffect(
    () => {
      if (url && dataString) {
        dispatch({ type: 'fetching' })

        fetch(url, {
          method,
          body: dataString,
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            mode: 'no-cors',
            ...headers,
          },
        })
          .then(async r => {
            const status = `${r.status}`

            r = r && (await r.json())

            const { error, errors, message = 'Something went wrong' } = r

            if (status && !status.startsWith('2')) {
              // eslint-disable-next-line babel/new-cap
              throw CustomError(status, errors || error || r, message)
            }

            return r
          })
          .then(res => {
            return dispatch({ type: 'success', response: res })
          })
          .catch(e => {
            dispatch({ type: 'error', error: e && (e.error || e.errors) })
          })
      }

      return () => {
        dispatch({ type: 'reset' })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataString],
  )

  return state
}

export { useInterval, useFetch }
