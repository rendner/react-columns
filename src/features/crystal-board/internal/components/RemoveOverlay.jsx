import React from 'react';
import PropTypes from 'prop-types';

import {
  propTypes,
  AnimatedCrystalMatrix,
  CrystalMatrix,
} from '../../../crystal';

import Blink from './animations/Blink';
import LightBeams from './animations/LightBeams';

class RemoveOverlay extends React.PureComponent {
  state = {
    lightBeamFinished: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({lightBeamFinished: false});
  }

  markLightBeamAsFinished = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({lightBeamFinished: true});
  }

  renderCrystalsWithLightBeams(matrixCrystals, linkOrigin, onAnimationFinished) {
    const lightBeamsDuration = 2000;
    return <React.Fragment key="fragment">
      <AnimatedCrystalMatrix
        key="animatedMatrix"
        matrixCrystals={matrixCrystals} />
      <div key="div" style={{position: 'absolute'}}>
        <LightBeams
          key="lightBeams"
          onAnimationFinished={onAnimationFinished}
          matrixCrystal={linkOrigin}
          duration={lightBeamsDuration}
        />
      </div>
    </React.Fragment>;
  }

  renderBlinkingCrystals(matrixCrystals, onAnimationFinished) {
    return <Blink
      key="blink"
      delay={250}
      repeatCount={3}
      onAnimationFinished={onAnimationFinished}>
      {
        <CrystalMatrix
          key="matrix"
          matrixCrystals={matrixCrystals} />
      }
    </Blink>;
  }

  render() {
    const {matrixCrystals, linkOrigin, onAnimationFinished} = this.props;

    if (matrixCrystals && matrixCrystals.length) {
      if (linkOrigin) {
        if (this.state.lightBeamFinished) {
          return this.renderBlinkingCrystals(
              matrixCrystals,
              onAnimationFinished,
          );
        } else {
          return this.renderCrystalsWithLightBeams(
              matrixCrystals,
              linkOrigin,
              this.markLightBeamAsFinished,
          );
        }
      } else {
        return this.renderBlinkingCrystals(
            matrixCrystals,
            onAnimationFinished,
        );
      }
    }
    return null;
  }
}

RemoveOverlay.propTypes = {
  matrixCrystals: propTypes.MATRIX_CRYSTAL_LIST.isRequired,
  linkOrigin: propTypes.MATRIX_CRYSTAL,
  onAnimationFinished: PropTypes.func,
};

RemoveOverlay.defaultProps = {
  matrixCrystals: [],
  linkOrigin: undefined,
  lightBeamsIndex: undefined,
  onAnimationFinished: undefined,
};

export default RemoveOverlay;
