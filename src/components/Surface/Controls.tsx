import * as React from 'react'
import { ControlsWrapper, Control, Instruction } from './styled-components'
import { IoIosContract, IoIosExpand } from 'react-icons/io'

export default function Controls({
  resetZoom,
  showUnderlay,
  hasTransform,
  zoomScale
}) {
  let Icon = zoomScale > 1 ? IoIosContract : IoIosExpand

  return (
    <ControlsWrapper displayBackdrop={showUnderlay}>
      <Control onClick={resetZoom} disabled={!hasTransform} shortcut="F">
        <Icon size={30} />
      </Control>
    </ControlsWrapper>
  )
}
