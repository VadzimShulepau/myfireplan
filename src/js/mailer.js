import Email from './smtp.js';

export default function mailer(form) {
  form.addEventListener('submit', uploadFile);
};

async function uploadFile(event) {
  event.preventDefault();

  const files = event.target.file.files;

  const message = {
    email: event.target.email.value,
    tel: event.target.tel.value,
    msg: event.target.message.value,
    attachments: await addAttachments(files),
  };

  const isSent = await sendMessage(message);
  isSent.status ? clearFormData(event) : alert(isSent.message);
};

async function sendMessage(message) {
  const response = await Email.send({
    SecureToken: 'e0bdc042-c8ae-4769-a1c8-0a28be166bbe',
    To: 'shulepau.vadzim@gmail.com',
    From: 'shulepau.vadzim@gmail.com',
    Subject: 'Message from MyFirePlan',
    Body: `
      <b>Email: ${message.email}</b><br>
      <b>Tel.: ${message.tel}</b><br>
      <b>Message</b>:<br>
      <p>${message.msg}</p>
    `,
    Attachments: message.attachments,
  });
  return (response === 'OK' ? { status: true } : { status: false, message: `Message not sent...\n${response}` });
};

function clearFormData(event) {
  for (let item of event.target) {
    item.value = '';
  };
};

async function addAttachments(files) {
  const attachments = [];
  for (let item of files) {
    attachments.push(
      {
        name: item.name,
        data: await fileToBase64(item),
      },
    )
  };

  return attachments;
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};