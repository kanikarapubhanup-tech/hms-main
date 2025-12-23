import { 
  Users, 
  Calendar, 
  Clock,
  FileText,
  TrendingUp,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const todayStats = [
  { title: "Today's Patients", value: "12", icon: Users, color: "text-primary" },
  { title: "Pending Consultations", value: "5", icon: Clock, color: "text-warning" },
  { title: "Completed", value: "7", icon: Activity, color: "text-success" },
  { title: "Prescriptions Written", value: "9", icon: FileText, color: "text-accent-foreground" },
];

const upcomingAppointments = [
  { id: 1, patient: "John Smith", time: "10:00 AM", type: "Follow-up", status: "Confirmed" },
  { id: 2, patient: "Mary Johnson", time: "10:30 AM", type: "New Consultation", status: "Confirmed" },
  { id: 3, patient: "David Brown", time: "11:00 AM", type: "Lab Results", status: "Waiting" },
  { id: 4, patient: "Sarah Davis", time: "11:30 AM", type: "Routine Check", status: "Confirmed" },
  { id: 5, patient: "Mike Wilson", time: "12:00 PM", type: "Follow-up", status: "Pending" },
];

const recentPatients = [
  { id: 1, name: "Anna Thompson", age: 34, lastVisit: "Today", condition: "Hypertension", progress: 75 },
  { id: 2, name: "James Clark", age: 52, lastVisit: "Yesterday", condition: "Diabetes Type 2", progress: 60 },
  { id: 3, name: "Emma White", age: 28, lastVisit: "2 days ago", condition: "Migraine", progress: 90 },
];

const DoctorDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Good Morning, Dr. Wilson</h1>
        <p className="page-subtitle">You have 12 patients scheduled for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((stat) => (
          <Card key={stat.title} className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
              </div>
            </CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {apt.patient.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{apt.patient}</p>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{apt.time}</p>
                    <Badge 
                      variant={apt.status === "Confirmed" ? "default" : apt.status === "Waiting" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {apt.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Patient Progress
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {patient.age} yrs • {patient.condition}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{patient.lastVisit}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={patient.progress} className="flex-1" />
                    <span className="text-sm font-medium text-success">{patient.progress}%</span>
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

export default DoctorDashboard;
