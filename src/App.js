import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators as gameActionCreators } from './features/game'
import KeyState from './features/utils/KeyState'
import Screen from './features/game-screen'

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.intervalId = null;
  }

  componentDidMount() {
    this.requestNextFrame()
    KeyState.init(document)
  }

  componentWillUnmount() {
    clearTimeout(this.intervalId)
  }

  requestNextFrame = () => {
    window.requestAnimationFrame(this.props.updateGame)
    this.intervalId = setTimeout(this.requestNextFrame, 1000 / 20)
  }

  render() {
    return (
      <Screen key="screen" />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateGame: () => dispatch(gameActionCreators.update()),
})

export default connect(
  null,
  mapDispatchToProps
)(App);
