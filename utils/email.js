const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // 2) Define the email options
  const mailOptions = {
    from: 'Yuniver & Co yuniver@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:`
    // <p>Your requested a password rest</p>
    // <h1>Click on this link <a href=${options.url} <a> to reset password</h1>
    // `
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
