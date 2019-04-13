import React from 'react';
import PropTypes from 'prop-types';

class SpriteLooper extends React.PureComponent {
  static propTypes = {
    frameCount: PropTypes.number.isRequired,
    frameDelay: PropTypes.number.isRequired,
    playing: PropTypes.bool,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    playing: true,
  }

  state = {
    currentFrame: 0,
  }

  componentDidMount() {
    this.intervallId = setInterval(this.nextFrame, this.props.frameDelay);
  }

  componentWillUnmount() {
    clearInterval(this.intervallId);
  }

  nextFrame = () => {
    /* eslint-disable no-invalid-this */
    if (this.props.playing) {
      const {frameCount} = this.props;
      const {currentFrame} = this.state;
      const nextFrame = currentFrame + 1;
      this.setState({currentFrame: nextFrame >= frameCount ? 0 : nextFrame});
    }
    /* eslint-enable no-invalid-this */
  }

  render() {
    const {children} = this.props;
    const {currentFrame} = this.state;
    return children(currentFrame);
  }
}

export default SpriteLooper;
