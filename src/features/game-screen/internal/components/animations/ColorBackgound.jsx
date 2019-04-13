import React, {memo} from 'react';
import {
  Keyframes,
  animated,
  config,
  interpolate,
} from 'react-spring/renderprops';

const getRandomValue = (minValue, maxValue) => {
  return minValue + Math.floor(Math.random() * (maxValue - minValue));
};
const Content = Keyframes.Spring(async (next, cancel, ownProps) => {
  const maxColor = 0xee;
  const minColor = 0x11;

  const animConfig = {
    from: {
      r: getRandomValue(minColor, maxColor),
      g: getRandomValue(minColor, maxColor),
      b: getRandomValue(minColor, maxColor),
    },
    config: {...config.slow, duration: 10000},
  };
  while (true) {
    await next({
      ...animConfig,
      to: {
        r: getRandomValue(minColor, maxColor),
        g: getRandomValue(minColor, maxColor),
        b: getRandomValue(minColor, maxColor),
      },
    });
  }
});

const ColorBackground = () => {
  return <Content
    key="content"
    native>
    {
      ({r, g, b}) => <animated.div
        key="div"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: interpolate([r, g, b], (r, g, b) => {
            return `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},0.2)`;
          }),
        }}>
      </animated.div>
    }
  </Content>;
};

export default memo(ColorBackground);
