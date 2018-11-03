import * as React from 'react'
import 'assets/scss/App.scss'
import Surface from 'components/Surface'
import Map from 'components/Map'
import Markers from 'components/Markers'
import { IconContext } from 'react-icons'

let scumMap = require('assets/img/scum-map.jpg')

let markers: IMarker[] = [
  {
    id: '1',
    label: 'Home Bunker',
    position: {
      x: 0.3,
      y: 0.7
    },
    creator: 'Sol',
    color: '#DE3D5D'
  },
  {
    id: '2',
    label: 'ShitFactory',
    position: {
      x: 0.7,
      y: 0.4
    },
    creator: 'Burris',
    color: '#EBB942'
  }
]

export interface IAppState {
  markers: IMarker[]
  selectedMarkerId: string | null
  panning: boolean
  userName: string | null
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

export default class App extends React.Component<{}, IAppState> {
  state = {
    markers,
    selectedMarkerId: null,
    panning: false,
    userName: 'Sol' // TODO(shawk): prompt('User Name?')
  }

  constructor(props) {
    super(props)

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.onPanStart = this.onPanStart.bind(this)
    this.afterPanEnd = this.afterPanEnd.bind(this)
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
    let userName = prompt('You must pick a user name.').trim()

    if (userName) {
      this.setState({ userName })
    } else {
      if (retry) {
        this.requireUserName(false)
      }
    }
  }

  render() {
    let { panning, markers, selectedMarkerId } = this.state

    return (
      <div className="app">
        {/*
          TODO(shawk): This is a problem that needs to be solved in order to
          show the map marker positions consistently: How do we render the
          given map into the available dimensions for the Map component given
          different screen sizes and the possibility of other UI elements being
          present. I have some thoughts.. this also relates to how we want to
          store data in firebase for the marker offsets. I was hoping we could
          maybe store them as floats between 0 and 1 for x and y offset and
          just scale to whatever map they're on.

          So that's why there are fake sidebars right now.
        */}
        <div className="fake-sidebar1" />
        <IconContext.Provider value={{ color: 'blue' }}>
          <Surface onPanStart={this.onPanStart} afterPanEnd={this.afterPanEnd}>
            <Map background={scumMap} panning={panning}>
              <Markers
                markers={markers}
                selectedMarkerId={selectedMarkerId}
                handleMarkerClick={this.handleMarkerClick}
              />
            </Map>
          </Surface>
        </IconContext.Provider>
        <div className="fake-sidebar2" />
      </div>
    )
  }

  handleMarkerClick(id) {
    this.setState({
      selectedMarkerId: id === this.state.selectedMarkerId ? null : id
    })
  }

  onPanStart() {
    this.setState({ panning: true })
  }

  afterPanEnd() {
    this.setState({ panning: false })
  }
}
