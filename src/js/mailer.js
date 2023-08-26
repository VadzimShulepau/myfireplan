import Email from './smtp.js';

export default function mailer() {

  const feedbackForm = document.querySelector('.form');

  feedbackForm.addEventListener('submit', uploadFile);

  async function uploadFile(event) {
    event.preventDefault();

    const files = event.target.file.files;
    const file = files[0];

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    const message = {
      email: event.target.email.value,
      tel: event.target.tel.value,
      msg: event.target.message.value,
      data: await fileToBase64(file),
      fileName: file.name,
    };

    // const formData = new FormData();
    // formData.append('file', file.name);

    //   try {
    //     const response = await fetch(`/upload/${file.name}`, {
    //       method: 'POST',
    //       body: file,
    //       // headers: {
    //       //   'Content-Type' : 'application/octate-stream'
    //       // },
    //     });

    //   } catch (error) {
    //     console.log(error);
    //   };
    sendMessage(message);
  };

};

async function sendMessage(message) {
  const response = await Email.send({
    SecureToken: 'e0bdc042-c8ae-4769-a1c8-0a28be166bbe',
    To: 'shulepau.vadzim@gmail.com',
    From: 'shulepau.vadzim@gmail.com',
    Subject: "Message from MyFirePlan",
    Body: `
      <b>Email: ${message.email}</b><br>
      <b>Tel.: ${message.tel}</b><br>
      <b>Message</b>:<br>
      <p>${message.msg}</p>
    `,
    Attachments: [{
      name: message.fileName,
      data: message.data,
    }],
  });

  console.log(response)
};
