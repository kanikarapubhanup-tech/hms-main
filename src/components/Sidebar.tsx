import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Pill,
  FlaskConical,
  Receipt,
  Settings,
  LogOut,
  UserCog,
  Stethoscope,
  Activity,
  Building,
  LayoutTemplate,
  CreditCard,
  Package,
  Video,
  Droplet,
  BedDouble,
  BarChart,
  Bell,
  Landmark,
  MessageCircle,
  Scan,
  Target,
  Clock,
  Briefcase,
  Microscope,
  Mail,
  MessageSquare,
  Clipboard,
  PhoneCall,
  Syringe,
  Skull
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  role: "admin" | "doctor" | "reception" | "patient";
}

const navItemsByRole: Record<string, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Front Office", href: "/admin/front-office", icon: Building },
    { label: "Front CMS", href: "/admin/front-cms", icon: LayoutTemplate },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "IPD – Patient In", href: "/admin/ipd", icon: BedDouble },
    { label: "OPD – Patient Out", href: "/admin/opd", icon: Activity },
    { label: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
    { label: "Pathology", href: "/admin/pathology", icon: Microscope },
    { label: "Radiology", href: "/admin/radiology", icon: Scan },
    { label: "Blood Banks", href: "/admin/blood-bank", icon: Droplet },
    { label: "Live Consultancy", href: "/admin/live-consultancy", icon: Video },
    { label: "Inventory", href: "/admin/inventory", icon: Package },
    { label: "Bed Management", href: "/admin/bed-management", icon: BedDouble },
    { label: "Hospital Charges", href: "/admin/charges", icon: CreditCard },
    { label: "Billings", href: "/admin/billing", icon: Receipt },
    { label: "Finances", href: "/admin/finances", icon: Landmark },
    { label: "Patient Smart Cards", href: "/admin/smart-cards", icon: CreditCard },
    { label: "Lab Reports", href: "/admin/lab", icon: FlaskConical },
    { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { label: "Messages", href: "/admin/mail", icon: Mail },
    { label: "SMS", href: "/admin/sms", icon: MessageSquare },
    { label: "Vaccinations", href: "/admin/vaccinations", icon: Syringe },
    { label: "Death Records", href: "/admin/death-records", icon: Skull },
    { label: "RFID Scanner", href: "/admin/rfid", icon: Scan },
    { label: "HR Management", href: "/admin/hr", icon: Users },
    { label: "Marketing", href: "/admin/marketing", icon: Target },
    { label: "Diagnosis", href: "/admin/diagnosis", icon: Stethoscope },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Documents", href: "/admin/documents", icon: FileText },
    { label: "Notices", href: "/admin/notices", icon: Bell },
    { label: "Enquiries", href: "/admin/enquiries", icon: PhoneCall },
    { label: "Meeting Status", href: "/admin/meeting-status", icon: Users },
    { label: "Reports", href: "/admin/reports", icon: Clipboard },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
    { label: "My Patients", href: "/doctor/patients", icon: Users },
    { label: "Schedule", href: "/doctor/schedule", icon: Calendar },
    { label: "Prescriptions", href: "/doctor/prescriptions", icon: FileText },
    { label: "Lab Results", href: "/doctor/lab", icon: FlaskConical },
    { label: "Settings", href: "/doctor/settings", icon: Settings },
  ],
  reception: [
    { label: "Dashboard", href: "/reception/dashboard", icon: LayoutDashboard },
    { label: "Patients", href: "/reception/patients", icon: Users },
    { label: "Appointments", href: "/reception/appointments", icon: Calendar },
    { label: "Billing", href: "/reception/billing", icon: Receipt },
    { label: "Settings", href: "/reception/settings", icon: Settings },
  ],
  patient: [
    { label: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
    { label: "Appointments", href: "/patient/appointments", icon: Calendar },
    { label: "Medical Records", href: "/patient/records", icon: FileText },
    { label: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
    { label: "Lab Results", href: "/patient/lab", icon: FlaskConical },
    { label: "Billing", href: "/patient/billing", icon: Receipt },
    { label: "Settings", href: "/patient/settings", icon: Settings },
  ],
};

const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const navItems = navItemsByRole[role] || [];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <Activity className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">MediCare</h1>
            <p className="text-xs text-sidebar-foreground/60">Hospital Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "nav-link",
                  isActive && "nav-link-active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <Link
            to="/login"
            className="nav-link text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
