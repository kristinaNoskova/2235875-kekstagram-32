const state = {
  data: null,
};

const getState = (key) => state[key];

const setState = (key, value) => {
  state[key] = value;
};

export { setState, getState };
