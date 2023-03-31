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

/**
 * @name randomlyMixSeveralArrays
 * @description Randomly mix several arrays
 * @param {Array} arrays Arrays to mix
 * @param {Number} number Number of items to get if 0 retun all the items
 * @param {Number} start Start index
 * @returns {Array} Array of items
 */
const randomlyMixSeveralArrays = (arrays, number = 0, start = 0) => {
  const items = [];
  arrays.forEach((array) => {
    items.push(...array);
  });
  const shuffled = items.sort(() => 0.5 - Math.random());
  if (number > 0) {
    return shuffled.slice(start, start + number);
  }
  return shuffled;
};

/**
 * @name searchValueInArray
 * @description Search a value in an array
 * @param {Array} array Array to search in
 * @param {String} value Value to search
 * @param {String} key Key to search in
 * @returns {Array} Array of items
 */
const searchValueInArray = (array, value, key) => {
  if (array.length > 0) {
    return array.filter((item) => item[key] === value);
  }
  return null;
};

/**
 * @name hasKey
 * @description Check if an object has a key
 * @param {object} obj
 * @param {string} key
 * @returns {boolean}
 */
const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export {
  getFisrtArrayItem,
  getArrayItems,
  randomlyMixSeveralArrays,
  searchValueInArray,
  hasKey,
};
