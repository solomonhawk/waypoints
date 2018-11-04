import * as React from 'react'
import {
  Marker as StyledMarker,
  MarkerIcon,
  Label,
  Creator
} from './styled-components'

export default function Marker({
  label,
  color,
  selected,
  position,
  creator,
  scale,
  onClick
}) {
  return (
    <StyledMarker
      highlight={selected}
      position={position}
      onClick={onClick}
      scale={scale}
    >
      <Label selected={selected}>{label}</Label>
      <MarkerIcon color={color} selected={selected} />
      <Creator selected={selected}>{creator}</Creator>
    </StyledMarker>
  )
}
