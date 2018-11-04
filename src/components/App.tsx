import * as React from 'react'
import '../assets/scss/App.scss'
import Surface, { ITransform } from 'components/Surface'
import Map from 'components/Map'
import Markers from 'components/Markers'
import { IconContext } from 'react-icons'
import Bounds from 'components/Bounds'
import { markersRef } from 'services/data-providers/firebase'
import ls from 'services/data-providers/local-storage'
import { plum, randomColor } from 'config/theme'

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

export interface IAppState {
  markers: IMarker[]
  selectedMarkerId: string | null
  panning: boolean
  userName: string | null
  surfaceTransform: ITransform
}

export default class App extends React.Component<{}, IAppState> {
  readonly state: IAppState = {
    markers: [],
    selectedMarkerId: null,
    panning: false,
    surfaceTransform: {
      x: 0,
      y: 0,
      scale: 1
    },
    userName: null
  }

  constructor(props) {
    super(props)

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.onPanStart = this.onPanStart.bind(this)
    this.afterPanEnd = this.afterPanEnd.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.updateTransform = this.updateTransform.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  componentDidMount() {
    this.fetchUserName()
    this.fetchMarkers()

    document.addEventListener('keydown', this.handleKeyDown)
  }

  fetchUserName() {
    let userName = ls.get('waypoints-user-name')

    if (!userName) {
      this.requireUserName(true)
    } else {
      this.setState({ userName })
    }
  }

  requireUserName(retry) {
    if (!this.state.userName) {
      this.captureUserName(retry)
    }
  }

  captureUserName(retry) {
    let response = prompt('You must pick a user name.') || ''
    let userName = response.trim()

    if (!userName) {
      if (retry) {
        this.requireUserName(false)
      }
    } else if (userName.length > 32) {
      alert('Shorter... 32 chars max.')
      if (retry) {
        this.requireUserName(false)
      }
    } else {
      this.setState({ userName }, () => {
        ls.set('waypoints-user-name', userName)
      })
    }
  }

  fetchMarkers() {
    markersRef.onSnapshot(
      querySnapshot => {
        let markers = []

        querySnapshot.forEach(function(doc) {
          markers.push({ ...doc.data(), id: doc.id })
        })

        if (markers.length) {
          this.setState({
            markers
          })
        }
      },
      function(error) {
        console.error(error)
      }
    )
  }

  render() {
    let { panning, markers, surfaceTransform, selectedMarkerId } = this.state
    let markerScale = interpolateMarkerScale(surfaceTransform.scale)

    return (
      <IconContext.Provider value={{ color: plum }}>
        <div className="app" onClick={this.handleOutsideClick}>
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
        </div>
      </IconContext.Provider>
    )
  }

  updateTransform(transform) {
    this.setState({ surfaceTransform: transform })
  }

  handleKeyDown(e) {
    if (
      this.state.selectedMarkerId &&
      (e.key === 'Backspace' || e.key === 'Delete')
    ) {
      markersRef
        .doc(this.state.selectedMarkerId)
        .delete()
        .then(() => {
          this.setState({
            selectedMarkerId: null
          })
        })
        .catch(error => {
          console.error(error)
        })

      e.preventDefault()
    }
  }

  handleOutsideClick(e) {
    if (
      !e.isDefaultPrevented() &&
      !this.state.panning &&
      this.state.selectedMarkerId
    ) {
      this.setState({ selectedMarkerId: null })
    }
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

    markersRef
      .add({
        position: {
          x,
          y
        },
        label,
        creator: this.state.userName,
        color: randomColor()
      })
      .then(doc => {
        this.setState({
          selectedMarkerId: doc.id
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  onPanStart() {
    this.setState({ panning: true })
  }

  afterPanEnd() {
    this.setState({ panning: false })
  }
}
