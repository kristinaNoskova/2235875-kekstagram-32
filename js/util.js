const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getArrayElement = (elements) => {
  const randomItem = elements[getRandomInteger(0, elements.length - 1)];
  return randomItem;
};

const createSerialNumber = () => {
  let serialNumber = 0;

  return () => {
    serialNumber += 1;
    return serialNumber;
  };
};

export { getRandomInteger, getArrayElement, createSerialNumber };
