import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
import DoctorLayout from "@/layouts/DoctorLayout";
import PatientLayout from "@/layouts/PatientLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Auth Pages
import AuthPage from "@/features/auth/pages/AuthPage";
import AdminLogin from "@/features/admin/pages/AdminLogin";

// Admin Pages
import AdminDashboard from "@/features/admin/pages/Dashboard";

// Patient Pages
import PatientList from "@/features/patients/pages/PatientList";
import PatientDashboard from "@/features/patients/pages/PatientDashboard";
import PatientPrescriptions from "@/features/patients/pages/PatientPrescriptions";
import PatientLabResults from "@/features/patients/pages/PatientLabResults";
import PatientBilling from "@/features/patients/pages/PatientBilling";

// Doctor Pages
import DoctorDashboard from "@/features/doctors/pages/DoctorDashboard";

// Appointment Pages
import AppointmentList from "@/features/appointments/pages/AppointmentList";

// New Feature Pages
import RFIDScanner from "@/features/rfid/pages/RFIDScanner";
import HRManagement from "@/features/hr/pages/HRManagement";
import AgentTracking from "@/features/marketing/pages/AgentTracking";
import ServicesDashboard from "@/features/services/pages/ServicesDashboard";
import IPDPortal from "@/features/ipd/pages/IPDPortal";
import OPDPortal from "@/features/opd/pages/OPDPortal";
import DoctorsPortal from "@/features/doctors/pages/DoctorsPortal";
import BloodBankPortal from "@/features/blood-bank/pages/BloodBankPortal";
import BedManagement from "@/features/bed-management/pages/BedManagement";
import RadiologyPortal from "@/features/radiology/pages/RadiologyPortal";
import PharmacyPortal from "@/features/pharmacy/pages/PharmacyPortal";
import SMSPortal from "@/features/sms/pages/SMSPortal";
import MailPortal from "@/features/mail/pages/MailPortal";
import VaccinationPortal from "@/features/vaccinations/pages/VaccinationPortal";
import DeathRecordsPortal from "@/features/death-records/pages/DeathRecordsPortal";
import Settings from "@/features/settings/pages/Settings";
import LandingPage from "@/features/public/pages/LandingPage";
import AboutPage from "@/features/public/pages/AboutPage";
import DoctorsPage from "@/features/public/pages/DoctorsPage";
import ContactPage from "@/features/public/pages/ContactPage";

// Doctor & Patient Feature Pages
import DoctorPrescriptions from "@/features/doctors/pages/DoctorPrescriptions";
import DoctorLabResults from "@/features/doctors/pages/DoctorLabResults";
import DoctorSettings from "@/features/doctors/pages/DoctorSettings";
import MedicalRecords from "@/features/patients/pages/MedicalRecords";
import PatientSettings from "@/features/patients/pages/PatientSettings";

// Feature Pages
import FrontOffice from "@/features/front-office/pages/FrontOffice";
import FrontCMS from "@/features/front-cms/pages/FrontCMS";
import HospitalCharges from "@/features/hospital-charges/pages/HospitalCharges";
import Inventory from "@/features/inventory/pages/Inventory";
import LiveConsultancy from "@/features/live-consultancy/pages/LiveConsultancy";
import Billing from "@/features/billing/pages/Billing";
import Finances from "@/features/finances/pages/Finances";
import Pathology from "@/features/pathology/pages/Pathology";
import LabReports from "@/features/lab-reports/pages/LabReports";
import Analytics from "@/features/analytics/pages/Analytics";
import Notices from "@/features/notices/pages/Notices";
import Enquiries from "@/features/enquiries/pages/Enquiries";
import MeetingStatus from "@/features/meeting-status/pages/MeetingStatus";
import UsersManagement from "@/features/users/pages/UsersManagement";
import Documents from "@/features/documents/pages/Documents";
import Prescriptions from "@/features/prescriptions/pages/Prescriptions";
import Diagnosis from "@/features/diagnosis/pages/Diagnosis";
import SmartCardPortal from "@/features/smart-cards/pages/SmartCardPortal";
import ReportsPortal from "@/features/reports/pages/ReportsPortal";

// Placeholder pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Placeholder component for pages not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground">This page is under development</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/register" element={<Navigate to="/auth" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="doctors" element={<DoctorsPortal />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="appointments" element={<AppointmentList />} />
            <Route path="ipd" element={<IPDPortal />} />
            <Route path="opd" element={<OPDPortal />} />
            <Route path="front-office" element={<FrontOffice />} />
            <Route path="front-cms" element={<FrontCMS />} />
            <Route path="charges" element={<HospitalCharges />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="live-consultancy" element={<LiveConsultancy />} />
            <Route path="blood-bank" element={<BloodBankPortal />} />
            <Route path="bed-management" element={<BedManagement />} />
            <Route path="radiology" element={<RadiologyPortal />} />
            <Route path="services" element={<ServicesDashboard />} />
            <Route path="pathology" element={<Pathology />} />
            <Route path="rfid" element={<RFIDScanner />} />
            <Route path="hr" element={<HRManagement />} />
            <Route path="marketing" element={<AgentTracking />} />
            <Route path="billing" element={<Billing />} />
            <Route path="finances" element={<Finances />} />
            <Route path="pharmacy" element={<PharmacyPortal />} />
            <Route path="lab" element={<LabReports />} />
            <Route path="reports" element={<ReportsPortal />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notices" element={<Notices />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="meeting-status" element={<MeetingStatus />} />
            <Route path="documents" element={<Documents />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="diagnosis" element={<Diagnosis />} />
            <Route path="smart-cards" element={<SmartCardPortal />} />

            <Route path="sms" element={<SMSPortal />} />
            <Route path="mail" element={<MailPortal />} />
            <Route path="vaccinations" element={<VaccinationPortal />} />
            <Route path="death-records" element={<DeathRecordsPortal />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Doctor Routes */}
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<Navigate to="/doctor/dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="schedule" element={<AppointmentList />} />
            <Route path="prescriptions" element={<DoctorPrescriptions />} />
            <Route path="lab" element={<DoctorLabResults />} />
            <Route path="settings" element={<DoctorSettings />} />
          </Route>

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<Navigate to="/patient/dashboard" replace />} />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments" element={<AppointmentList />} />
            <Route path="records" element={<MedicalRecords />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="lab" element={<PatientLabResults />} />
            <Route path="billing" element={<PatientBilling />} />
            <Route path="settings" element={<PatientSettings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
