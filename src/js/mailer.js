
export default function mailer() {

  const feedbackForm = document.querySelector('.form');
  // feedbackForm.addEventListener('submit', uploadFile);
  // const file = feedbackForm.file.files[0];
  feedbackForm.file.addEventListener('change', uploadFile);

  async function uploadFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    // const formData = new FormData();
    // formData.append('file', file, file.name);
    // try {
    //   const response = await fetch(`/upload/${file.name}`, {
    //     method: 'POST',
    //     body: file,
    //     // headers: {
    //     //   'Content-Type' : 'application/octate-stream'
    //     // },
    //   });

    //   const result = await response.json();

    //   console.log(result);
    //   console.log(response.status)
    // } catch (error) {
    //     console.log(error);
    // };

    const result = new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      // xhr.withCredentials = false;
      xhr.open('POST', `/upload/${file.name}`);
      // xhr.setRequestHeader('Content-Type', 'application/octate-stream');
      xhr.onload = resolve;
      xhr.onerror = reject;
      xhr.send(file);
    });

    console.log(await result)
  };
};