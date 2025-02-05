const Mailgen = require("mailgen");

const product = {
  name: "Your App Name",
  link: "https://yourapp.com",
  logo: "https://yourapp.com/logo.png",
};

function generateWelcomeEmail(username) {
  const mailGenerator = new Mailgen({
    theme: "default",
    product,
  });

  const emailTemplate = {
    body: {
      name: username,
      intro: `Hello ${username}, you have successfully signed in to your account.`,
      action: {
        instructions: "Get started by exploring our features:",
        button: {
          color: "#22BC66",
          text: "Go to App",
          link: "https://yourapp.com/dashboard",
        },
      },
    },
  };

  return {
    html: mailGenerator.generate(emailTemplate),
    text: mailGenerator.generatePlaintext(emailTemplate),
  };
}

function generateForgotPasswordEmail(username, resetLink) {
  const mailGenerator = new Mailgen({
    theme: "default",
    product,
  });

  const emailTemplate = {
    body: {
      name: username,
      intro:
        "We received a request to reset your password. If you made this request, click the button below to reset your password.",
      action: {
        instructions: "Click the button below to set a new password:",
        button: {
          color: "#22BC66", // Green color for confirmation
          text: "Reset Password",
          link: resetLink,
        },
      },
      outro:
        "If you did not request a password reset, please ignore this email or contact support if you have concerns.",
    },
  };

  return mailGenerator.generate(emailTemplate);
}

module.exports = { generateWelcomeEmail, generateForgotPasswordEmail };
