import { getRandomInteger, getArrayElement, createSerialNumber } from './util.js';

const DESCR_PHOTOS = ['Город', 'cад', 'горы', 'озеро', 'река', 'лес'];
const NAMES = ['Иван', 'Анна', 'Сергей', 'Елена', 'Максим', 'Ольга', 'Дмитрий', 'Татьяна', 'Александр', 'Мария', 'Андрей', 'Наталья', 'Алексей', 'Ирина', 'Юлия'];
const TEXT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо.', 'Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];

const getCurrentNumber = createSerialNumber();
const getIdPhotos = createSerialNumber();
const getIdComment = createSerialNumber();

const getUrlPhotos = () => `photos/${getIdPhotos()}.jpg`;

const getUrlAvatar = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;

const describesComment = () => ({
  id: getIdComment(),
  avatar: getUrlAvatar(),
  message: Array.from({ length: getRandomInteger(1, 2) }, () => getArrayElement(TEXT_MESSAGES)).join(' '),
  name: getArrayElement(NAMES)
});

const describesPhoto = () => ({
  id: getCurrentNumber(),
  url: getUrlPhotos(),
  description: getArrayElement(DESCR_PHOTOS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, describesComment),
});

const getArrayWithPhotos = () => Array.from({ length: 25 }, describesPhoto);

export { getArrayWithPhotos };
