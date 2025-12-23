import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <div className="pl-64">
        <Navbar userName="Admin User" userRole="Super Admin" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
