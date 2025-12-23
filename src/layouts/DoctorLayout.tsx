import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const DoctorLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="doctor" />
      <div className="pl-64">
        <Navbar userName="Dr. Sarah Wilson" userRole="Doctor" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
