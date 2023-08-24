
export default function mailer() {

  const feedbackForm = document.querySelector('.form');

  feedbackForm.addEventListener('submit', uploadFile);

  async function uploadFile(event) {
    event.preventDefault();

    const file = event.target.file.files[0];
    // const formData = new FormData();
    // formData.append('file', file.name);

    try {
      const response = await fetch(`/upload/${file.name}`, {
        method: 'POST',
        body: file,
        // headers: {
        //   'Content-Type' : 'application/octate-stream'
        // },
      });

    } catch (error) {
      console.log(error);
    };
  };
};