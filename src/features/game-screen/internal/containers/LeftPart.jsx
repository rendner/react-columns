import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {selectors} from '../../../../domains/game-status';

import ClearedCrystalsCounter from '../components/ClearedCrystalsCounter';

class LeftPart extends PureComponent {
  render() {
    const {clearedCrystalsCount} = this.props;
    return <div key="div"
      style={{
        position: 'absolute',
        left: '5px',
        top: '120px',
      }}>
      <ClearedCrystalsCounter
        key="counter"
        value={clearedCrystalsCount}
      />
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    clearedCrystalsCount: selectors.selectClearedCrystalsCount(state),
  };
};

export default connect(mapStateToProps, null)(LeftPart);
