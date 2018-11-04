import * as React from 'react'
import '../assets/scss/App.scss'
import Surface, { ITransform } from 'components/Surface'
import Map from 'components/Map'
import Markers from 'components/Markers'
import { IconContext } from 'react-icons'
import Bounds from 'components/Bounds'

let scumMap = require('../assets/img/scum-map.jpg')

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

let interpolateMarkerScale = (scale: number): number => {
  return lerp(0.2, 1, Math.min(1, 1 / (scale / 1.5)))
}

export interface IPosition {
  x: number
  y: number
}

export interface IMarker {
  id: string
  label: string
  position: IPosition
  creator: string
  color: string
}

export interface IMap {
  image: string
  width: number
  height: number
}

export interface IMapBounds {
  width: number
  height: number
  top: number
  left: number
}

let map: IMap = {
  image: scumMap,
  width: 2568,
  height: 2567
}

let markers: IMarker[] = [
  {
    id: '1',
    label: 'Home Bunker',
    position: {
      x: 0.795,
      y: 0.895
    },
    creator: 'Sol',
    color: '#DE3D5D'
  },
  {
    id: '2',
    label: 'Factory',
    position: {
      x: 0.845,
      y: 0.51
    },
    creator: 'Burris',
    color: '#EBB942'
  },
  {
    id: '3',
    label: 'TopRight',
    position: {
      x: 0.75,
      y: 0.25
    },
    creator: 'Sol',
    color: '#EBB942'
  }
]

export interface IAppState {
  markers: IMarker[]
  selectedMarkerId: string | null
  panning: boolean
  userName: string | null
  surfaceTransform: ITransform
}

export default class App extends React.Component<{}, IAppState> {
  readonly state: IAppState = {
    markers,
    selectedMarkerId: null,
    panning: false,
    surfaceTransform: {
      x: 0,
      y: 0,
      scale: 1
    },
    userName: 'Sol' // TODO(shawk): prompt('User Name?')
  }

  constructor(props) {
    super(props)

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.onPanStart = this.onPanStart.bind(this)
    this.afterPanEnd = this.afterPanEnd.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.updateTransform = this.updateTransform.bind(this)
  }

  componentDidMount() {
    this.requireUserName(true)
  }

  requireUserName(retry) {
    if (!this.state.userName) {
      this.captureUserName(retry)
    }
  }

  captureUserName(retry) {
    let userName = prompt('You must pick a user name.') || ''

    if (userName.trim()) {
      this.setState({ userName: userName.trim() })
    } else {
      if (retry) {
        this.requireUserName(false)
      }
    }
  }

  render() {
    let { panning, markers, surfaceTransform, selectedMarkerId } = this.state
    let markerScale = interpolateMarkerScale(surfaceTransform.scale)

    return (
      <div className="app">
        <IconContext.Provider value={{ color: 'blue' }}>
          <Surface
            onPanStart={this.onPanStart}
            afterPanEnd={this.afterPanEnd}
            afterInteraction={this.updateTransform}
          >
            <Bounds>
              {({ bounds, isPortrait }) => (
                <Map
                  map={map}
                  panning={panning}
                  bounds={bounds}
                  isPortrait={isPortrait}
                  onAddMarker={this.addMarker}
                  zoomScale={surfaceTransform.scale}
                >
                  <Markers
                    markers={markers}
                    scale={markerScale}
                    selectedMarkerId={selectedMarkerId}
                    onClickMarker={this.handleMarkerClick}
                  />
                </Map>
              )}
            </Bounds>
          </Surface>
        </IconContext.Provider>
      </div>
    )
  }

  updateTransform(transform) {
    this.setState({ surfaceTransform: transform })
  }

  handleMarkerClick(e, id) {
    if (e.metaKey) {
      return
    }

    this.setState(({ selectedMarkerId }) => ({
      selectedMarkerId: id === selectedMarkerId ? null : id
    }))

    e.preventDefault()
  }

  addMarker(position: IPosition, mapBounds: IMapBounds) {
    this.requireUserName(true)

    let label = prompt('Marker Label?') || ''

    if (!label.trim()) {
      alert('You must enter a Label.')
      return
    }

    let x = (position.x - mapBounds.left) / mapBounds.width
    let y = (position.y - mapBounds.top) / mapBounds.height

    this.setState({
      markers: this.state.markers.concat([
        {
          id: String(Math.random()),
          position: {
            x,
            y
          },
          label,
          creator: this.state.userName,
          color: '#fff'
        }
      ])
    })
  }

  onPanStart() {
    this.setState({ panning: true })
  }

  afterPanEnd() {
    this.setState({ panning: false })
  }
}
