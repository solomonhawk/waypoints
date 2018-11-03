import styled from 'styled-components'

// Using `display:flex` on the element that `panzoom` animates
// appears to break the functionality so we just use an extra
// wrapper element, SAD!
export const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background: linear-gradient(to bottom right, #6bc5f9, #82379d);
`

export const FlexWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
