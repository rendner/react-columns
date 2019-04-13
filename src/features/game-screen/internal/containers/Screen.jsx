import React, {memo} from 'react';

import LeftPart from './LeftPart';
import MiddlePart from './MiddlePart';
import RightPart from './RightPart';
import ColorBackgound from '../components/animations/ColorBackgound';

const Screen = () => {
  const leftPartWidth = 125;
  const middlePartWidth = 217;
  const rightPartWidth = 125;
  return <div key="mainDiv" style={{
    position: 'absolute',
    height: '352px',
    width: `${leftPartWidth + middlePartWidth + rightPartWidth}px`,
    border: '6px solid white',
    boxShadow: '0 0 10px rgba(0,0,0,.4)',
  }}>
    <ColorBackgound key="background" />
    <div
      key="leftDiv"
      style={{
        position: 'absolute',
        width: `${leftPartWidth}px`,
        height: '100%',
      }}>
      <LeftPart key="leftPart" />
    </div>
    <div key="middleDiv"
      style={{
        position: 'absolute',
        top: '5px',
        left: `${leftPartWidth}px`,
        width: `${middlePartWidth}px`,
        height: '100%',
      }}>
      <MiddlePart key="middlePart" />
    </div>
    <div key="rightDiv"
      style={{
        position: 'absolute',
        left: `${leftPartWidth + middlePartWidth}px`,
        width: `${rightPartWidth}px`,
        height: '100%',
      }}>
      <RightPart key="rightPart" />
    </div>
  </div>;
};

export default memo(Screen);
