/**
 * @name getFisrtArrayItem
 * @description Get the first item of an array
 * @param {Array} array Array to get first item from
 */
const getFisrtArrayItem = (array) => {
  if (array.length > 0) {
    return array[0];
  }
  return null;
};

/**
 * @name getArrayItems
 * @description Get the items of an array
 * @param {Array} array Array to get items from
 * @param {Number} start Start index
 * @param {Number} Number Number of items to get
 */
const getArrayItems = (array, start, number) => {
  if (array.length > 0) {
    return array.slice(start, start + number);
  }
  return null;
};

export { getFisrtArrayItem, getArrayItems };
