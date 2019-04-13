import {
  COLUMNS_PER_ROW,
  MIN_CRYSTAL_CHAIN_LENGTH,
  NO_CRYSTAL_CONST,
} from '../constants';
import {isValidCrystal, cloneMatrix} from '../utils';

const EMPTY_ARRAY = Object.freeze([]);

const slideDownFloatingCrystals = (matrix) => {
  for (let columnIndex = 0; columnIndex < COLUMNS_PER_ROW; columnIndex++) {
    const newColumnCrystals = slideDownFloatingCrystalsAtColumnIndex(
        matrix,
        columnIndex,
    );
    matrix.forEach((row, rowIndex) =>
      row[columnIndex] = newColumnCrystals[rowIndex]);
  }
};

const slideDownFloatingCrystalsAtColumnIndex = (matrix, columnIndex) => {
  const result = [];
  matrix.forEach((row) => {
    const crystal = row[columnIndex];
    if (isValidCrystal(crystal)) {
      result.push(crystal);
    } else {
      result.unshift(NO_CRYSTAL_CONST);
    }
  });
  return result;
};

const findChains = (matrix, pathMaps) => {
  const markedCrystalIdsSet = new Set([]);
  pathMaps.forEach((pathMap) => markCrystalChains(
      matrix,
      markedCrystalIdsSet,
      pathMap,
  ));
  return markedCrystalIdsSet.size ?
    Array.from(markedCrystalIdsSet)
    :
    EMPTY_ARRAY;
};

const markCrystalChain = (crystalIds, markedCrystalIdsSet) => {
  if (crystalIds && crystalIds.length >= MIN_CRYSTAL_CHAIN_LENGTH) {
    crystalIds.forEach((crystalId) => {
      markedCrystalIdsSet.add(crystalId);
    });
  }
};

const markCrystalChains = (matrix, markedCrystalIdsSet, pathMap) => {
  pathMap.forEach((pathRow) => {
    let crystalType = null;
    let chainedCrystalIds = [];

    pathRow.forEach((index) => {
      const crystal = matrix[index.row][index.column];

      if (isValidCrystal(crystal)) {
        if (crystal.type === crystalType) {
          chainedCrystalIds.push(crystal.id);
        } else {
          markCrystalChain(
              chainedCrystalIds,
              markedCrystalIdsSet,
          );
          crystalType = crystal.type;
          chainedCrystalIds = [crystal.id];
        }
      } else {
        markCrystalChain(
            chainedCrystalIds,
            markedCrystalIdsSet,
        );
        crystalType = null;
        chainedCrystalIds = null;
      }
    });

    markCrystalChain(
        chainedCrystalIds,
        markedCrystalIdsSet,
    );
  });
};

const removeCrystals = (crystalIds, matrix) => {
  const cleanedMatrix = matrix.map((row) => {
    return row.map((crystal) => {
      const remove = isValidCrystal(crystal) && crystalIds.includes(crystal.id);
      return remove ? NO_CRYSTAL_CONST : crystal;
    });
  });
  slideDownFloatingCrystals(cleanedMatrix);
  return cleanedMatrix;
};

const countLinks = (matrix, pathMaps, depthLevel = 0) => {
  let currentMatrix = cloneMatrix(matrix);
  let allChainsRemoved = false;
  let counter = 0;

  const maxCount = depthLevel > 0 ? depthLevel : 100;

  do {
    const markedCrystalIds = findChains(
        currentMatrix,
        pathMaps,
    );
    if (markedCrystalIds.length) {
      currentMatrix = removeCrystals(
          markedCrystalIds,
          currentMatrix,
      );
      counter++;
    } else {
      allChainsRemoved = true;
    }
  }
  while (!allChainsRemoved && counter < maxCount);

  return counter;
};

const removeChains = (matrix, markedCrystalIds) => {
  if (markedCrystalIds.length) {
    return removeCrystals(
        markedCrystalIds,
        cloneMatrix(matrix),
    );
  } else {
    return matrix;
  }
};

export const matrixChecker = {
  countLinks,
  findChains,
  removeChains,
};
