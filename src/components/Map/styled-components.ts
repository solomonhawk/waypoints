import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: center / contain no-repeat url(${props => props.background})
    transparent;
`
