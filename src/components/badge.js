import { css } from '@emotion/core'

const Badge = () => (
  <span className={'btn btn-primary'}>
    Profile <span className='badge badge-light'>9</span>
    <span className='sr-only'>unread messages</span>
  </span>
)

export default Badge
