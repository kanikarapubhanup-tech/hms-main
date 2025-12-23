import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

interface AppointmentCalendarProps {
    appointments: Appointment[];
}

const AppointmentCalendar = ({ appointments }: AppointmentCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const today = () => setCurrentMonth(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="border rounded-lg bg-background shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">
                        {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <Button variant="outline" size="sm" onClick={today}>Today</Button>
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 border-b bg-muted/20">
                {weekDays.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-fr">
                {days.map((day, dayIdx) => {
                    const dayAppointments = appointments.filter(apt => isSameDay(parseISO(apt.date), day));
                    const isToday = isSameDay(day, new Date());

                    return (
                        <div
                            key={day.toString()}
                            className={`min-h-[120px] p-2 border-b border-r relative group transition-colors hover:bg-muted/5
                                ${!isSameMonth(day, monthStart) ? "bg-muted/10 text-muted-foreground" : ""}
                                ${dayIdx % 7 === 0 ? "border-l-0" : ""}
                                ${dayIdx % 7 === 6 ? "border-r-0" : ""}
                            `}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span
                                    className={`
                                        text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                                        ${isToday ? "bg-primary text-primary-foreground" : ""}
                                    `}
                                >
                                    {format(day, dateFormat)}
                                </span>
                                {dayAppointments.length > 0 && (
                                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                                        {dayAppointments.length}
                                    </Badge>
                                )}
                            </div>

                            <div className="space-y-1">
                                {dayAppointments.slice(0, 3).map((apt) => (
                                    <AppointmentItem key={apt.id} appointment={apt} />
                                ))}
                                {dayAppointments.length > 3 && (
                                    <div className="text-xs text-muted-foreground text-center pt-1">
                                        + {dayAppointments.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const AppointmentItem = ({ appointment }: { appointment: Appointment }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`
                        text-xs p-1.5 rounded cursor-pointer truncate border border-l-2 transition-all hover:scale-[1.02] hover:shadow-sm
                        ${appointment.status === "Confirmed" ? "bg-blue-50/50 border-blue-200 border-l-blue-500 text-blue-700" :
                            appointment.status === "Urgent" ? "bg-red-50/50 border-red-200 border-l-red-500 text-red-700" :
                                appointment.status === "Completed" ? "bg-green-50/50 border-green-200 border-l-green-500 text-green-700" :
                                    "bg-gray-50/50 border-gray-200 border-l-gray-500 text-gray-700"}
                    `}
                >
                    <div className="font-semibold truncate">{appointment.patient}</div>
                    <div className="flex items-center gap-1 opacity-80 text-[10px]">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                        <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                {appointment.patient.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-bold">{appointment.patient}</h3>
                            <div className="flex gap-2 text-sm text-muted-foreground">
                                <span>{appointment.age} yrs</span>
                                <span>•</span>
                                <span>{appointment.bloodType}</span>
                            </div>
                        </div>
                        <Badge variant={appointment.status === "Urgent" ? "destructive" : "default"} className="ml-auto">
                            {appointment.status}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Doctor</label>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                <span className="font-medium">{appointment.doctor}</span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6">{appointment.department}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="font-medium">{appointment.date} at {appointment.time}</span>
                            </div>
                        </div>
                        <div className="col-span-2 space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Type</label>
                            <p className="font-medium">{appointment.type}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentCalendar;
