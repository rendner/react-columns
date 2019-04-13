
export const Key = {
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
};

export default {
  _keys: {},
  _isDelayedDownEventThreshold: 1,

  init(document) {
    document.addEventListener('keydown', this._onKeyDown.bind(this), false);
    document.addEventListener('keyup', this._onKeyUp.bind(this), false);
  },
  isDown(key) {
    const keyInfo = this._keys[key];
    return (keyInfo && keyInfo.isDown) || false;
  },
  isInitialDown(key) {
    const keyInfo = this._keys[key];
    if (keyInfo) {
      const {isDown, initialKeyDownConsumed} = keyInfo;
      return (isDown && !initialKeyDownConsumed);
    }
    return false;
  },
  isDelayedDone(key) {
    const keyInfo = this._keys[key];
    if (keyInfo) {
      const {isDown, repeatedDownEventCount, initialKeyDownConsumed} = keyInfo;
      if (isDown) {
        return (repeatedDownEventCount >= this._isDelayedDownEventThreshold) ||
        (repeatedDownEventCount === 0 && !initialKeyDownConsumed);
      }
    }
    return false;
  },
  clearWasPressedState() {
    Object.values(this._keys).forEach((keyInfo) => {
      if (!keyInfo.isDown) {
        keyInfo.repeatedDownEventCount = 0;
      }
      keyInfo.initialKeyDownConsumed = true;
    });
  },
  _onKeyUp(e) {
    const key = e.key;
    const keyInfo = this._keys[key];
    if (keyInfo) {
      keyInfo.isDown = false;
    }
  },
  _onKeyDown(e) {
    const key = e.key;
    if (!this._keys[key]) {
      this._keys[key] = this._createKeyInfo();
    }
    const keyInfo = this._keys[key];
    if (keyInfo.isDown) {
      keyInfo.repeatedDownEventCount++;
    } else {
      keyInfo.isDown = true;
      keyInfo.initialKeyDownConsumed = false;
    }
  },
  _createKeyInfo() {
    return {
      isDown: false,
      repeatedDownEventCount: 0,
      initialKeyDownConsumed: false,
    };
  },
};
