/**
 * @name loadState
 * @description Load state from local session storage
 * @param {String} stateName State name to load
 * @returns {Object} State
 */
const loadState = (stateName) => {
  try {
    const serializedState = sessionStorage.getItem(stateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * @name saveState
 * @description Save state in local session storage
 * @param {String} stateName State name to save
 * @param {Object} state State to save
 * @returns {Object} State
 */
const saveState = (stateName, state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(stateName, serializedState);
  } catch (err) {
    throw new Error("Can't save changes in local session storage");
  }
};

/**
 * @name throttle
 * @description Throttle a function to be called only once every delay
 * @param {Function} fn Function to throttle
 * @param {Number} delay Delay in ms
 * @returns {Function} Throttled function
 */
const throttle = (fn, delay) => {
  let wait = false;
  let storedArgs = null;

  function checkStoredArgs() {
    if (storedArgs == null) {
      wait = false;
    } else {
      fn(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    }
  }

  return (...args) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    fn(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
};

export { loadState, saveState, throttle };
