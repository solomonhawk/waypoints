import * as React from 'react'
import { Wrapper } from './styled-components'
import { IMap } from 'components/App'
import { IPosition, IMapBounds } from 'components/App'

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

let interpolateOpacity = (scale: number): number => {
  return lerp(0, 1, scale - 0.25)
}

export interface IMapProps {
  map: IMap
  panning: boolean
  onAddMarker: (position: IPosition, mapBounds: IMapBounds) => void
  bounds: IMapBounds
  isPortrait: boolean
  zoomScale: number
}

export interface IMapState {
  bounds: IMapBounds
}

export default class Map extends React.Component<IMapProps, IMapState> {
  static defaultProps: Partial<IMapProps> = {
    panning: false
  }

  readonly state: IMapState = {
    bounds: {
      height: -1,
      width: -1,
      left: 0,
      top: 0
    }
  }

  static getDerivedStateFromProps(props) {
    let { map, bounds, isPortrait } = props

    let aspectRatio = map.width / map.height
    let mapHeight = bounds.height
    let mapWidth = bounds.height * aspectRatio

    if (isPortrait) {
      mapWidth = bounds.width
      mapHeight = bounds.width * aspectRatio
    }

    return {
      bounds: {
        ...bounds,
        height: mapHeight,
        width: mapWidth
      }
    }
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    let { map, zoomScale, children } = this.props
    let { bounds } = this.state

    let opacity = interpolateOpacity(zoomScale)

    return (
      <Wrapper
        onClick={this.handleClick}
        background={map.image}
        width={bounds.width}
        height={bounds.height}
        opacity={opacity}
      >
        {children}
      </Wrapper>
    )
  }

  handleClick(e) {
    let { panning, onAddMarker } = this.props

    if (e.isDefaultPrevented() || !e.metaKey || panning) {
      return
    }

    onAddMarker(
      {
        x: e.pageX,
        y: e.pageY
      },
      e.currentTarget.getBoundingClientRect()
    )

    e.preventDefault()
  }
}
