import styled from 'styled-components'
import { twilight, deepSea, plum, plum2, electricSky } from 'config/theme'

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

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40vw;
    height: 40vh;
    pointer-events: none;
    background: linear-gradient(
      to bottom right,
      rgba(18, 57, 131, 0),
      rgba(18, 57, 131, 0),
      rgba(18, 57, 131, 0.3)
    );
    transition: opacity 1s;
    opacity: ${props => (props.displayBackdrop ? 1 : 0)};
  }
`

export const Control = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  width: 60px;
  height: 60px;
  align-items: center;
  box-shadow: 0 0 40px ${electricSky};
  justify-content: center;
  background: ${electricSky};
  border-radius: 50%;
  transition: all 0.3s;

  &[disabled] {
    opacity: 0;
    pointer-events: none;
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 20px ${deepSea}, 0 0 40px ${electricSky},
      0 0 20px ${electricSky}, 0 0 15px ${electricSky};
  }

  ${props =>
    props.shortcut
      ? `
    &::after {
      content: '${props.shortcut}';
      font-size: 14px;
      font-weight: bold;
      position: absolute;
      top: 0;
      color: ${electricSky};
      background: ${plum};
      box-shadow: 0 2px 40px ${electricSky}, 0 4px 1px ${plum2};
      padding: 4px 6px;
      border-radius: 4px;
      border: 2px solid ${plum2};
    }
  `
      : ``};
`

export const InstructionsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 40px;
  max-width: 260px;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40vw;
    height: 40vh;
    pointer-events: none;
    background: linear-gradient(
      to bottom left,
      rgba(18, 57, 131, 0),
      rgba(18, 57, 131, 0),
      rgba(18, 57, 131, 0.3)
    );
    transition: opacity 1s;
    opacity: ${props => (props.displayBackdrop ? 1 : 0)};
  }
`

export const Instruction = styled.p`
  margin-top: 20px;
  font-size: 13px;
  line-height: 1.4;
  color: ${electricSky};
  text-shadow: 0 2px 10px ${plum2}, 1px 1px 1px rgba(0, 0, 0, 0.8);
`
