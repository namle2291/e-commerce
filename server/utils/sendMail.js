const nodemailer = require("nodemailer");

function sendMail({ email, html, subject }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "lnam6507@gmail.com",
      pass: "soxzufidvpsqssca",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"NamLee 👻" <lnam6507@gmail.com>', // sender address
      subject,
      to: email, // list of receivers
      html, // html body
    });
  }
  main().catch(console.error);
}

module.exports = sendMail;
