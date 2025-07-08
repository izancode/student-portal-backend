# 🏫 SchoolCool - Backend

The **SchoolCool Backend** powers the APIs and core logic of the SchoolCool platform – a full-featured school management system supporting role-based access, secure authentication, user profile management, and more.

Built with **Node.js**, **Express.js**, and **MongoDB**, this backend offers scalable APIs that serve multiple user roles including **Admins, Students, Faculty, and Parents**.

---

## 🚀 Project Overview

- 🔐 OTP-based authentication using **email**
- 🧑‍🏫 Role-based login and data access
- ☁️ File uploads via **Multer + Cloudinary**
- 🧵 Well-structured controller, middleware, and model architecture
- 🛡️ Secured routes and token-based access control

---

## 📦 Tech Stack

| Layer         | Technologies                                  |
|---------------|-----------------------------------------------|
| Server        | Node.js, Express.js                           |
| DB            | MongoDB Atlas                                 |
| Auth          | JWT, Nodemailer (OTP via email)               |
| File Upload   | Multer, Cloudinary, multer-storage-cloudinary |
| Env Mgmt      | dotenv                                        |
| Deployment    | Vercel                                        |

---

## 🔑 Core Features

### ✅ Authentication System
- OTP-based login (email/phone input, OTP sent via email)
- Role-based access (Admin, Faculty, Student, Parent)
- Secure token generation and validation (JWT)
- Logout with token + cookie clearance

### 👤 User Registration (POST APIs)
- Register students & faculty with profile image upload
- Common cloudinary+multer handler for image upload
- DB record only created after validations are passed
- Cloudinary cleanup handled if DB insert fails

### 🖼️ Image Upload Handling
- Automatic validation: if DB insert fails, image upload is aborted
- Old image deleted from Cloudinary before new one is uploaded
- Image format, size, and dimensions managed via cloudinary config

### 🔁 Update (PATCH APIs)
- Update entire profile OR just profile image
- Auto-save new image and remove old one from Cloudinary
- Profile updates reflected in frontend after ~2-3 seconds

### 🧪 Token-Based Verification APIs
- Verify token to confirm login session
- Get logged-in user’s data (student/faculty) via token ID
- Logout by clearing backend cookies and invalidating tokens

---

## 🌐 API Overview

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|--------------------------------------|
| POST   | `/api/student/signup`           | Register a new student               |
| POST   | `/api/faculty/signup`           | Register a new faculty               |
| POST   | `/api/auth/login`               | OTP-based login for any role         |
| POST   | `/api/auth/verify-token`        | Check token validity                 |
| GET    | `/api/user/profile`             | Get user data using JWT token        |
| PATCH  | `/api/user/update`              | Update profile info                  |
| PATCH  | `/api/user/update-image`        | Upload new image and delete old      |
| GET    | `/api/auth/logout`              | Logout user and clear cookies        |

---

## 🐞 Error Handling & Challenges Solved

- ✅ Cloudinary image cleanup on failed DB validation
- ✅ Fixed nodemailer issue on Vercel (added missing `await`)
- ✅ JWT + cookie sync between frontend/backend
- ✅ Secure error response + status codes via try/catch

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/your-username/schoolcool-backend.git
cd schoolcool-backend
npm install
```

### Configure Environment

Create a `.env` file and add the following:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password_or_app_key
```

### Run the Server
```bash
npm run dev
```

Server will start on: `http://localhost:5000`

---

## 📌 Deployment Notes

- Make sure to add all env variables on **Vercel** for deployment
- Backend configured to work seamlessly with frontend hosted on Vercel

---

## 👨‍💻 Author

Created by **Faizan Shaikh**  
MERN Stack Developer | Backend Specialist | Cloudinary Ninja

---

