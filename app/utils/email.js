import nodemailer from "nodemailer";
import {
  generateSendProjectInvitationEmail,
  generateSendWelcomEmail,
} from "./HTMLGenerate";

export class Email {
  constructor(userEmail) {
    this.to = userEmail;
    this.from = process.env.EMAIL_USER;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, html) {
    const mailOptions = {
      from: `CollabSphere <${process.env.EMAIL_USER}>`,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(username) {
    const html = generateSendWelcomEmail(username, process.env.NEXTAUTH_URL);
    await this.send("Welcome to CollabSphere", html);
  }

  async sendProjectInvitation(project, link) {
    const html = generateSendProjectInvitationEmail(project, link);
    await this.send("Project Invitation", html);
  }

  async sendTestEmail() {
    const html =
      "<h1>This is a test email to check email sending functionality!</h1>";
    await this.send("Test Email from collabsphere", html);
  }
}
