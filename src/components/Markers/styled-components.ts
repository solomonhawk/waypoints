import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const Marker = styled.button`
  border: none;
  background: transparent;
  left: ${props => props.position.x * 100}%;
  top: ${props => props.position.y * 100}%;
  position: absolute;

  &:focus {
    outline: none;
  }

  // a bigger and more consistent click target
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top 40%;
    left: 50%;
    padding: 100%;
    transform: translate(-50%, -50%);
    border-radius: 40%;
  }
`

export const MarkerIcon = styled.div`
  background: ${props => (props.selected ? '#6BC5F9' : props.color)}
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  border: 1px solid ${props => (props.selected ? '#6BC5F9' : props.color)};
  display: block;
  width: 4px;
  height: 4px;
  transform: rotate(45deg);
  border-radius: ${props => (props.selected ? 0 : '50%')};
  box-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.5);
`

const BaseLabel = styled.div`
  color: ${props => (props.selected ? '#6BC5F9' : '#fff')};
  text-shadow: 0 0 10px 10px ${props => (props.selected ? '#fff' : '#000')};
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.5);
`

export const Label = styled(BaseLabel)`
  font-size: 10px;
  font-weight: bold
  bottom: 140%;
`

export const Creator = styled(BaseLabel)`
  font-size: 8px;
  top: 130%;
`
