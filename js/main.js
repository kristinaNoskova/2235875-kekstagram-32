function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomNumber(min, max) {
  const generatedValue = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    for (let i = min; i <= max; i++) {
      if (generatedValue.includes(currentValue)) {
        currentValue = getRandomInteger(min, max);
      } else {
        break;
      }
    }
    generatedValue.push(currentValue);
    return currentValue;
  };
}

const likes = createRandomNumber(15, 200);
const avatar = createRandomNumber(1, 6);
const commentId = createRandomNumber(0, Math.floor(Math.random() * 200));

function createSerialNumber(min, max) {
  let serialNumber = 0;

  return function () {
    if (serialNumber <= max) {
      serialNumber += 1;
    }
    return serialNumber;
  };
}

const currentNumber = createSerialNumber(1, 25);
const currenUrlId = createSerialNumber(1, 25);


function getUrl() {
  return `photos/${currenUrlId()}.jpg`;
}

function getAvatar() {
  return `img/avatar-${avatar()}.svg`;
}

const descrPhotos = ['Город', 'cад', 'горы', 'озеро', 'река', 'лес'];
const names = ['Иван', 'Анна', 'Сергей', 'Елена', 'Максим', 'Ольга', 'Дмитрий', 'Татьяна', 'Александр', 'Мария', 'Андрей', 'Наталья', 'Алексей', 'Ирина', 'Юлия'];
const textMessages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];


function getArrayElement(array) {
  const randomItem = array[Math.floor(Math.random() * array.length)];
  return randomItem;
}

const describesComment = () => ({
  return: {
    id: commentId(),
    avatar: getAvatar(),
    message: getArrayElement(textMessages),
    name: getArrayElement(names)
  }
});

const arrayWithComment = Array.from({ length: 30 }, describesComment);

function getRandomComment(array) {
  const mixedArray = array.sort(() => Math.random() - 0.5);
  const randomNumber = Math.floor(Math.random() * 30);
  const randomNumberArray = mixedArray.slice(randomNumber);
  return randomNumberArray;

}

const describesPhoto = () => ({
  return: {
    id: currentNumber(),
    url: getUrl(),
    description: getArrayElement(descrPhotos),
    likes: likes(),
    comments: getRandomComment(arrayWithComment),
  }
});


const arrayWithPhoto = Array.from({ length: 25 }, describesPhoto);

console.log(arrayWithPhoto);
