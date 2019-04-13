
const cache = [];

export const getIndex = (rowIndex, columnIndex) => {
  while (cache.length <= rowIndex) {
    cache.push([]);
  }
  const row = cache[rowIndex];
  while (row.length <= columnIndex) {
    row.push(Object.freeze({
      row: rowIndex,
      column: row.length,
    }));
  }
  return row[columnIndex];
};

const convertCrystal = (crystal, rowIndex, columnIndex) => {
  return {
    crystal,
    index: getIndex(
        rowIndex,
        columnIndex,
    ),
  };
};

export {
  convertCrystal,
};
