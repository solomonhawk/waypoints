import styled from 'styled-components'
import { electricSky } from 'config/theme'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const Marker = styled.button`
  position: absolute;
  left: ${p => p.position.x * 100}%;
  top: ${p => p.position.y * 100}%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transform: scale(${p => p.scale});
  transition: transform 0.5s;
  margin: -10px 0 0 -10px;
  z-index: 1;

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
    mix-blend-mode: overlay;
    opacity: ${p => (p.highlight ? 0.3 : 0)};
    background: radial-gradient(${electricSky}, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0));
    transform: translate(-50%, -50%) scale(${p => Math.min(1, p.scale * 2)});
    transition: opacity 0.5s;
    border-radius: 40%;
  }

  &::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 75px;
    top 40%;
    left: 50%;
    pointer-events: none;
    opacity: ${p => (p.highlight ? 0.5 : 0)};
    transform: translate(-50%, -50%) scale(${p =>
      p.highlight ? Math.min(1, p.scale * 2) : 3});
    transition: opacity 0.2s linear, transform 0.3s ease-in-out;
    border-radius: 50%;
    border: 1px solid ${electricSky};
  }
`

export const MarkerIcon = styled.div`
  background: ${p => (p.selected ? electricSky : p.color)}
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  border: 1px solid ${p => (p.selected ? electricSky : p.color)};
  display: block;
  width: 4px;
  height: 4px;
  transform: rotate(45deg);
  border-radius: ${p => (p.selected ? 0 : '50%')};
  box-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.5);
`

const BaseLabel = styled.p`
  color: ${p => (p.selected ? electricSky : '#fff')};
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.9);
  min-width: 80px;
`

export const Label = styled(BaseLabel)`
  font-size: 10px;
  font-weight: bold
  bottom: 90%;
`

export const Creator = styled(BaseLabel)`
  font-size: 8px;
  top: 90%;
`
