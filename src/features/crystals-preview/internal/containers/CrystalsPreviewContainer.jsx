import React from 'react';
import {connect} from 'react-redux';

import {
  selectors as statusSelectors,
  constants as statusConstants,
} from '../../../../domains/game-status';
import {
  selectors as previewSelectors,
} from '../../../../domains/crystals-preview';
import {AnimatedCrystalMatrix} from '../../../crystal';

import Background from '../components/Background';

class CrystalsPreviewContainer extends React.PureComponent {
  render() {
    const {animate, crystals} = this.props;
    return <div key="div">
      <Background
        key="background"
        rows={3}
      />
      <AnimatedCrystalMatrix
        key="matrix"
        animate={animate}
        matrixCrystals={crystals}
      />
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    crystals: previewSelectors.selectCrystals(state),
    animate: statusSelectors.selectGameStatus(state) === statusConstants.GameStatus.RUNNING,
  };
};

export default connect(
    mapStateToProps,
    null,
)(CrystalsPreviewContainer);
