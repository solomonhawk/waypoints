import * as React from 'react'
import Marker from './Marker'
import { IMarker } from 'components/App'

export interface IMarkersProps {
  markers: IMarker[]
  handleMarkerClick: (id: string) => void
  selectedMarkerId: string | null
}

export default class Markers extends React.Component<IMarkersProps, {}> {
  static defaultProps: Partial<IMarkersProps> = {
    markers: [],
    handleMarkerClick: (id: string) => {},
    selectedMarkerId: null
  }

  render() {
    return (
      <React.Fragment>
        {this.props.markers.map(this.renderMarker, this)}
      </React.Fragment>
    )
  }

  renderMarker(marker) {
    return (
      <Marker
        key={marker.id}
        {...marker}
        onClick={this.props.handleMarkerClick}
        selected={marker.id === this.props.selectedMarkerId}
      />
    )
  }
}
