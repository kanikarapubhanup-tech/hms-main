import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Bed, Stethoscope, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
    {
        label: "Happy Patients",
        value: "1500+",
        icon: Users,
        color: "text-orange-500",
        bg: "bg-orange-50",
        shadow: "shadow-orange-100",
    },
    {
        label: "Patients Beds",
        value: "250",
        icon: Bed,
        color: "text-green-500",
        bg: "bg-green-50",
        shadow: "shadow-green-100",
    },
    {
        label: "Doctors & Nurses",
        value: "120+",
        icon: Stethoscope,
        color: "text-red-500",
        bg: "bg-red-50",
        shadow: "shadow-red-100",
    },
    {
        label: "Years Experience",
        value: "20+",
        icon: Clock,
        color: "text-blue-500",
        bg: "bg-blue-50",
        shadow: "shadow-blue-100",
    },
];

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm font-medium text-muted-foreground animate-fade-in-up">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-primary font-semibold">About Us</span>
                </nav>

                {/* Heading */}
                <div className="mb-12 md:mb-16 text-center md:text-left animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        About Us
                    </h1>
                    <div className="h-1 w-20 bg-primary mt-4 rounded-full mx-auto md:mx-0 opacity-80" />
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 animate-fade-in-up delay-100">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className={`border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden ${stat.shadow}`}
                        >
                            <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                                <div className={`p-4 rounded-full mb-4 ${stat.bg}`}>
                                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                </div>
                                <h3 className={`text-4xl font-bold mb-2 ${stat.color}`}>
                                    {stat.value}
                                </h3>
                                <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">
                                    {stat.label}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* About For HMS Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 animate-fade-in-up delay-200">
                    {/* Text Content */}
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            About For HMS
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            MediCare Hospital Management System is dedicated to providing top-tier healthcare solutions.
                            Our facility is equipped with state-of-the-art technology, covering everything from advanced
                            diagnosis to efficient blood bank management. We pride ourselves on our team of highly
                            skilled doctors and compassionate nurses who work round the clock to ensure patient well-being.
                            With integrated smart tracking and seamless appointment systems, we prioritize both
                            operational efficiency and patient comfort.
                        </p>

                        <Button
                            onClick={() => navigate("/patient/appointments")}
                            size="lg"
                            className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Book Appointment
                        </Button>
                    </div>

                    {/* Image Placeholder - A clean illustration or medical image would go here */}
                    <div className="flex-1 relative w-full aspect-video lg:aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
                            alt="Hospital Building"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
