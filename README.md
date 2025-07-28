# 🚀 CollabSphere

**CollabSphere** is a modern, full-stack project management platform designed to help teams collaborate efficiently. Built with Next.js and featuring real-time communication, task management, and seamless file sharing capabilities.

![Dashboard](./public/ss3.png)

## 🌟 Overview

CollabSphere provides teams with all the essential tools needed for successful project collaboration:

- Create and manage multiple projects
- Invite team members and assign roles
- Track tasks with due dates and priorities
- Real-time chat and notifications
- File uploads and document sharing
- Analytics and progress tracking

## ✨ Key Features

### 📊 Project Management

- **Project Creation & Organization** - Create unlimited projects with custom settings
- **Team Collaboration** - Invite members via email with role-based permissions
- **Task Assignment** - Create, assign, and track tasks with due dates and descriptions
- **Progress Tracking** - Monitor project progress with built-in analytics

### 💬 Communication

- **Real-time Chat** - Instant messaging between team members
- **Smart Notifications** - Get notified about project updates, task assignments, and invitations
- **Activity Feed** - Stay updated with project activities and member actions

### 🔧 Productivity Tools

- **Todo Lists** - Personal and team-wide task management
- **File Management** - Upload and share documents with Amazon S3 integration
- **Dashboard Analytics** - Visualize team performance and project insights
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## 🛠️ Technology Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern, accessible component library
- **React Query** - Data fetching and state management

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for data storage
- **NextAuth.js** - Authentication and session management
- **Mongoose** - MongoDB object modeling

### Infrastructure

- **Amazon S3** - File storage and management
- **Vercel** - Deployment and hosting (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- AWS account for S3 storage

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Krishnagokul1305/CollabSphere.git
cd collabsphere
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_aws_region
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
collabsphere/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   ├── api/               # API routes
│   ├── lib/               # Server-side utilities
│   │   ├── actions/       # Server actions
│   │   ├── models/        # Database models
│   │   └── auth.js        # NextAuth configuration
│   └── utils/             # Utility functions
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Client-side utilities
├── public/               # Static assets
└── pages/                # Additional pages (if any)
```

## 🔑 Key Components

### Server Actions

- [`insertProject`](app/lib/actions/projectAction.js) - Create new projects
- [`inviteMember`](app/lib/actions/projectAction.js) - Send project invitations
- [`updateTask`](app/lib/actions/taskAction.js) - Update task information
- [`deleteTask`](app/lib/actions/taskAction.js) - Remove tasks from projects

### Email Templates

- [`generateSendWelcomEmail`](app/utils/HTMLGenerate.js) - Welcome email for new users

## 🚀 Deployment

### Using Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- ESLint configuration in [.eslintrc.json](.eslintrc.json)
- Tailwind CSS configuration in [tailwind.config.js](tailwind.config.js)
- Component configuration in [components.json](components.json)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gokulakrishnan**

- GitHub: [@Krishnagokul1305](https://github.com/Krishnagokul1305)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from various sources

---

<div align="center">
  <p>Made with ❤️ for better team collaboration</p>
</div>
