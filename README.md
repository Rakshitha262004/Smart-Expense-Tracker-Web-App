# 💰 Smart Expense Tracker Web App

A full-stack personal finance web application built with the **MERN stack** (MongoDB, Express, React, Node.js). Track your income and expenses, set monthly budgets, get alerts when you overspend, and visualize your spending patterns with interactive charts.

---

## 🖥️ Live Preview

> Run locally on `http://localhost:5173`

---

## 📌 Problem Statement

Most people overspend without realizing it because they have no visibility into their daily finances. This app gives users a real-time overview of their income vs. expenses, helping them make smarter financial decisions through data visualization and budget alerts.

---

## ✨ Features

- 🔐 User Authentication (Register / Login) with JWT
- ➕ Add, Edit, Delete Transactions
- 🏷️ Categorize transactions — Food, Rent, Travel, Shopping, Bills, Education, Salary, Freelance
- 📊 Pie Chart — Expenses by Category
- 📈 Bar Chart — Monthly Spending Trend (last 6 months)
- 🎯 Set Monthly Budget per Category
- ⚠️ Budget Alert when spending exceeds limit
- 📱 Fully Responsive UI with Tailwind CSS
- 🔒 Protected Routes — each user sees only their own data

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| API Client | Axios |
| Build Tool | Vite |

---

## 📁 Project Structure

Smart-Expense-Tracker-Web-App/
│
├── client/                        ← React Frontend
│   ├── src/
│   │   ├── components/            ← Navbar, reusable UI
│   │   ├── context/               ← Auth Context (global state)
│   │   ├── pages/                 ← Login, Register, Dashboard, Transactions, Budget
│   │   └── services/              ← Axios API calls
│   ├── .env
│   └── package.json
│
├── server/                        ← Node/Express Backend
│   ├── config/                    ← MongoDB connection
│   ├── controllers/               ← Business logic
│   ├── middleware/                 ← JWT auth middleware
│   ├── models/                    ← Mongoose schemas
│   ├── routes/                    ← API route definitions
│   ├── .env
│   └── server.js
│
├── docs/                          ← Screenshots
└── README.md

---

## 🏗️ Architecture

React (Vite) ──── Axios ────► Express REST API ────► MongoDB Atlas
│                              │
Auth Context                  JWT Middleware
│                              │
Recharts Charts            Mongoose Models

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/me | Get current user | Yes |

### Transactions
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | /api/transactions | Get all transactions | Yes |
| POST | /api/transactions | Add transaction | Yes |
| PUT | /api/transactions/:id | Update transaction | Yes |
| DELETE | /api/transactions/:id | Delete transaction | Yes |

### Budget
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | /api/budgets | Get budgets | Yes |
| POST | /api/budgets | Set budget | Yes |
| DELETE | /api/budgets/:id | Delete budget | Yes |

### Dashboard
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | /api/dashboard/summary | Get analytics summary | Yes |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Smart-Expense-Tracker-Web-App.git
cd Smart-Expense-Tracker-Web-App
```

### 2. Backend setup
```bash
cd server
npm install
```

Create `server/.env`:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_secret_key_here
PORT=5000

Start backend:
```bash
node server.js
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create `client/.env`:
VITE_API_URL=http://localhost:5000/api

Start frontend:
```bash
npm run dev
```

### 4. Open the app
http://localhost:5173

---

## 🖼️ Screenshots

| Login Page | Transactions | Budget Manager |  Dashboard |
|------------| --------- | ------------ | -------------- |
| ![Login](outputs/1.png) | ![Transactions](outputs/5.png) | ![Budget](outputs/6.png) |  ![Dashboard](outputs/2.png) |
| ![Dashboard](outputs/3.png) |![Dashboard](outputs/4.png) |

---

### 🎥 Project Demo Video

### 📌 Watch Full Project Demo

Google Drive Video Link:
https://drive.google.com/file/d/1IHxiFmkvcfkdDwv2W8Ro0F5br1NUXpPE/view?usp=drivesdk
---

## 📊 Database Schema

### User
```json
{
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)"
}
```

### Transaction
```json
{
  "userId": "ObjectId (ref: User)",
  "type": "income | expense",
  "amount": "Number",
  "category": "String",
  "description": "String",
  "date": "Date"
}
```

### Budget
```json
{
  "userId": "ObjectId (ref: User)",
  "category": "String",
  "limit": "Number",
  "month": "String (YYYY-MM)"
}
```

---

## 🎓 Learning Outcomes

- Building REST APIs with Express.js and Mongoose
- JWT Authentication flow (register → login → protected routes)
- MongoDB Aggregation Pipelines for analytics
- React Context API for global auth state management
- Data visualization with Recharts
- Full-stack MERN architecture and folder structure
- Environment variable management
- Responsive UI design with Tailwind CSS

---

## 🔮 Future Enhancements

- [ ] Email notifications for budget alerts
- [ ] CSV export of transactions
- [ ] Recurring transaction support
- [ ] Deploy on Vercel + Render
- [ ] Dark mode

---

## 👨‍💻 Author

**Rakshitha A S**  
