import React, {memo} from 'react';
import PropTypes from 'prop-types';

const SpriteSheet = ({spriteSource, x, y, spriteWidth, spriteHeight, spriteColumnIndex, spriteRowIndex}) => {
  const styles = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${spriteWidth}px`,
    height: `${spriteHeight}px`,
    objectFit: 'none',
    objectPosition: `-${spriteColumnIndex * spriteWidth}px -${spriteRowIndex * spriteHeight}px`,
  };
  return (
    <img key="image" style={styles} src={spriteSource} alt="" />
  );
};

SpriteSheet.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  spriteRowIndex: PropTypes.number,
  spriteColumnIndex: PropTypes.number,
  spriteWidth: PropTypes.number.isRequired,
  spriteHeight: PropTypes.number.isRequired,
  spriteSource: PropTypes.string.isRequired,
};

SpriteSheet.defaultProps = {
  x: 0,
  y: 0,
  spriteRowIndex: 0,
  spriteColumnIndex: 0,
};

export default memo(SpriteSheet);
