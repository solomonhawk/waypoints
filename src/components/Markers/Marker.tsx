import * as React from 'react'
import {
  Marker as StyledMarker,
  MarkerIcon,
  Label,
  Creator
} from './styled-components'

export default function Marker({
  id,
  label,
  color,
  selected,
  position,
  creator,
  onClick
}) {
  return (
    <StyledMarker
      position={position}
      onClick={e => {
        if (e.metaKey) {
          return
        }

        onClick(id)
        e.preventDefault()
      }}
    >
      <Label selected={selected}>{label}</Label>
      <MarkerIcon color={color} selected={selected} />
      <Creator selected={selected}>{creator}</Creator>
    </StyledMarker>
  )
}
