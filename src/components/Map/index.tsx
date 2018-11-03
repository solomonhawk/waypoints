import * as React from 'react'
import { Wrapper } from './styled-components'

export interface IMapProps {
  background: string
  panning: boolean
}

export default class Map extends React.Component<IMapProps, {}> {
  static defaultProps: Partial<IMapProps> = {
    panning: false
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <Wrapper onClick={this.handleClick} background={this.props.background}>
        {this.props.children}
      </Wrapper>
    )
  }

  handleClick(e) {
    if (e.isDefaultPrevented() || this.props.panning) {
      return
    }

    // TODO(shawk): add marker

    e.preventDefault()
  }
}
