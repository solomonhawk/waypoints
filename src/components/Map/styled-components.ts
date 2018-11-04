import styled from 'styled-components'

export const Wrapper = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    background: center / contain no-repeat url(${props => props.background})
      transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${props => props.opacity};
    transition: opacity 0.5s;
  }
`
