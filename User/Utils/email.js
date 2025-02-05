const nodemailer = require("nodemailer");
const {
  generateWelcomeEmail,
  generateForgotPasswordEmail,
} = require("./mailTemplate");

module.exports = class {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "krishnagokul1729@gmail.com",
        pass: "hndqpybdyxhaaplc",
      },
    });
  }

  async sendMail(to, subject, text, html) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to,
        subject,
        text,
        html,
      });

      console.log("Message sent: %s", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendWelcomeEmail(to, username) {
    const subject = "Welcome to Our Platform 🎉";
    const { html, text } = generateWelcomeEmail();
    return this.sendMail(to, subject, text, html);
  }

  async sendResetPasswordEmail(to, resetLink) {
    const subject = "Reset Your Password 🔒";
    const html = this.sendResetPasswordEmail();
    return this.sendMail(to, subject, "reset password", html);
  }
};
