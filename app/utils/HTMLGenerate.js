export function generateSendWelcomEmail(username, link) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CollabSphere!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            border: 1px solid #e0e0e0;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 20px;
        }
        .logo {
            max-width: 150px;
            height: auto;
            margin-bottom: 15px;
        }
        .header h1 {
            color: #000000;
            font-size: 28px;
            margin: 0;
        }
        .content p {
            margin-bottom: 15px;
            font-size: 16px;
            color: #555555;
        }
        .highlight-box {
            background-color: #f8f9fa;
            border-left: 4px solid #000000;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .highlight-box h3 {
            margin-top: 0;
            color: #000000;
            font-size: 18px;
        }
        .highlight-box p {
            margin-bottom: 0;
            color: #666666;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff !important;
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #333333;
        }
        .features {
            margin: 25px 0;
        }
        .feature-item {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }
        .feature-item:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #000000;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
        }
        .footer a {
            color: #000000;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to CollabSphere!</h1>
        </div>
        <div class="content">
            <p>Hi ${username},</p>
            <p>Welcome to CollabSphere! We're thrilled to have you join our collaborative community where teams come together to create amazing things.</p>
            
            <div class="highlight-box">
                <h3>You're all set to start collaborating!</h3>
                <p>Your account is ready, and you can now access all of CollabSphere's powerful features.</p>
            </div>

            <p>Here's what you can do with CollabSphere:</p>
            <div class="features">
                <div class="feature-item">Create and manage collaborative projects</div>
                <div class="feature-item">Connect with team members in real-time</div>
                <div class="feature-item">Track progress and stay organized</div>
            </div>

            <div class="button-container">
                <a href="${link}" class="button">Get Started</a>
            </div>

            <p>Happy collaborating!<br>The CollabSphere Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 CollabSphere. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
}
