import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Keyframes, animated, config } from 'react-spring/renderprops'

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
} from '../../constants'

const Content = Keyframes.Spring(async (next, cancel, ownProps) => {
  await next({
    delay: ownProps.startDelay,
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: config.wobbly,
  })
  const countdownStartValue = 3
  await next({
    from: { countdown: countdownStartValue },
    to: { countdown: 0 },
    config: { clamp: true, duration: countdownStartValue * 1000 },
  }, true)
})

const renderGameOver = (scale, opacity) => {
  return <animated.div
    key={"gameOver"}
    style={{
      opacity: opacity,
      transform: scale.interpolate(s => `scale(${s})`),
    }}><svg height="100%" width="100%">
      <text
        y="40"
        fontSize='4em'
        fontWeight='600'
        fill="black"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2px"
        strokeLinejoin="round"
        textAnchor="middle"
        dominantBaseline="middle">
        <tspan x="50%">Game</tspan>
        <tspan x="50%" dy="1em">Over</tspan>
      </text>
    </svg>
  </animated.div>
}

const renderCountdown = (countdown) => {
  if (countdown) {
    return <svg height="100%" width="100%" key={"countdown"}>
      <animated.text
        y="40"
        x="50%"
        fontSize='4em'
        fontWeight='600'
        fill="black"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2px"
        strokeLinejoin="round"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {countdown.interpolate(c => Math.round(c))}
      </animated.text>
    </svg>
  }
  return null
}

const GameOverCountdown = ({ delay, onAnimationFinished }) => {

  // the "width" and the "height" for the "div" are required, otherwise the text
  // content can't be aligned correctly
  return <div
    style={{
      position: 'absolute',
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
    }}><Content
      native
      revert
      startDelay={delay}
      onRest={onAnimationFinished}>
      {
        props => [
          renderGameOver(props.scale, props.opacity),
          renderCountdown(props.countdown),
        ]
      }
    </Content>
  </div>
}

GameOverCountdown.propTypes = {
  onAnimationFinished: PropTypes.func,
}

GameOverCountdown.defaultProps = {
  onAnimationFinished: undefined,
}

export default memo(GameOverCountdown)