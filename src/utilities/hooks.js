import { useReducer, useEffect, useRef } from 'react'

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

  console.log('Data: ', data)

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
          .then(r => {
            return dispatch({ type: 'success', response: r && r.json() })
          })
          .catch(error => dispatch({ type: 'error', error }))
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
