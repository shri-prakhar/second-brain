# Second Brain - Personal Knowledge Management System 🧠

A sophisticated personal knowledge management system built with Node.js, Express, TypeScript, and MongoDB. This system allows users to store, organize, and interact with various types of content (articles, tweets, YouTube videos) using AI-powered features.

## 🌟 Features

### Authentication & Authorization
- **Multiple Auth Methods**: 
  - JWT-based authentication
  - Google OAuth integration
  - Session-based authentication
  - Secure password hashing using bcrypt
- **Protected Routes**: Middleware-based route protection
- **Cookie-based Sessions**: Secure session management

### Content Management
- **Multi-Content Support**:
  - Articles with metadata extraction
  - Twitter posts
  - YouTube videos
  - Document links
- **AI-Powered Features**:
  - Content summarization using LLaMA2
  - Smart content analysis
  - URL metadata extraction

### Organization & Sharing
- **Tag Management System**:
  - Create and manage custom tags
  - Tag-based content organization
  - Tag filtering and search
- **Content Sharing**:
  - Share multiple items
  - Custom share messages
  - Time-based share expiry
  - Share count tracking

### User Management
- **User Profiles**:
  - Profile customization
  - Bio and profile picture
  - Saved items management
- **Learning Progress**:
  - Track reading/watching progress
  - Interest management
  - AI-powered recommendations

## 🛠️ Technical Architecture

### Backend Structure
```
src/
├── config/           # Configuration setup
│   ├── connection.ts     # Database connection
│   ├── openai.config.ts  # AI configuration
│   └── passport.ts       # Auth configuration
├── controllers/      # Request handlers
│   ├── ai.controller.ts
│   ├── auth.controllers.ts
│   ├── savedItems.controller.ts
│   ├── shared.controller.ts
│   └── tag.controller.ts
├── middlewares/      # Custom middlewares
│   └── auth.middlewares.ts
├── models/          # Database schemas
│   └── db.ts       # MongoDB models
├── routes/          # API routes
│   ├── ai.routes.ts
│   ├── auth.routes.ts
│   ├── savedItems.routes.ts
│   ├── shared.routes.ts
│   └── tag.routes.ts
├── services/        # Business logic
├── utils/           # Helper functions
├── validations/     # Input validation
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

### Database Schema

#### User Model
```typescript
interface User {
  name: string
  email: string
  password?: string
  authprovider: "email" | "googleId"
  profilePicture: string
  bio?: string
  savedItems: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}
```

#### SavedItems Model
```typescript
interface SavedItems {
  user: Types.ObjectId
  title: string
  url: string
  description: string
  tags: string[]
  folder?: string
  aiSummary?: string
  sharedCount: number
  createdAt: Date
  updateAt: Date
}
```

#### SharedItems Model
```typescript
interface SharedItems {
  User: Types.ObjectId
  savedItems: Types.ObjectId[]
  shareId: string
  message?: string
  createdAt: Date
  expiresAt?: Date
}
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user

### Saved Items
- `POST /items/addItem` - Save new content
- `GET /items/getItem` - Get saved items
- `PUT /items/updateItem/:id` - Update saved item
- `DELETE /items/deleteItem/:id` - Delete saved item

### Tags
- `POST /tags/addTag` - Create new tag
- `GET /tags/getTags` - Get all tags
- `DELETE /tags/deleteTag/:name` - Delete tag

### AI Features
- `GET /ai/getSummary/:id` - Get AI summary of content

### Sharing
- `POST /share/shareItems` - Share multiple items

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd second-brain
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a .env file with:
```env
PORT=5000
URL=<mongodb-connection-url>
JWT_SECRET=<your-jwt-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
CLIENT_URL=http://localhost:3000
```

4. **Start Development Server**
```bash
npm run dev
# or with auto-reload
npm run dev:watch
```

5. **Build for Production**
```bash
npm run build
npm start
```

## 🧪 Development Commands

```bash
npm run build          # Build TypeScript files
npm run start         # Start production server
npm run dev          # Start development server
npm run dev:watch    # Start development server with auto-reload
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run clean       # Clean build directory
```

## 🔐 Security Features

1. **Authentication Security**:
   - JWT token encryption
   - Secure password hashing
   - HTTP-only cookies
   - Session management

2. **Request Security**:
   - CORS configuration
   - Input validation using Zod
   - MongoDB injection prevention
   - Request sanitization

3. **Data Protection**:
   - Encrypted user data
   - Secure cookie handling
   - Protected routes middleware

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js
- **Validation**: Zod
- **AI Integration**: LLaMA2
- **Other Tools**: 
  - Bcrypt for password hashing
  - Cheerio for web scraping
  - Axios for HTTP requests
  - CORS for cross-origin requests
  - Helmet for security headers

## 📝 Environment Variables

```env
PORT=5000                    # Server port
URL=                        # MongoDB connection URL
JWT_SECRET=                 # JWT secret key
GEN_SALT=                   # Password hashing salt rounds
GOOGLE_CLIENT_ID=          # Google OAuth client ID
GOOGLE_CLIENT_SECRET=      # Google OAuth client secret
CLIENT_URL=                # Frontend application URL
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Node.js, Express, TypeScript, and MongoDB