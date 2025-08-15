# Second Brain API 🧠

A powerful personal knowledge management system built with Node.js, Express, TypeScript, and MongoDB. Store, organize, and interact with your saved content using AI-powered features.

## ✨ Features

- **Smart Content Storage**: Save tweets, YouTube videos, articles, and any web content
- **AI-Powered Summaries**: Get intelligent summaries of your saved content
- **Smart Tagging**: AI-suggested tags and custom tag creation
- **Advanced Search**: Semantic search across your entire knowledge base
- **Multiple Auth Methods**: JWT, OAuth (Google, Facebook, Twitter), Phone/Email OTP
- **Modern Tech Stack**: TypeScript, Express.js, MongoDB, Zod validation

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt for password hashing
- **Validation**: Zod schema validation
- **Security**: Helmet, CORS, environment variables
- **Development**: ESLint, Prettier, Nodemon

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd second-brain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment template
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Configure Environment Variables**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/second-brain
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Development with Auto-reload
```bash
npm run dev:watch
```

### Production Build
```bash
npm run build
npm start
```

### Other Commands
```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format code with Prettier
npm run clean         # Clean build directory
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "authProvider": "email"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <your-jwt-token>
```

### Health Check
```http
GET /health
```

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Business logic controllers
├── middlewares/      # Custom middleware
├── models/          # Database models and schemas
├── routes/          # API route definitions
├── services/        # Business logic services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app setup
└── server.ts        # Server startup
```

## 🔐 Authentication Flow

1. **Registration**: User provides email/password → Password hashed → JWT token generated
2. **Login**: User provides credentials → Password verified → JWT token generated
3. **Protected Routes**: JWT token verified in middleware → User info attached to request
4. **Token Expiry**: Tokens expire after 7 days (configurable)

## 🚧 Next Steps (Roadmap)

- [ ] **Phone/Email OTP Authentication**
- [ ] **Google OAuth Integration**
- [ ] **Facebook OAuth Integration**
- [ ] **Twitter OAuth Integration**
- [ ] **Content Extraction Service** (tweets, YouTube videos, articles)
- [ ] **AI Summary Generation**
- [ ] **Smart Tag Recommendations**
- [ ] **Advanced Search & Filtering**
- [ ] **Content Sharing & Collaboration**
- [ ] **Mobile App Support**

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

If you have any questions or need help, please open an issue or contact the development team.

---

**Happy Building! 🚀**
