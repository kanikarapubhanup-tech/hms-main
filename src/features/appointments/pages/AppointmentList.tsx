import { useState } from "react";
import { Plus, Calendar, List, Droplet, Clock, User, MoreHorizontal, Pencil, Trash, Eye, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AppointmentCalendar from "../components/AppointmentCalendar";
import AppointmentFilters from "../components/AppointmentFilters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Appointment {
  id: number;
  patient: string;
  age: number;
  bloodType: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: string;
  department: string;
}

const initialAppointments: Appointment[] = [
  { id: 1, patient: "Sarah Johnson", age: 34, bloodType: "A+", doctor: "Dr. Sarah Wilson", date: "2024-01-20", time: "09:00 AM", type: "General Checkup", status: "Confirmed", department: "General Medicine" },
  { id: 2, patient: "Michael Brown", age: 52, bloodType: "O-", doctor: "Dr. John Smith", date: "2024-01-20", time: "10:00 AM", type: "Cardiology Consultation", status: "Confirmed", department: "Cardiology" },
  { id: 3, patient: "Emily Davis", age: 8, bloodType: "B+", doctor: "Dr. Emily Chen", date: "2024-01-20", time: "11:00 AM", type: "Pediatric Checkup", status: "Pending", department: "Pediatrics" },
  { id: 4, patient: "James Wilson", age: 45, bloodType: "AB+", doctor: "Dr. Mark Johnson", date: "2024-01-20", time: "02:00 PM", type: "Neurology Follow-up", status: "Confirmed", department: "Neurology" },
  { id: 5, patient: "Lisa Anderson", age: 28, bloodType: "A-", doctor: "Dr. Sarah Wilson", date: "2024-01-21", time: "09:30 AM", type: "Lab Results", status: "Pending", department: "General Medicine" },
  { id: 6, patient: "Robert Taylor", age: 61, bloodType: "O+", doctor: "Dr. John Smith", date: "2024-01-21", time: "11:00 AM", type: "Emergency", status: "Urgent", department: "Cardiology" },
];

