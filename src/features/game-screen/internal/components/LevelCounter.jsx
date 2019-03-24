import React, { memo } from 'react'
import PropTypes from 'prop-types'

const formatValue = (value) => {
  const str = "000" + value
  return str.substring(str.length - 3)
}

const LevelCounter = ({ value }) => {

  return <svg width="100%" height="100%" >
    <defs>
      <linearGradient id="textgrad" x2="0" y2="100%">
        <stop offset="0%" stopColor="white" />
        <stop offset="50%" stopColor="magenta" />
        <stop offset="100%" stopColor="pink" />
      </linearGradient>
    </defs>
    <text fill="url(#textgrad)"
      stroke="black"
      strokeWidth="1px"
      strokeLinejoin="round"
      dominantBaseline="hanging">
      <tspan
        fontSize='29'
        fontWeight='bold'>Level</tspan>
      <tspan
        y='1em'
        fontSize='32'
        fontWeight='normal'
        textAnchor="end">{formatValue(value)}</tspan>
    </text>
  </svg>
}

LevelCounter.propTypes = {
  value: PropTypes.number.isRequired,
}

export default memo(LevelCounter)
