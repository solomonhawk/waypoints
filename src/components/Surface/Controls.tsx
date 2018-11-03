import * as React from 'react'
import { ControlsWrapper, Control } from './styled-components'
import { IoIosContract, IoIosExpand } from 'react-icons/io'

export default function Controls({ resetZoom, isZoomed, zoomScale }) {
  let Icon = zoomScale > 1 ? IoIosContract : IoIosExpand

  return (
    <ControlsWrapper>
      <Control onClick={resetZoom} disabled={!isZoomed}>
        <Icon size={30} />
      </Control>
    </ControlsWrapper>
  )
}
