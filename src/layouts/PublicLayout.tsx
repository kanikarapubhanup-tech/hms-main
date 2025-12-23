import { Outlet } from "react-router-dom";
import PublicNavbar from "@/components/PublicNavbar";

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <PublicNavbar />
            <main className="relative flex min-h-screen flex-col">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
