var nodemailer = require('nodemailer');

const Gmail = (email, pdf) => {
  var sender = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'fullstack022@gmail.com',
      pass: 'nopxdegxkwsphcya'
    }
  });

  var mail = {
    from: 'fullstack022@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    attachments: [
      {
        filename: 'test.pdf',
        content: pdf,
        contentType: 'application/pdf'
      } ]

  };

  sender.sendMail(mail, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully: ', info.response);
    }
  });
};
module.exports = Gmail;