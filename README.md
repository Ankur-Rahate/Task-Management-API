# 📝 Task Manager Backend API

A **Node.js + Express + MongoDB** based backend application for managing tasks with **JWT authentication** and **role-based access control (User/Admin)**.  

## 🚀 Features

#### - User Registration & Login
#### - JWT Authentication
#### - Role-based Access Control (User / Admin)
#### - Task CRUD Operations
#### - Only **Admin can delete tasks**
#### - Users can manage their own tasks
#### - Secure password hashing with bcrypt
#### - Centralized error handling
#### - Clean folder structure
#### - Postman collection for API testing

## 🛠 Tech Stack

#### - **Backend:** Node.js, Express.js
#### - **Database:** MongoDB (Mongoose)
#### - **Authentication:** JWT (JSON Web Token)
#### - **Security:** bcrypt
#### - **Tools:** Postman, Git, GitHub

## 📁 Project Structure

#### task-manager-backend/
#### │
#### ├── src/
#### │ │
#### │ ├── config/
#### │ │ └── config.js
#### │ │
#### │ ├── middlewares/
#### │ │ ├── authMiddleware.js
#### │ │ ├── roleMiddleware.js
#### │ │ └── globalErrorHandler.js
#### │ │
#### │ ├── users/
#### │ │ ├── usermodel.js
#### │ │ ├── usercontroller.js
#### │ │ └── userrouter.js
#### │ │
#### │ ├── Task/
#### │ │ ├── taskModel.js
#### │ │ ├── taskController.js
#### │ │ └── taskRouter.js
#### │ │
#### │ ├── app.js
#### │ └── server.js
#### │
#### ├── .env
#### ├── .gitignore
#### ├── package.json
#### └── README.md

## 🔐 Authentication Flow

#### 1. User registers / logs in
#### 2. Server returns **JWT access token**
#### 3. Token is sent in headers as
#### 4. Protected routes verify token using middleware

## 📌 API Endpoints

### 🔑 Auth & User

####  | Method | Endpoint | Description | Access |
##### |------|--------|------------|--------|
##### | POST | `/api/users/register` | Register user | Public |
##### | POST | `/api/users/login` | Login user | Public |
##### | GET | `/api/users/me` | Get logged-in user profile | User/Admin |

### 📋 Tasks

####  | Method | Endpoint | Description | Access |
##### |------|--------|------------|--------|
##### | POST | `/api/tasks` | Create new task | User/Admin |
##### | GET | `/api/tasks` | Get logged-in user tasks | User/Admin |
##### | PUT | `/api/tasks/:id` | Update task | User/Admin |
##### | DELETE | `/api/tasks/:id` | Delete task | **Admin only** |

## 🧪 Testing with Postman

##### - Import the **Postman collection JSON**
##### - Set environment variable:
##### - Login request automatically saves token
##### - Use protected routes with saved token

## ▶️ Run Project Locally

##### Install dependencies
##### npm install
##### Start server
##### npm run dev
