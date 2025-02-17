import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserDashboard } from "./pages/user/UserDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard"; 
import { Signin } from "./pages/index/Signin";
import { Signup } from "./pages/index/Signup";
import { Me } from "./components/Me";
import { Toaster } from "sonner";

function DashboardRedirect() {
  const role = localStorage.getItem("role");
  if (role === "admin") return <Navigate to="/admin/dashboard" />;
  return <Navigate to="/user/dashboard" />;
}

function App() {
  return (
    <div className="bg-black">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Me/>}/>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
