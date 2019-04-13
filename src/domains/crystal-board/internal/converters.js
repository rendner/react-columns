import {converters as crystalConverters} from '../../crystal';

import {isValidCrystal} from './utils';

const EMPTY_ARRAY = Object.freeze([]);

const convertVisibleCrystals = (matrix, excludedCrystalIds) => {
  const result = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((crystal, columnIndex) => {
      if (isValidCrystal(crystal)) {
        const exclude = excludedCrystalIds.includes(crystal.id);
        if (!exclude) {
          const entry = crystalConverters.convertCrystal(
              crystal,
              rowIndex,
              columnIndex,
          );
          result.push(entry);
        }
      }
    });
  });
  return result.length ? result : EMPTY_ARRAY;
};

const convertMarkedCrystals = (matrix, markedCrystalIds, linkOriginId) => {
  const result = {
    crystals: [],
    linkOrigin: undefined,
  };
  matrix.forEach((row, rowIndex) => {
    row.forEach((crystal, columnIndex) => {
      if (isValidCrystal(crystal)) {
        const isMarked = markedCrystalIds.includes(crystal.id);
        if (isMarked) {
          const entry = crystalConverters.convertCrystal(
              crystal,
              rowIndex,
              columnIndex,
          );
          result.crystals.push(entry);
          if (crystal.id === linkOriginId) {
            result.linkOrigin = entry;
          }
        }
      }
    });
  });

  if (result.crystals.length === 0) {
    result.crystals = EMPTY_ARRAY;
  }

  return result;
};

export {
  convertMarkedCrystals,
  convertVisibleCrystals,
};
