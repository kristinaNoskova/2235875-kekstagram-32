function checkLength(string, length) {
  return string.length <= length;
}

checkLength('проверяемая строка', 20);


function isPalindrome(string) {
  const normalization = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normalization.length - 1; i >= 0; i--) {
    newString += normalization[i];
  }

  return normalization === newString;
}

isPalindrome('Лёша на полке клопа нашёл');

function returnNumber(string) {
  const toString = string.toString();
  let number = '';
  for (let i = 0; i <= toString.length; i++) {
    if (!Number.isNaN(parseInt(toString[i], 10))) {
      number += toString[i];
    }
  }
  return parseInt(number, 10);
}

returnNumber('1 кефир, 0.5 батона 7');