const doctors = [
  { name: "Dr. Sarah Wilson", department: "General Medicine" },
  { name: "Dr. John Smith", department: "Cardiology" },
  { name: "Dr. Emily Chen", department: "Pediatrics" },
  { name: "Dr. Mark Johnson", department: "Neurology" },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const appointmentTypes = ["General Checkup", "Consultation", "Follow-up", "Lab Results", "Emergency"];
const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"];

const AppointmentList = () => {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");

  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    patient: "",
    age: "",
    bloodType: "",
    doctor: "",
    time: "",
    type: "",
  });

  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});

  const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Confirmed": return "default";
      case "Pending": return "secondary";
      case "Urgent": return "destructive";
      case "Completed": return "outline";
      default: return "secondary";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.patient || !formData.age || !formData.bloodType || !formData.doctor || !selectedDate || !formData.time || !formData.type) {
      toast.error("Please fill in all fields");
      return;
    }

    const selectedDoctor = doctors.find(d => d.name === formData.doctor);
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      patient: formData.patient,
      age: parseInt(formData.age),
      bloodType: formData.bloodType,
      doctor: formData.doctor,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: formData.time,
      type: formData.type,
      status: "Pending",
      department: selectedDoctor?.department || "General Medicine",
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({ patient: "", age: "", bloodType: "", doctor: "", time: "", type: "" });
    setSelectedDate(undefined);
    setDialogOpen(false);
    toast.success("Appointment created successfully!");
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setEditFormData({
      patient: appointment.patient,
      age: appointment.age.toString(),
      bloodType: appointment.bloodType,
      doctor: appointment.doctor,
      time: appointment.time,
      type: appointment.type,
      date: new Date(appointment.date),
      status: appointment.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAppointment) return;

    if (!editFormData.patient || !editFormData.age || !editFormData.doctor || !editFormData.date) {
      toast.error("Please fill in required fields");
      return;
    }

    const updatedAppointments = appointments.map(apt => {
      if (apt.id === editingAppointment.id) {
        return {
          ...apt,
          patient: editFormData.patient,
          age: parseInt(editFormData.age),
          bloodType: editFormData.bloodType,
          doctor: editFormData.doctor,
          time: editFormData.time,
          type: editFormData.type,
          date: format(editFormData.date, "yyyy-MM-dd"),
          status: editFormData.status
        };
      }
      return apt;
    });

    setAppointments(updatedAppointments);
    setIsEditDialogOpen(false);
    setEditingAppointment(null);
    toast.success("Appointment updated successfully!");
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(a => a.id !== id));
    toast.success("Appointment deleted successfully!");
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setViewingAppointment(appointment);
    setIsViewDialogOpen(true);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || apt.doctor === doctorFilter;

    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const todayAppointments = filteredAppointments.filter(apt => apt.date === format(new Date(), "yyyy-MM-dd"));
  const upcomingAppointments = filteredAppointments.filter(apt => new Date(apt.date) > new Date());

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Manage and schedule patient appointments</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-muted p-1 rounded-lg">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              Calendar
            </Button>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Appointment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient Name</Label>
                    <Input
                      id="patient"
                      placeholder="Enter patient name"
                      value={formData.patient}
                      onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      min="0"
                      max="150"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Appointment Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <Select value={formData.doctor} onValueChange={(value) => setFormData({ ...formData, doctor: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                          {doctor.name} - {doctor.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Appointment</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Appointment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateAppointment} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-patient">Patient Name</Label>
                    <Input id="edit-patient" value={editFormData.patient || ''} onChange={(e) => setEditFormData({ ...editFormData, patient: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-age">Age</Label>
                    <Input id="edit-age" type="number" value={editFormData.age || ''} onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <Select value={editFormData.bloodType} onValueChange={(value) => setEditFormData({ ...editFormData, bloodType: value })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={editFormData.type} onValueChange={(value) => setEditFormData({ ...editFormData, type: value })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <Select value={editFormData.doctor} onValueChange={(value) => setEditFormData({ ...editFormData, doctor: value })}>
                    <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                    <SelectContent>
                      {doctors.map(d => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !editFormData.date && "text-muted-foreground")}>
                          <Calendar className="mr-2 h-4 w-4" />
                          {editFormData.date ? format(editFormData.date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent mode="single" selected={editFormData.date} onSelect={(date) => setEditFormData({ ...editFormData, date })} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Select value={editFormData.time} onValueChange={(value) => setEditFormData({ ...editFormData, time: value })}>
                      <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Update Appointment</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>Full details of the scheduled appointment.</DialogDescription>
              </DialogHeader>
              {viewingAppointment && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-lg">
                    <Avatar className="h-20 w-20 mb-3">
                      <AvatarFallback className="text-xl bg-primary/10 text-primary">
                        {viewingAppointment.patient.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{viewingAppointment.patient}</h3>
                    <p className="text-muted-foreground">{viewingAppointment.age} years old • Blood Type: {viewingAppointment.bloodType}</p>
                    <Badge variant={getStatusVariant(viewingAppointment.status)} className="mt-2">
                      {viewingAppointment.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase">Doctor</Label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-medium">{viewingAppointment.doctor}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase">Department</Label>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{viewingAppointment.department}</Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase">Date</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{viewingAppointment.date}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase">Time</Label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{viewingAppointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 pt-4 border-t">
                    <Label className="text-muted-foreground text-xs uppercase">Type</Label>
                    <p className="text-base">{viewingAppointment.type}</p>
                  </div>
                </div>
              )}
              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="secondary" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <AppointmentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        doctorFilter={doctorFilter}
        onDoctorFilterChange={setDoctorFilter}
        doctors={doctors}
      />

      {
        viewMode === "list" ? (
          <Card>
            <CardHeader className="pb-3">
              <Tabs defaultValue="today">
                <TabsList>
                  <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
                  <TabsTrigger value="all">All ({filteredAppointments.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-3 mt-4">
                  {todayAppointments.length > 0 ? (
                    todayAppointments.map((apt) => (
                      <AppointmentCard
                        key={apt.id}
                        appointment={apt}
                        getStatusVariant={getStatusVariant}
                        onEdit={() => handleEditAppointment(apt)}
                        onDelete={() => handleDeleteAppointment(apt.id)}
                        onView={() => handleViewAppointment(apt)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No appointments for today</div>
                  )}
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-3 mt-4">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((apt) => (
                      <AppointmentCard
                        key={apt.id}
                        appointment={apt}
                        getStatusVariant={getStatusVariant}
                        onEdit={() => handleEditAppointment(apt)}
                        onDelete={() => handleDeleteAppointment(apt.id)}
                        onView={() => handleViewAppointment(apt)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No upcoming appointments</div>
                  )}
                </TabsContent>

                <TabsContent value="all" className="space-y-3 mt-4">
                  {filteredAppointments.map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      getStatusVariant={getStatusVariant}
                      onEdit={() => handleEditAppointment(apt)}
                      onDelete={() => handleDeleteAppointment(apt.id)}
                      onView={() => handleViewAppointment(apt)}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        ) : (
          <AppointmentCalendar appointments={filteredAppointments} />
        )
      }
    </div >
  );
};

interface AppointmentCardProps {
  appointment: Appointment;
  getStatusVariant: (status: string) => "default" | "secondary" | "destructive" | "outline";
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const AppointmentCard = ({ appointment, getStatusVariant, onEdit, onDelete, onView }: AppointmentCardProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/30 transition-colors gap-4">
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarFallback className="bg-primary/10 text-primary">
          {appointment.patient.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium cursor-pointer hover:underline" onClick={onView}>{appointment.patient}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm text-muted-foreground">{appointment.age} years</span>
          <span className="flex items-center gap-1 text-sm font-medium text-destructive">
            <Droplet className="h-3 w-3" />
            {appointment.bloodType}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{appointment.type}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            {appointment.doctor}
          </span>
          <Badge variant="outline" className="text-xs">{appointment.department}</Badge>
        </div>
      </div>
    </div>
    <div className="text-left sm:text-right">
      <div className="flex sm:justify-end items-center gap-1 text-sm">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {appointment.date}
      </div>
      <div className="flex sm:justify-end items-center gap-1 text-sm text-muted-foreground mt-1">
        <Clock className="h-3 w-3" />
        {appointment.time}
      </div>
      <div className="flex items-center gap-2 mt-2 justify-end">
        <Badge variant={getStatusVariant(appointment.status)}>
          {appointment.status}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onView}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={onDelete}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
);

export default AppointmentList;
