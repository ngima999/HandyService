import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

// Auth Pages
import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

// Customer Pages
import ManageJobs from "./components/Customer/ManageJobs";
import ViewApplicant from "./components/Customer/ViewApplicant";
import AddJobs from "./components/Customer/AddJobs";

// Service Provider Pages
import Home from "./components/ServiceProvider/Home/Home";
import PendingWorks from "./components/ServiceProvider/PendingWorks";
import BidResult from "./components/ServiceProvider/BidResult";
import JobList from "./components/ServiceProvider/Home/JobList";
import BidForm from "./components/ServiceProvider/Home/BidForm";


// shared pages
import Profile from "./shared/Profile";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />

        {/* Customer Routes (accessible for customer users) */}
        {user && user.role === "customer" ? (
          <>
            <Route path="/ManageJobs" element={<ManageJobs />} />
            <Route path="/view-applicant" element={<ViewApplicant />} />
            <Route path="/add-jobs" element={<AddJobs />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : null}

        {/* Service Provider Routes (accessible for serviceProvider users) */}
        {user && user.role === "serviceProvider" ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/bid" element={<BidForm />} />
            <Route path="/pending-works" element={<PendingWorks />} />
            <Route path="/bid-result" element={<BidResult />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : null}

        {/* Redirect to the login page if the user is not authenticated */}
        {!user ? <Route path="*" element={<Navigate to="/" />} /> : null}
      </Routes>
    </Router>
  );
}

export default App;
