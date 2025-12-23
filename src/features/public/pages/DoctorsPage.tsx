import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Clock, Star, MapPin } from "lucide-react";

// Mock data for doctors
const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Wilson",
        specialty: "Cardiologist",
        department: "Cardiology",
        experience: "12 Years",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
        availability: "Available Today",
        location: "Block A, Floor 2"
    },
    {
        id: 2,
        name: "Dr. James Brown",
        specialty: "Neurologist",
        department: "Neurology",
        experience: "15 Years",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        availability: "Available Tomorrow",
        location: "Block B, Floor 1"
    },
    {
        id: 3,
        name: "Dr. Emily Davis",
        specialty: "Pediatrician",
        department: "Pediatrics",
        experience: "8 Years",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        availability: "Available Today",
        location: "Block C, Floor 1"
    },
    {
        id: 4,
        name: "Dr. Michael Chen",
        specialty: "Orthopedic",
        department: "Orthopedics",
        experience: "20 Years",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
        availability: "Next Available: Mon",
        location: "Block A, Floor 3"
    },
    {
        id: 5,
        name: "Dr. Lisa Taylor",
        specialty: "Dermatologist",
        department: "Dermatology",
        experience: "10 Years",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300",
        availability: "Available Today",
        location: "Block B, Floor 2"
    },
    {
        id: 6,
        name: "Dr. Robert Wilson",
        specialty: "Ophthalmologist",
        department: "Ophthalmology",
        experience: "14 Years",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
        availability: "Available Today",
        location: "Block C, Floor 2"
    }
];

const DoctorsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Meet Our Specialists
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Our team of expert doctors is dedicated to providing the best medical care.
                        Book an appointment with our specialists today.
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor, index) => (
                        <Card
                            key={doctor.id}
                            className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-semibold text-slate-700">{doctor.rating}</span>
                                </div>
                                {doctor.availability.includes("Today") && (
                                    <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                                        {doctor.availability}
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-6">
                                <div className="mb-4">
                                    <Badge variant="secondary" className="mb-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border-none">
                                        {doctor.specialty}
                                    </Badge>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {doctor.name}
                                    </h3>
                                    <div className="flex items-center text-sm text-slate-500 mb-4 gap-4">
                                        <span className="flex items-center gap-1">
                                            <Stethoscope className="w-4 h-4" /> {doctor.experience}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {doctor.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => navigate("/patient/appointments")}
                                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-200"
                                    >
                                        Book Appointment
                                    </Button>
                                    <Button variant="outline" className="px-3 rounded-xl border-slate-200 hover:bg-slate-50">
                                        Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DoctorsPage;
