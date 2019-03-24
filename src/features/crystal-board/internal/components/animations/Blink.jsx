import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Keyframes, animated } from 'react-spring/renderprops'

const Content = Keyframes.Spring(async (next, cancel, ownProps) => {
  const { repeats, startDelay } = ownProps
  for (let i = 0; i < repeats; i++) {
    await next({
      from: { opacity: 1 },
      to: { opacity: 0 },
      config: { tension: 1200, friction: 120, duration: 100, delay: i === 0 ? startDelay : ownProps.delay },
    })
    await next({
      to: { opacity: 1 },
      config: { tension: 1200, friction: 120, duration: 100 },
    }, i === repeats - 1)
  }
})

const Blink = ({ repeatCount, delay, onAnimationFinished, children }) => {
  return <Content
    native
    reset
    repeats={repeatCount}
    startDelay={delay}
    onRest={onAnimationFinished}>
    {
      ({ opacity }) => <animated.div
        style={{ opacity }}>
        {
          children
        }
      </animated.div>
    }
  </Content>
}

Blink.propTypes = {
  delay: PropTypes.number,
  repeatCount: PropTypes.number,
  onAnimationFinished: PropTypes.func,
}

Blink.defaultProps = {
  delay: 0,
  repeatCount: 1,
  onAnimationFinished: undefined,
}

export default memo(Blink)