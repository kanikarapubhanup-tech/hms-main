import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const PatientLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="patient" />
      <div className="pl-64">
        <Navbar userName="Patient User" userRole="Patient" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
