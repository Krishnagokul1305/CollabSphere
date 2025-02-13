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
      secure: true,
      auth: {
        user: "krishnagokul1729@gmail.com",
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async sendMail(to, subject, text, html) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAILER_USER,
        to,
        subject,
        text,
        html,
      });

      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendWelcomeEmail(to, username) {
    const subject = "Welcome to Our Platform 🎉";
    const { html, text } = generateWelcomeEmail(username);
    return this.sendMail(to, subject, text, html);
  }

  async sendResetPasswordEmail(to, resetLink) {
    const subject = "Reset Your Password 🔒";
    const html = generateForgotPasswordEmail("", resetLink);
    return this.sendMail(to, subject, "reset password", html);
  }
};
