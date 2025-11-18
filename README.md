# 🏥 MediHeaven

**MediHeaven** is a full-stack health and wellness management platform that enables users to track their personal health data, receive personalized suggestions, book doctor appointments, manage finances, and access a built-in marketplace for healthcare products. Built using the **MERN stack**, it supports **multiple user roles** and follows a **modular MVC architecture**.

---

## 🚀 Features

### ✅ Patient Health Management
- Register patients with details like **Age, Gender, Height, Weight, Sleep Hours, Exercise, and Target**.
- Automatically calculates **BMI** and provides dynamic health suggestions.
- Patients can **update or delete** their details and suggestions at any time.

### 📊 Data Visualization
- Displays **patient health data** (e.g., Age, Height, Weight) in **bar/line graphs** using React and charting libraries (Chart.js, Recharts).
- **Category-wise stock alert** for inventory, also visualized with **bar graphs** for quick admin monitoring.

### 👨‍⚕️ Health Provider Booking
- Patients can browse and book appointments with **health providers/doctors**.
- Providers manage their **availability, appointments, and profiles**.
- Includes **appointment confirmations and reminders**.

### 💰 Finance Management
- Users and admins can **track financial transactions** related to appointments and product purchases.
- Displays **monthly spending summaries** with graphical insights.
- Helps users understand and manage their health-related expenses.

### 🛒 Marketplace (Supplier Integration)
- Suppliers can add healthcare products with **name, description, price, category**, and **image upload** support.
- Users can browse, update, and delete products.
- Admins can manage inventory and monitor stock levels.

### 🔐 Role-Based Access
- Secure login system with multiple roles:
  - **Admin**
  - **Patient/User**
  - **Supplier**
  - **Health Provider**

### 🎨 UI & UX
- Clean, responsive interface built with **React.js** and **Bootstrap 5**.
- User-friendly layouts inspired by **Apple-style UI**.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Bootstrap 5, Chart.js / Recharts  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Architecture:** MVC (Model-View-Controller)  
- **Authentication:** JWT & bcrypt  
- **File Uploads:** Binary-based image handling  
- **Version Control:** Git & GitHub  

---

## ⚙️ Installation

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/Ravidujee19/MediHeaven.git
cd MediHeaven
```

### 2. Install Dependencies

#### Backend (Server)
```bash
cd backend
npm install
```

#### Frontend (Client)
```bash
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file inside the `/backend` directory and add the following:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/database_name?retryWrites=true&w=majority&appName=app_name
JWT_SECRET=dummy_jwt_secret_key_1234567890abcdef
PORT=5000

EMAIL_USER=example@example.com
EMAIL_PASS=dummy_email_password_1234
```

### 4. Run the Application

#### Start Backend
```bash
cd backend
npm start
```

#### Start Frontend
```bash
cd ../frontend
npm start
```

---

✅ The app will be running at:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 👥 Contributors

| Name | GitHub Profile | Contribution |
|------|----------------|---------------------|
| **Ravidu** | [github.com/Ravidujee19](https://github.com/Ravidujee19) | Project Setup, Health Monitoring Module, GitHub Repository Maintenance |
| **Yuhansi** | [github.com/yuhanzee](https://github.com/yuhanzee) | Inventory Management, Supplier Product Module |
| **Manith** | [github.com/Manith-Edirisinghe](https://github.com/Manith-Edirisinghe) | Finance Management, Reporting & Visualizations |
| **Shavinda** | [github.com/Shavinda26t](https://github.com/Shavinda26t) | Mental Health Module, Doctor Channeling & Booking System |
| **Sasindi** | | User Management, Feedback System, Authentication |

