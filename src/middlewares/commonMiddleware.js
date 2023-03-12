const commonMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    default:
  }
  next(action);
};

export default commonMiddleware;
