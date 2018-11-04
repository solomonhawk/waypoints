import * as React from 'react'
import Marker from './Marker'
import { IMarker } from 'components/App'

export interface IMarkersProps {
  markers: IMarker[]
  scale: number
  onClickMarker: (e: MouseEvent, id: string) => void
  selectedMarkerId: string | null
}

export default class Markers extends React.Component<IMarkersProps, {}> {
  static defaultProps: Partial<IMarkersProps> = {
    markers: [],
    scale: 1,
    onClickMarker: (e: MouseEvent, id: string) => {},
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
        scale={this.props.scale}
        onClick={e => this.props.onClickMarker(e, marker.id)}
        selected={marker.id === this.props.selectedMarkerId}
      />
    )
  }
}
