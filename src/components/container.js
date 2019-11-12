import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: calc(
    ${({ maxWidth = 600, horizontalPadding }) =>
      `${maxWidth + (horizontalPadding ? 0 : 80)}px`}
  );
  padding: ${({ verticalPadding, horizontalPadding }) =>
    `${verticalPadding ? '40px' : 0} ${horizontalPadding ? '40px' : 0}`};
  ${({ theme }) => theme.media.maxSM} {
    padding: ${({ verticalPadding, horizontalPadding }) =>
      `${verticalPadding ? '20px' : 0} ${horizontalPadding ? '20px' : 0}`};
  }
`

export default props => <Container {...props}>{props.children}</Container>
