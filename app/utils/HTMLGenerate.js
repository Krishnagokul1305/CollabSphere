export function generateSendWelcomEmail(username, link) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Welcome to CollabSphere - Your Project Management Hub</title>
    <!--[if mso]>
    <nxml:namespace xmlns:nxml="urn:schemas-microsoft-com:office:office" />
    <nxml:namespace xmlns:w="urn:schemas-microsoft-com:office:word" />
    <![endif]-->
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Base styles */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            width: 100% !important;
            min-width: 100%;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }

        .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
        }

        .logo {
            width: 60px;
            height: 60px;
            background-color: #ffffff;
            border-radius: 12px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }

        .email-header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .email-header p {
            color: #e8eaff;
            font-size: 16px;
            margin: 10px 0 0;
        }

        .email-body {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 18px;
            color: #333333;
            margin-bottom: 20px;
        }

        .welcome-message {
            font-size: 16px;
            color: #555555;
            line-height: 1.7;
            margin-bottom: 30px;
        }

        .highlight-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
            color: #ffffff;
        }

        .highlight-card h3 {
            font-size: 20px;
            font-weight: 600;
            margin: 0 0 10px;
        }

        .highlight-card p {
            font-size: 16px;
            margin: 0;
            opacity: 0.9;
        }

        .features-section {
            margin: 35px 0;
        }

        .features-title {
            font-size: 20px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 20px;
            text-align: center;
        }

        .features-grid {
            display: table;
            width: 100%;
            margin: 20px 0;
        }

        .feature-row {
            display: table-row;
        }

        .feature-item {
            display: table-cell;
            width: 50%;
            padding: 15px 10px;
            vertical-align: top;
        }

        .feature-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            color: #ffffff;
            font-size: 18px;
        }

        .feature-title {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 5px;
        }

        .feature-description {
            font-size: 14px;
            color: #666666;
            line-height: 1.5;
        }

        .cta-section {
            text-align: center;
            margin: 40px 0;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff !important;
            padding: 16px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .secondary-cta {
            margin-top: 20px;
        }

        .secondary-cta a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }

        .tips-section {
            background-color: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }

        .tips-title {
            font-size: 18px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 15px;
        }

        .tip-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
            font-size: 14px;
            color: #555555;
        }

        .tip-number {
            background-color: #667eea;
            color: #ffffff;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            margin-right: 12px;
            flex-shrink: 0;
        }

        .email-footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }

        .footer-content {
            font-size: 14px;
            color: #666666;
            line-height: 1.6;
        }

        .footer-links {
            margin: 20px 0;
        }

        .footer-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 15px;
            font-weight: 500;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-link {
            display: inline-block;
            width: 36px;
            height: 36px;
            background-color: #667eea;
            border-radius: 50%;
            margin: 0 8px;
            text-decoration: none;
            color: #ffffff;
            line-height: 36px;
            font-size: 16px;
        }

        /* Mobile responsiveness */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            
            .email-header,
            .email-body,
            .email-footer {
                padding: 20px !important;
            }
            
            .features-grid {
                display: block !important;
            }
            
            .feature-item {
                display: block !important;
                width: 100% !important;
                padding: 10px 0 !important;
            }
            
            .cta-button {
                display: block !important;
                margin: 0 auto;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Welcome to CollabSphere!</h1>
            <p>Your journey to better project management starts here</p>
        </div>

        <!-- Body -->
        <div class="email-body">
            <div class="greeting">
                Hi ${username},
            </div>

            <div class="welcome-message">
                Welcome to CollabSphere! We're excited to have you join thousands of teams who are already collaborating more effectively and getting more done together.
            </div>

            <div class="highlight-card">
                <h3>🎉 Your account is ready!</h3>
                <p>You now have access to all of CollabSphere's powerful project management and collaboration features.</p>
            </div>

            <div class="features-section">
                <div class="features-title">What you can do with CollabSphere:</div>
                
                <div class="features-grid">
                    <div class="feature-row">
                        <div class="feature-item">
                            <div class="feature-icon">📋</div>
                            <div class="feature-title">Project Management</div>
                            <div class="feature-description">Create, organize, and track projects with intuitive tools and dashboards.</div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">💬</div>
                            <div class="feature-title">Real-time Chat</div>
                            <div class="feature-description">Communicate instantly with your team members and stay connected.</div>
                        </div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-item">
                            <div class="feature-icon">✅</div>
                            <div class="feature-title">Task & Todo Management</div>
                            <div class="feature-description">Break down work into manageable tasks and track progress effortlessly.</div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">📊</div>
                            <div class="feature-title">Analytics Dashboard</div>
                            <div class="feature-description">Get insights into team performance and project progress at a glance.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cta-section">
                <a href="${link}" class="cta-button">Access Your Dashboard</a>
                <div class="secondary-cta">
                </div>
            </div>

            <div class="tips-section">
                <div class="tips-title">Quick Start Tips:</div>
                <div class="tip-item">
                    <div class="tip-number">1</div>
                    <div>Create your first project and invite team members</div>
                </div>
                <div class="tip-item">
                    <div class="tip-number">2</div>
                    <div>Set up your profile and notification preferences</div>
                </div>
                <div class="tip-item">
                    <div class="tip-number">3</div>
                    <div>Explore the chat feature to connect with your team</div>
                </div>
                <div class="tip-item">
                    <div class="tip-number">4</div>
                    <div>Check out the dashboard for project insights</div>
                </div>
            </div>

            <div class="welcome-message">
                If you have any questions or need assistance, our support team is here to help. We're committed to making your collaboration experience as smooth as possible.
            </div>

            <div class="welcome-message">
                Happy collaborating!<br>
                <strong>The CollabSphere Team</strong>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-content">
                <p>&copy; 2025 CollabSphere. All rights reserved.</p>
               
            </div>
        </div>
    </div>
</body>
</html>
`;
}

export function generateSendProjectInvitationEmail(project, link) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Project Invitation - CollabSphere</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Base styles */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            width: 100% !important;
            min-width: 100%;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .email-header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }

        .header-icon {
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            backdrop-filter: blur(10px);
        }

        .email-header h1 {
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .email-header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin: 8px 0 0;
        }

        .email-body {
            padding: 40px 30px;
        }

        .invitation-message {
            text-align: center;
            margin-bottom: 30px;
        }

        .invitation-message h2 {
            color: #1f2937;
            font-size: 22px;
            font-weight: 600;
            margin: 0 0 10px;
        }

        .invitation-message p {
            color: #6b7280;
            font-size: 16px;
            margin: 0;
        }

        .project-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #4f46e5;
            position: relative;
        }

        .project-status {
            position: absolute;
            top: 15px;
            right: 15px;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .status-active {
            background-color: #dcfce7;
            color: #166534;
        }

        .status-inactive {
            background-color: #fef3c7;
            color: #92400e;
        }

        .status-completed {
            background-color: #dbeafe;
            color: #1e40af;
        }

        .project-name {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 12px;
            padding-right: 80px;
        }

        .project-description {
            font-size: 15px;
            color: #4b5563;
            line-height: 1.6;
            margin: 0;
        }

        .project-owner {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
        }

        .owner-name {
            font-weight: 600;
            color: #4f46e5;
        }

        .steps-section {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }

        .steps-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 20px;
            text-align: center;
        }

        .step-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            padding: 12px;
            background-color: #ffffff;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        .step-number {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 700;
            margin-right: 15px;
            flex-shrink: 0;
        }

        .step-content {
            flex: 1;
        }

        .step-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 4px;
        }

        .step-description {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
        }

        .cta-section {
            text-align: center;
            margin: 35px 0;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff !important;
            padding: 16px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
            transition: all 0.3s ease;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
        }

        .alternative-action {
            margin-top: 20px;
            font-size: 14px;
            color: #6b7280;
        }

        .alternative-action a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
        }

        .warning-box {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 25px 0;
        }

        .warning-box p {
            margin: 0;
            font-size: 14px;
            color: #92400e;
        }

        .email-footer {
            background-color: #f9fafb;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer-content {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
        }

        .footer-links {
            margin: 15px 0;
        }

        .footer-links a {
            color: #4f46e5;
            text-decoration: none;
            margin: 0 12px;
            font-weight: 500;
        }

        /* Mobile responsiveness */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
                border-radius: 0 !important;
            }
            
            .email-header,
            .email-body,
            .email-footer {
                padding: 20px !important;
            }
            
            .project-name {
                padding-right: 0 !important;
                margin-bottom: 20px !important;
            }
            
            .project-status {
                position: static !important;
                display: inline-block !important;
                margin-bottom: 10px !important;
            }
            
            .cta-button {
                display: block !important;
                margin: 0 auto;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="header-icon">🤝</div>
            <h1>Project Invitation</h1>
            <p>You've been invited to collaborate</p>
        </div>

        <div class="email-body">
            <div class="invitation-message">
                <h2>Hi Buddy,</h2>
                <p>${
                  project?.owner?.name || "Unknown"
                } has invited you to join a project on CollabSphere!</p>
            </div>

            <!-- Project Details Card -->
            <div class="project-card">
                <div class="project-status status-${project.status}">${
    project.status
  }</div>
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${
                  project?.description || "No description provided"
                }</p>
                <div class="project-owner">
                    Project Owner: <span class="owner-name">${
                      project?.owner?.name || "Unknown"
                    }</span>
                </div>
            </div>

            <!-- Steps to Accept -->
            <div class="steps-section">
                <h3 class="steps-title">How to Accept This Invitation</h3>
                
                <div class="step-item">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">Go to Your Dashboard</div>
                        <div class="step-description">Click the button below or log into your CollabSphere account</div>
                    </div>
                </div>

                <div class="step-item">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">Check Your Notifications</div>
                        <div class="step-description">Look for the notification bell icon and click to view pending invitations</div>
                    </div>
                </div>

                <div class="step-item">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <div class="step-title">Accept the Request</div>
                        <div class="step-description">Find this project invitation and click "Accept" to join the team</div>
                    </div>
                </div>

                <div class="step-item">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <div class="step-title">Start Collaborating</div>
                        <div class="step-description">Once accepted, you'll have full access to the project and can start contributing</div>
                    </div>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="cta-section">
                <a href="${link}" class="cta-button">Go to Dashboard & Accept</a>
            </div>

            <div class="invitation-message">
                <p>We're excited to see what you and the team will accomplish together on CollabSphere!</p>
                <p><strong>The CollabSphere Team</strong></p>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-content">
                <p>&copy; 2025 CollabSphere. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}
