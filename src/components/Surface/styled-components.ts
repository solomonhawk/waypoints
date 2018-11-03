import styled from 'styled-components'

// Using `display:flex` on the element that `panzoom` animates
// appears to break the functionality so we just use an extra
// wrapper element, SAD!
export const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: hidden;

  &:focus {
    outline: none;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const FlexWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 40px;
`

export const Control = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background: #ebb942;
  border-radius: 50%;
  transition: all 0.3s;

  &[disabled] {
    opacity: 0;
    pointer-events: none;
  }
`
