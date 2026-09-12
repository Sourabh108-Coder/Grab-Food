# 🍔 GrabFood

### Your cravings, one click away! 🍕🍔🍟

**GrabFood** is a full-stack food ordering platform where customers can browse food, manage their cart, place orders, and make online payments. Admins can manage food items and customer orders through a dedicated dashboard.

---

## ✨ Features

### 🛒 Customer
- 🍔 Browse food items
- 👤 Register & login
- 🛍️ Manage cart
- 📦 Place orders
- 💳 Razorpay payments
- 🔐 JWT authentication

### 🧑‍💼 Admin
- 📊 Dashboard statistics
- 🍕 Add & remove food
- 📋 View orders
- 🔄 Update order status

---

## 🛠️ Tech Stack

- ⚛️ **Frontend:** React 18, React Router, Axios
- 📊 **Admin:** React 18, React Router, Axios
- 🚀 **Backend:** Node.js, Express.js, Mongoose
- 🍃 **Database:** MongoDB
- 🔐 **Auth:** JWT, bcrypt
- 💳 **Payments:** Razorpay
- 📸 **Uploads:** Multer

---

## 📁 Project Structure

```text
Food App/
├── frontend/   🍽️ Customer application
├── admin/      📊 Admin dashboard
└── backend/    ⚙️ Express API
``` 

## 🚀 Getting Started

1. Install Dependencies

   - cd backend && npm install
   - cd ../frontend && npm install
   - cd ../admin && npm install

2. Environment Variables

   - Create backend/.env:
     - MONGO_URI=mongodb://127.0.0.1:27017/grabfood
     - JWT_SECRET=your-secret
     - RAZORPAY_KEY_ID=your-key
     - RAZORPAY_SECRET_KEY=your-secret-key

   - Create frontend/.env:
     - REACT_APP_RAZORPAY_KEY_ID=your-key

 3. Run the Apps

    - Backend:
      - cd backend
      - npm run server

    - Frontend:
      - cd frontend
      - npm start

    - Admin:
      - cd admin
      - npm start


## 🌐 Local URLs

   - App URL
     - ⚙️ Backend	http://localhost:4000
     - 🍽️ Frontend	http://localhost:3000
     - 📊 Admin	http://localhost:3001
     - 🔌 API

   - Base URL:
     - http://localhost:4000/api/v1/grabfood


## Module Routes
   - 🍔 Food	GET /list · POST /addfood · POST /remove
   - 👤 Auth	POST /register · POST /login
   - 🛒 Cart	POST /addcart · POST /removecart · POST /getcart
   - 📦 Orders	POST /orderfood · POST /verify · POST /listorder
   - 🧑‍💼 Admin	GET /listadmin · POST /updatestatus · GET /admindashboard
   - 🤝 Contributing
   - 🍴 Fork the repository
   - 🌿 Create a branch
   - ✍️ Make your changes
   - 🧪 Test your changes
   - 🔀 Create a Pull Request


## Screenshots




## 🍔 Made with ❤️ and a serious appetite.

## Author
  - Sourabh (https://github.com/Sourabh108-Coder)