function checkLength(string, length) {
  return string.length <= length;
}

checkLength('проверяемая строка', 20);


function isPalindrome(string) {
  const normalize = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normalize.length - 1; i >= 0; i--) {
    newString += normalize[i];
  }

  return normalize === newString;
}

isPalindrome('Лёша на полке клопа нашёл');
