import {
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  BedDouble,
  Receipt,
  TestTube,
  Pill,
  Briefcase,
  Calculator,
  CreditCard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const recentPatients = [
  { id: 1, name: "Sarah Johnson", age: 32, condition: "Regular Checkup", status: "Waiting", time: "9:00 AM" },
  { id: 2, name: "Michael Brown", age: 45, condition: "Cardiology", status: "In Progress", time: "9:30 AM" },
  { id: 3, name: "Emily Davis", age: 28, condition: "Dermatology", status: "Completed", time: "10:00 AM" },
  { id: 4, name: "James Wilson", age: 55, condition: "Orthopedics", status: "Waiting", time: "10:30 AM" },
  { id: 5, name: "Lisa Anderson", age: 38, condition: "General Medicine", status: "Waiting", time: "11:00 AM" },
];

const todaysDoctors = [
  { id: 1, name: "Dr. Sarah Wilson", specialty: "Cardiology", patients: 12, status: "Available" },
  { id: 2, name: "Dr. John Smith", specialty: "Orthopedics", patients: 8, status: "Busy" },
  { id: 3, name: "Dr. Emily Chen", specialty: "Pediatrics", patients: 15, status: "Available" },
  { id: 4, name: "Dr. Mark Johnson", specialty: "Neurology", patients: 6, status: "On Leave" },
];




const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Waiting": return "secondary";
    case "In Progress": return "default";
    case "Completed": return "outline";
    case "Available": return "default";
    case "Busy": return "destructive";
    case "On Leave": return "secondary";
    default: return "secondary";
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Admins", value: "4", icon: Users },
    { title: "Available Beds", value: "45", icon: BedDouble, onClick: () => navigate("/admin/bed-management") },
    { title: "Invoice Amount (₹)", value: "₹ 1,24,500", icon: Receipt },
    { title: "Accountants", value: "8", icon: Calculator },
    { title: "Doctors", value: "48", icon: Stethoscope },
    { title: "Bill Amount (₹)", value: "₹ 8,45,000", icon: DollarSign },
    { title: "Lab Technicians", value: "12", icon: TestTube },
    { title: "Patients", value: "2,847", icon: Users },
    { title: "Payment Amount (₹)", value: "₹ 6,50,000", icon: CreditCard },
    { title: "Pharmacists", value: "6", icon: Pill },
    { title: "Nurses", value: "32", icon: Briefcase }, // approximates for visual
    { title: "Advance Paid Amount (₹)", value: "₹ 1,50,000", icon: DollarSign },
  ];

  return (
    <div className="space-y-6 animate-fade-in p-2">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`border-none shadow-sm hover:shadow-md transition-shadow ${stat.onClick ? 'cursor-pointer' : ''}`}
            onClick={stat.onClick ? stat.onClick : undefined}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg text-foreground/90">{stat.title}</p>
                <p className="text-2xl font-bold mt-2 text-primary">{stat.value}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid (Keeping existing tables as they are useful) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2 shadow-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Today's Appointments</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/appointments")}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years • {patient.condition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{patient.time}</span>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctors On Duty */}
        <Card className="shadow-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Doctors On Duty</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysDoctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusBadgeVariant(doctor.status)} className="text-xs">
                      {doctor.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
