import * as React from 'react'
import { Container, Wrapper, FlexWrapper } from './styled-components'
import Controls from './Controls'
import { debounce } from 'lodash'

// import * as createPanZoom from 'panzoom' - having trouble making this work with TS
let panzoom = require('panzoom')

export interface ITransform {
  x: number
  y: number
  scale: number
}

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
  afterInteraction?: (t: ITransform) => void
}

export interface ISurfaceState {
  isZoomed: boolean
  zoomScale: number
}

export default class Surface extends React.Component<
  ISurfaceProps,
  ISurfaceState
> {
  private panzoomer: any
  private rootRef = React.createRef<HTMLDivElement>()

  static defaultProps: Partial<ISurfaceProps> = {
    width: '100%',
    height: '100%',
    zoomSpeed: 0.05,
    minZoom: 0.75,
    maxZoom: 10,
    onPanStart: () => {},
    afterPanStart: () => {},
    onPanEnd: () => {},
    afterPanEnd: () => {}
  }

  readonly state: ISurfaceState = {
    isZoomed: false,
    zoomScale: 1
  }

  constructor(props) {
    super(props)

    this.resetZoom = this.resetZoom.bind(this)
    this.onZoom = debounce(this.onZoom.bind(this), 50)
    this.onTransform = debounce(this.onTransform.bind(this), 50)
    this.handleKeyPress = this.handleKeyPress.bind(this)
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

    if (this.rootRef) {
      this.panzoomer = panzoom(this.rootRef.current, {
        zoomSpeed,
        maxZoom,
        minZoom
      })

      this.afterInteraction()

      this.panzoomer.on('panstart', () => {
        onPanStart()
        setTimeout(afterPanStart, 0)
      })

      this.panzoomer.on('panend', () => {
        onPanEnd()
        setTimeout(afterPanEnd, 0)
      })

      this.panzoomer.on('zoom', this.onZoom)
      this.panzoomer.on('transform', this.onTransform)

      document.addEventListener('keypress', this.handleKeyPress)
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
        <Wrapper ref={this.rootRef}>
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

  onTransform() {
    this.afterInteraction()
  }

  afterInteraction(transform?: ITransform) {
    this.props.afterInteraction(transform || this.panzoomer.getTransform())
  }

  handleKeyPress(e) {
    if (e.key === 'f') {
      this.resetZoom(e)
    }
  }

  onZoom(api) {
    let transform = api.getTransform()
    let zoomScale = transform.scale
    let atDefaultScale = Math.round(zoomScale * 100) === 100

    this.setState({
      isZoomed: !atDefaultScale,
      zoomScale: atDefaultScale ? 1 : zoomScale
    })
  }

  resetZoom(e) {
    if (this.panzoomer) {
      // pausing here seems to help the case where a pan/fling is settling
      // when a user presses the hotkey to reset zoom
      this.panzoomer.pause()
      this.panzoomer.moveTo(0, 0)
      this.panzoomer.zoomAbs(0, 0, 1)
      this.panzoomer.resume()
    }

    e.preventDefault()
  }
}
