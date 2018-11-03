import * as React from 'react'
import '../assets/scss/App.scss'

export interface AppProps {}

export default class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="app">
        <h1>Waypoints <sup><small>BETA</small></sup></h1>
      </div>
    )
  }
}
