import * as React from 'react'
import { InstructionsWrapper, Instruction } from './styled-components'

export default function Instructions({ showUnderlay }) {
  return (
    <InstructionsWrapper displayBackdrop={showUnderlay}>
      <Instruction>
        Click and drag to <b>Pan</b>. Mousewheel / doubleclick to <b>Zoom</b>.
      </Instruction>
      <Instruction>
        Press CMD/CTRL + Click to <b>Add a Marker.</b>
      </Instruction>
      <Instruction>Select a Marker by Clicking on it.</Instruction>
      <Instruction>
        To <b>Delete a Marker</b>, select it and press BACKSPACE / DELETE.
      </Instruction>
    </InstructionsWrapper>
  )
}
