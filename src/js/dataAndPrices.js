export default function dataAndPrices() {
  function changeContacts() {
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    const mailsTo = document.querySelectorAll('a[href^="mailto:"]');

    const phoneLink = 'tel:+375447923558';
    const phoneStr = '+375(44) 792-35-58';
    const mailLink = 'mailto:infopb101@gmail.com';
    const mailStr = 'infopb101@gmail.com';

    for (let tel of phoneNumbers) {
      tel.href = phoneLink;
      tel.innerText = phoneStr;
    };

    for (let mail of mailsTo) {
      mail.href = mailLink;
      // mail.innerText = mailStr;
      mail.title = mailStr;
    };
  };
  changeContacts();


  function prices () {
  const a3InLamination = document.querySelector('.a3-in-lamination');
  const a3InLaminationWithPhotolum = document.querySelector('.a3-in-lamination-with-photolum');
  const a3PVCWithoutBorder = document.querySelector('.a3-PVC-without-border');
  const a3PVCWithBorder = document.querySelector('.a3-PVC-with-border');
  const a3PVCWithoutBorderWithPhotolum = document.querySelector('.a3-PVC-without-border-with-photolum');
  const a3PVCWithBorderWithPhotolum = document.querySelector('.a3-PVC-with-border-with-photolum');
  const a3PVCFramed = document.querySelector('.a3-PVC-framed');

  if (a3InLamination || a3InLaminationWithPhotolum || a3PVCWithoutBorder || a3PVCWithBorder || a3PVCWithoutBorderWithPhotolum || a3PVCWithBorderWithPhotolum || a3PVCFramed) {

    a3InLamination.textContent = '39';
    a3InLaminationWithPhotolum.textContent = '46';
    a3PVCWithoutBorder.textContent = '59';
    a3PVCWithBorder.textContent = '76';
    a3PVCWithoutBorderWithPhotolum.textContent = '72';
    a3PVCWithBorderWithPhotolum.textContent = '85';
    a3PVCFramed.textContent = '110';
  };
  };
  prices();
};