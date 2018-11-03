import * as React from 'react'
import { Wrapper, FlexWrapper } from './styled-components'
// import * as createPanZoom from 'panzoom' - having trouble making this work with TS
let panzoom = require('panzoom')

export interface ISurfaceProps {
  width: string | number
  height: string | number
  children: React.ReactNode
}

export default class Surface extends React.Component<ISurfaceProps, {}> {
  static defaultProps: Partial<ISurfaceProps> = {
    width: '100%',
    height: '100%'
  }

  componentDidMount() {
    if (this.refs.wrapper) {
      panzoom(this.refs.wrapper)
    }
  }

  render() {
    const { width, height } = this.props

    return (
      <Wrapper ref="wrapper" width={width} height={height}>
        <FlexWrapper>{this.props.children}</FlexWrapper>
      </Wrapper>
    )
  }
}
