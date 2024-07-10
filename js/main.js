const DESCR_PHOTOS = ['Город', 'cад', 'горы', 'озеро', 'река', 'лес'];
const NAMES = ['Иван', 'Анна', 'Сергей', 'Елена', 'Максим', 'Ольга', 'Дмитрий', 'Татьяна', 'Александр', 'Мария', 'Андрей', 'Наталья', 'Алексей', 'Ирина', 'Юлия'];
const TEXT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо.', 'Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createSerialNumber = () => {
  let serialNumber = 0;

  return () => {
    serialNumber += 1;
    return serialNumber;
  };
};

const getCurrentNumber = createSerialNumber();
const getIdPhotos = createSerialNumber();
const getIdComment = createSerialNumber();


const getUrlPhotos = () => `photos/${getIdPhotos()}.jpg`;

const getUrlAvatar = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;

function getArrayElement(elements) {
  const randomItem = elements[getRandomInteger(0, elements.length - 1)];
  return randomItem;
}

const describesComment = () => ({
  return: {
    id: getIdComment(),
    avatar: getUrlAvatar(),
    message: Array.from({ length: getRandomInteger(1, 2) }, () => getArrayElement(TEXT_MESSAGES)),
    name: getArrayElement(NAMES)
  }
});

const describesPhoto = () => ({
  return: {
    id: getCurrentNumber(),
    url: getUrlPhotos(),
    description: getArrayElement(DESCR_PHOTOS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, describesComment),
  }
});

const arrayWithPhotos = () => Array.from({ length: 25 }, describesPhoto);

console.log(arrayWithPhotos());
