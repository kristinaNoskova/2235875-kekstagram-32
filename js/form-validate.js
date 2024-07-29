const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

imgUploadForm.method = 'POST';
imgUploadForm.enctype = 'multipart/form-data';
imgUploadForm.action = 'https://32.javascript.htmlacademy.pro/kekstagram';
console.log(imgUploadForm);

// imgUploadOverlay.classList.remove('hidden');
console.log(imgUploadOverlay);
