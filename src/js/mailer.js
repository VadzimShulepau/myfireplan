// import * as Email from './smtp.js';

export default function mailer() {
  const feedbackForm = document.querySelector('.form');

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData();
    const formFiles = feedbackForm.file.files;

    for (let index = 0; index < formFiles.length; index++) {
      feedbackForm.addEventListener('change', (e) => {
        console.log(formFiles[index].size)
        if(formFiles[index].size > 24000000) console.log('превышен максимальный размер вложения - 24 Мб');
        feedbackForm.button.disabled = true;
        return
      });

      formData.append(`file_${index + 1}`, feedbackForm.file.files[index]);
    };

    formData.append('name', feedbackForm.name.value);
    formData.append('email', feedbackForm.email.value);
    formData.append('tel', feedbackForm.tel.value);
    formData.append('message', feedbackForm.message.value)
    sendEmail(formData);
  });
};

function sendEmail(formData) {
  const message = fetch('https://www.googleapis.com/auth/gmail.send', {
    method: 'POST',
    body: formData,
  });
  console.log(formData.get('file_1'))
  console.log(formData.get('name'))
  console.log(formData.get('email'))
  console.log(formData.get('tel'))
  console.log(formData.get('message'))
};