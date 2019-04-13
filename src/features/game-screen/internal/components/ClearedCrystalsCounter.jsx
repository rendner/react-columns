import React, {memo} from 'react';
import PropTypes from 'prop-types';

const ClearedCrystalsCounter = ({value}) => {
  return <svg width="100%" height="100%">
    <defs>
      <linearGradient id="textgrad2" x2="0" y2="1">
        <stop offset="0%" stopColor="white" />
        <stop offset="75%" stopColor="cornflowerblue" />
        <stop offset="100%" stopColor="lightskyblue" />
      </linearGradient>
    </defs>
    <text fill="url(#textgrad2)"
      stroke="black"
      strokeWidth="1px"
      strokeLinejoin="round"
      dominantBaseline="hanging">
      <tspan
        fontSize='29'
        fontWeight='bold'>Crystals</tspan>
      <tspan
        y='1em'
        fontSize='32'
        fontWeight='normal'
        textAnchor="end">{value}</tspan>
    </text>
  </svg>;
};

ClearedCrystalsCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default memo(ClearedCrystalsCounter);
