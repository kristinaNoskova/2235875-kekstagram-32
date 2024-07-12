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


// ДЗ: 5.16. Функции возвращаются

const convertToTime = (timeString) => {
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toLocaleTimeString().slice(0, 5);
};

const calculatesDurationMeeting = (startWorkingDay, endWorkingDay, startMeeting, durationMeeting) => {
  const anyDate = '2024-07-09T';
  const date = new Date(anyDate + convertToTime(startMeeting));
  let endMeetingTime = date.setMinutes(date.getMinutes() + durationMeeting);
  endMeetingTime = date.toLocaleTimeString().slice(0, 5);

  if (endMeetingTime <= convertToTime(endWorkingDay) && startMeeting >= convertToTime(startWorkingDay)) {
    return true;
  }
  return false;
};
calculatesDurationMeeting('08:00', '17:30', '14:00', 90); // true
calculatesDurationMeeting('8:0', '10:0', '07:00', 120); // false
calculatesDurationMeeting('08:00', '14:30', '14:00', 90); // false
calculatesDurationMeeting('08:00', '14:30', '14:00', 90); // false
calculatesDurationMeeting('8:00', '17:30', '8:0', 900); // false
