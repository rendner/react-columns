import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { constants as crystalConstants } from '../../../crystal'

const generateGridPath = (rows) => {
  let path = ""

  const halfStrokeWidth = 1 / 2

  let y = 0
  for (let r = 0; r <= rows; r++) {
    path += `M${0},${halfStrokeWidth + y}`
    path += `L${crystalConstants.CELL_SIZE},${halfStrokeWidth + y}`
    y += crystalConstants.CELL_SIZE
  }

  path += "Z"

  return path
}

const Background = ({ rows }) => {
  const gridPath = generateGridPath(rows)
  return (
    <div key="div" style={{ position: 'absolute' }}>
      <svg key="svg" width={crystalConstants.CELL_SIZE} height={rows * crystalConstants.CELL_SIZE}>
        <rect x="0" y="0" width="100%" height="100%" fill="lightGray" />
        <g stroke="white" fill="none" strokeWidth="1">
          <path d={gridPath} />
        </g>
        <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="darkGray" strokeWidth="2" />
      </svg>
    </div>
  )
}

Background.propTypes = {
  rows: PropTypes.number,
}

Background.defaultProps = {
  rows: 1,
}

export default memo(Background)