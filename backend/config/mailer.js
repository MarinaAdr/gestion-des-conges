require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const mailOptions = {
  from: process.env.SMTP_USER,
  to: process.env.ADMIN_EMAIL,
  subject: 'Demande de congé en attente de validation',
  text: 'Bonjour,\n vous avez reçu une demande de congé en attente de validation.\n   Merci de la valider ou de la refuser.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Erreur lors de l\'envoi de l\'email:', error);
  }
  console.log('Email envoyé:', info.response);
}); 