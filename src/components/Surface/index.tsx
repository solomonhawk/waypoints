import * as React from 'react'
import { Container, Wrapper, FlexWrapper } from './styled-components'
import Controls from './Controls'
import { debounce } from 'lodash'
import Instructions from './Instructions'

// import * as createPanZoom from 'panzoom' - having trouble making this work with TS
let panzoom = require('panzoom')

function equals(target, value) {
  return Math.round(value * 100) === Math.round(target * 100)
}

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
  hasTransform: boolean
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
    hasTransform: false,
    zoomScale: 1
  }

  constructor(props) {
    super(props)

    this.resetZoom = this.resetZoom.bind(this)
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
        smoothScroll: false,
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

      this.panzoomer.on('transform', this.onTransform)

      document.addEventListener('keypress', this.handleKeyPress)
    }
  }

  componentWillUnmount() {
    this.panzoomer.dispose()
  }

  render() {
    let { width, height } = this.props
    let { hasTransform, isZoomed, zoomScale } = this.state

    return (
      <Container width={width} height={height}>
        <Wrapper ref={this.rootRef}>
          <FlexWrapper>{this.props.children}</FlexWrapper>
        </Wrapper>

        <Instructions showUnderlay={isZoomed} />

        <Controls
          resetZoom={this.resetZoom}
          showUnderlay={isZoomed}
          hasTransform={hasTransform}
          zoomScale={zoomScale}
        />
      </Container>
    )
  }

  onTransform() {
    let transform = this.panzoomer.getTransform()
    let zoomScale = transform.scale
    let isZoomed = !equals(1, transform.scale)

    let hasTransform =
      !equals(0, transform.x) || !equals(0, transform.y) || isZoomed

    this.setState({
      hasTransform,
      isZoomed,
      zoomScale: isZoomed ? zoomScale : 1
    })

    this.afterInteraction(transform)
  }

  afterInteraction(transform?: ITransform) {
    this.props.afterInteraction(transform || this.panzoomer.getTransform())
  }

  handleKeyPress(e) {
    if (e.key === 'f') {
      this.resetZoom(e)
    }
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
