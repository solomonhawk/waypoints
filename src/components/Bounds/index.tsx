import * as React from 'react'
import { Wrapper } from './styled-components'
import { throttle } from 'lodash'
import { IMapBounds } from 'components/App'

export interface IBoundsProps {
  children: ({ bounds, isPortrait }) => React.ReactNode
}

export interface IBoundsState {
  bounds: IMapBounds
  isPortrait: boolean
}

function isTallerThanWide({ width, height }): boolean {
  return width < height
}

export default class Bounds extends React.Component<
  IBoundsProps,
  IBoundsState
> {
  private rootRef = React.createRef<HTMLDivElement>()

  readonly state: IBoundsState = {
    bounds: {
      width: -1,
      height: -1,
      top: 0,
      left: 0
    },
    isPortrait: false
  }

  constructor(props) {
    super(props)

    this.measure = throttle(this.measure.bind(this), 50)
  }

  componentDidMount() {
    this.measure()

    window.addEventListener('resize', this.measure)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.measure)
  }

  measure() {
    if (this.rootRef) {
      let {
        top,
        left,
        width,
        height
      } = this.rootRef.current.getBoundingClientRect()

      this.setState({ bounds: { top, left, width, height } })
    }
  }

  render() {
    let { bounds } = this.state

    return (
      <Wrapper ref={this.rootRef}>
        {this.props.children({
          bounds,
          isPortrait: isTallerThanWide({
            width: bounds.width,
            height: bounds.height
          })
        })}
      </Wrapper>
    )
  }
}
