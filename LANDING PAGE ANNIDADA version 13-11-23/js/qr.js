const QRcontainer = document.getElementById('QRcontainer');
// new QRCode(QRcontainer, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
const formularioQR = document.getElementById('formularioQR');
const QR = new QRCode(QRcontainer);

formularioQR.addEventListener('submit', (e) => {
    e.preventDefault();
    QR.makeCode(formularioQR.link.value);
});

