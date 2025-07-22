import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
import Home from './Components/Home';
import FeaturesSection from './Components/Features';
import AboutUs from './Components/AboutUs';
import AdminDashboard from './Components/dashboards/AdminDashboard';
import FAQ from './Components/FAQ';
import Footer from './Components/Footer';
import BlogSection from './Components/BlogSection';
import Top10Superfoods from "./Components/blogs/Top10Superfoods";
import ScienceOfEffectiveWorkouts from "./Components/blogs/ScienceOfEffectiveWorkouts";
import HydrationMyths from "./Components/blogs/HydrationMyths";
import AreYouDepressed from "./Components/blogs/AreYouDepressed";

//
import PDFUpload from './Components/PDFUpload';
import PDFList from './Components/PDFList';
import Prescriptions from "./Components/Prescriptions";
import AdminPrescriptions from './Components/AdminPrescription';
import PatientForm from './Components/PatientForm';
import PatientList from './Components/PatientList';
import UpdatePatient from './Components/UpdatePatient';
import Graph from './Components/Graph';
import BarGraph from './Components/BarGraph';
// import PatientList from './Components/PatientList';

//
import AppointmentSummary from './Components/addAppointment/appointmentSummary';
import DoctorsDetails from './Components/doctorDetails/doctorsDetails';
import Status from './Components/addAppointment/AppointmentStatusTable';
import AddDAppointment from "./Components/addAppointment/AddAppointment";
import AddDoctors from './Components/addDoctors/AddDoctors';
import UpdateDoctor from './Components/updateDoctor/UpdateDoctor';
import ViewAppointment from './Components/addAppointment/DisplayAppointment';
import AdminViewDoc from './Components/doctorDetails/doctorDetails';


//
import AddPettyCash from './Components/pettycashadd';
import DisplayPettyCash from './Components/pettycashdisplay';
import UpdatePettyCash from './Components/updatePettyCash';
import ProfitLossDisplay from './Components/profit-lossdisplay';
import BalanceSheetDisplay from './Components/balance-sheetdisplay';
import DisplayTransactions from './Components/transactionsdisplay';
import DisplayFinanceTransactions from './Components/financetransactionsdisplay';
import FinanceManagement from './Components/dashboards/FinanceManagement';
import PayrollGenerator from './Components/payroll';

//
import Feedback from './Components/Feedbacks/Feedback';
import FeedbackDisplay from './Components/feedbackdisplay/FeedbackDisplay';

//
import AddInventory from './Components/Product/AddInventory';
import ProductUpdateInventory from './Components/Product/UpdateInventory';
import ListView from "./Components/Product/ListView";
import CardView from "./Components/Product/CardView";
import InventoryPieChart from './Components/Product/InventoryPieChart';
import LineChartComponent from './Components/Product/InventoryLineChart';
import ProductDetail  from './Components/Product/ProductDetail';
import Cart from './Components/Product/Cart';
import PaymentSuccess from './Components/Product/PaymentSuccess';

//

import { ToastContainer, toast } from 'react-toastify';
import ShopContextProvider from './context/ShopContext';


const App = () => {
  return (
    <UserProvider>
    <ShopContextProvider> 
      <Router>
        <MainLayout />
      </Router>
    </ShopContextProvider> 
  </UserProvider>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/pdfList", "/admindashboard","/adminprescrip","/feedbackDisplay", "/addPettyCash",
    "/displayPettyCash","/updatePettyCash/:id","/profit-loss","/balance-sheet","/transactions","/financetransactions",
    "/finance","/viewAppointments", "/doctorsDetails","/dashboard/user", "/view-patients",
    "/addnewproduct","/list","/update/:id", "/dashboard/admin","/addDoctors","/appointmentsummary",
  ]; 
 

  return (
    <>
 
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/features" element={<FeaturesSection/>} />
        <Route path="/blogs" element={<BlogSection/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/blogs/superfoods" element={<Top10Superfoods />} />
        <Route path="/blogs/workouts" element={<ScienceOfEffectiveWorkouts />} />
        <Route path="/blogs/hydration" element={<HydrationMyths />} />
        <Route path="/blogs/depression" element={<AreYouDepressed />} />

        <Route path="/pdfUpload" element={<PDFUpload/>} />
        <Route path="/pdfList" element={<PDFList/>} />
        <Route path="/prescrip" element={<Prescriptions/>} />
        <Route path="/adminprescrip" element={<AdminPrescriptions/>} />
        <Route path="/add-patient" element={<PatientForm/>} />
        <Route path="/view-patients" element={<PatientList/>} />
        <Route path="/update-patient/:id" element={<UpdatePatient/>} />
        <Route path="/graph" element={<Graph/>} />
        <Route path="/bar-graph" element={<BarGraph/>} />
        {/* <Route path="/PatientList" element={<PatientList/>} /> */}

        <Route path="/doctorsDetails" element={<AdminViewDoc/>} />
         <Route path="/DoctorDetails4P" element={<DoctorsDetails/>} />
         <Route path="/Status" element={<Status />} />
         <Route path="/AddDoctorAppointment" element={<AddDAppointment/>} />
         <Route path="/appointmentsummary" element={<AppointmentSummary/>} />
         {/* <Route path="/component2" element={<Login />} /> */}
         <Route path="/viewAppointments" element={<ViewAppointment/>}/>
         <Route path="/doctorsDetails/:id" element={<UpdateDoctor/>}/>
         <Route path="/AddDoctors" element={<AddDoctors/>}/>
         <Route path="/addDoctors/doctorsDetails" element={<DoctorsDetails />} />
         
        
        <Route path="/addPettyCash" element={<AddPettyCash />}/>
         <Route path="/displayPettyCash" element={<DisplayPettyCash/>}/>
         <Route path="/updatePettyCash/:id" element={<UpdatePettyCash/>}/>
         <Route path="/profit-loss" element={<ProfitLossDisplay/>}/>
         <Route path="/balance-sheet" element={<BalanceSheetDisplay/>}/>
         <Route path="/transactions" element={<DisplayTransactions/>}/>
         <Route path="/financetransactions" element={<DisplayFinanceTransactions/>}/>
         <Route path="/finance" element={<FinanceManagement/>} />
         <Route path="/payroll" element={<PayrollGenerator/>}/>

        <Route path="/addfeedback" element={<Feedback />} />
        <Route path="/feedbackDisplay" element={<FeedbackDisplay />} />
 
        <Route path="/list" element={<ListView />} />
        <Route path="/addnewproduct" element={<AddInventory />} />
        <Route path="/update/:id" element={<ProductUpdateInventory />} />
        <Route path="/card" element={<CardView />} />
        <Route path="/product-pie-chart" element={<InventoryPieChart />} />
        <Route path="/product-line-chart" element={<LineChartComponent/>} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/payment-success' element={<PaymentSuccess/>}/>
       
        
      </Routes>
 
    </>
  );
};

export default App;