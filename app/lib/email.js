import nodemailer from "nodemailer";

// Replace with your SMTP credentials
const smtpOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "krishnagokul1729@gmail.com",
    pass: "gqwkipqlhbyzrkma",
  },
};

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: "Next.js Auth <krishnagokul1729@gmail.com>",
    ...data,
  });
};

export const sendResetPasswordEmail = async (email, resetLink) => {
  const html = `
      <html>
        <body>
          <h2>Reset Your Password</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" style="display:inline-block;background:#007bff;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
        </body>
      </html>
    `;

  return sendEmail({
    to: email,
    subject: "Reset Your Password 🔒",
    html,
  });
};
