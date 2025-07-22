const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const userRoutes = require('./Routes/userRoutes');
const pdfRoutes = require('./Routes/pdfRoutes');
const prescriptionRoutes = require("./Routes/prescriptionRoutes");
const patientRoutes = require('./Routes/patientRoutes');

const router = require("./Routes/DoctorRoutes");
const appointmentRoutes = require("./Routes/AppointmentRoutes");

const pettyCashRouter=require("./Routes/pettyCash.js")
const transactionRouter=require("./Routes/transactions.js")
const payrollRouter=require("./Routes/PayrollRoute.js")

const feedbackRoutes = require("./Routes/feedbackRoutes");

const ProductRoutes = require('./Routes/ProductRoutes');

const cartRoutes = require("./Routes/cartRoutes");

const app = express();
const bodyParser = require("body-parser");

// Middleware

//ynsi
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));



//mnith
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//mnith
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
      return res.status(200).send();
  }

  next();
});

app.use("/files", express.static("files"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/pdfs', pdfRoutes); 
app.use("/api/prescriptions", prescriptionRoutes);
app.use('/api/patients', patientRoutes);

app.use("/doctors",router);
app.use("/appointments", appointmentRoutes);

app.use("/transaction",transactionRouter)
app.use("/pettyCash",pettyCashRouter)
app.use("/payroll",payrollRouter)

app.use(bodyParser.json());
app.use("/api/feedback", feedbackRoutes);

app.use("/api/inventory", ProductRoutes);
app.use("/api/cart", cartRoutes);

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));