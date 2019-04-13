import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import CrystalsPreviewContainer from '../../../crystals-preview';
import {selectors} from '../../../../domains/game-status';

import LevelCounter from '../components/LevelCounter';

class RightPart extends PureComponent {
  render() {
    const {levelCount} = this.props;
    return <div style={{margin: '0 auto'}}>
      <div key="previewDiv"
        style={{
          position: 'absolute',
          left: '50px',
          top: '20px',
        }}>
        <CrystalsPreviewContainer
          key="preview"
        />
      </div>
      <div key="counterDiv"
        style={{
          position: 'absolute',
          left: '25px',
          top: '250px',
        }}>
        <LevelCounter
          key="counter"
          value={levelCount}
        />
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    levelCount: selectors.selectLevelCount(state),
  };
};

export default connect(mapStateToProps, null)(RightPart);
