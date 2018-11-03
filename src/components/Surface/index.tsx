import * as React from 'react'
import { Container, Wrapper, FlexWrapper } from './styled-components'
import Controls from './Controls'
import { debounce } from 'lodash'

// import * as createPanZoom from 'panzoom' - having trouble making this work with TS
let panzoom = require('panzoom')

export interface ISurfaceProps {
  width: string | number
  height: string | number
  children: React.ReactNode
  zoomSpeed?: number
  minZoom?: number
  maxZoom?: number
  onPanStart?: () => void
  afterPanStart?: () => void
  onPanEnd?: () => void
  afterPanEnd?: () => void
}

export interface ISurfaceState {
  isZoomed: boolean
  zoomScale: number
}

export default class Surface extends React.Component<
  ISurfaceProps,
  ISurfaceState
> {
  panzoomer: any
  panning: boolean

  static defaultProps: Partial<ISurfaceProps> = {
    width: '100%',
    height: '100%',
    zoomSpeed: 0.05,
    minZoom: 0.75,
    maxZoom: 5,
    onPanStart: () => {},
    afterPanStart: () => {},
    onPanEnd: () => {},
    afterPanEnd: () => {}
  }

  constructor(props) {
    super(props)

    this.state = {
      isZoomed: false,
      zoomScale: 1
    }

    this.resetZoom = this.resetZoom.bind(this)
    this.onZoom = debounce(this.onZoom.bind(this), 50)
  }

  componentDidMount() {
    let {
      zoomSpeed,
      minZoom,
      maxZoom,
      onPanStart,
      onPanEnd,
      afterPanStart,
      afterPanEnd
    } = this.props

    if (this.refs.wrapper) {
      this.panzoomer = panzoom(this.refs.wrapper, {
        zoomSpeed,
        maxZoom,
        minZoom
      })

      this.panzoomer.on('zoom', this.onZoom)

      this.panzoomer.on('panstart', () => {
        onPanStart()
        setTimeout(afterPanStart, 0)
      })

      this.panzoomer.on('panend', () => {
        onPanEnd()
        setTimeout(afterPanEnd, 0)
      })
    }
  }

  componentWillUnmount() {
    this.panzoomer.dispose()
  }

  render() {
    let { width, height } = this.props
    let { isZoomed, zoomScale } = this.state

    return (
      <Container width={width} height={height}>
        <Wrapper ref="wrapper">
          <FlexWrapper>{this.props.children}</FlexWrapper>
        </Wrapper>

        <Controls
          resetZoom={this.resetZoom}
          isZoomed={isZoomed}
          zoomScale={zoomScale}
        />
      </Container>
    )
  }

  onZoom(api) {
    let transform = api.getTransform()
    let zoomScale = transform.scale

    this.setState({
      isZoomed: Math.round(zoomScale * 100) !== 100,
      zoomScale
    })
  }

  resetZoom(e) {
    if (this.panzoomer) {
      this.panzoomer.moveTo(0, 0)
      this.panzoomer.zoomAbs(0, 0, 1)
    }

    e.preventDefault()
  }
}
