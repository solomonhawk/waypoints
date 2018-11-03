import * as React from 'react'
import '../assets/scss/App.scss'
import Surface from 'components/Surface'

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <Surface>
          <h1>
            Waypoints{' '}
            <sup>
              <small>BETA</small>
            </sup>
          </h1>
        </Surface>
      </div>
    )
  }
}
