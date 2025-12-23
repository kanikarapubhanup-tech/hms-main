import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
    {
        icon: Phone,
        title: "Phone",
        value: "+91 9876543210",
        subtitle: "Call Today",
        color: "text-blue-500",
        bg: "bg-blue-50",
        hoverBg: "group-hover:bg-blue-100",
    },
    {
        icon: Mail,
        title: "Email",
        value: "cityhospital@gmail.com",
        subtitle: "Contact Hospital",
        color: "text-orange-500",
        bg: "bg-orange-50",
        hoverBg: "group-hover:bg-orange-100",
    },
    {
        icon: Clock,
        title: "Open Hours",
        value: "9 AM to 9 PM",
        subtitle: "Every Day",
        color: "text-green-500",
        bg: "bg-green-50",
        hoverBg: "group-hover:bg-green-100",
    },
    {
        icon: MapPin,
        title: "Location",
        value: "16/A Saint Joseph Park",
        subtitle: "Find Us",
        color: "text-red-500",
        bg: "bg-red-50",
        hoverBg: "group-hover:bg-red-100",
    },
];

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-slate-500">
                        We are here to help. Reach out to us for any queries or assistance.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {contactInfo.map((info, index) => (
                        <Card
                            key={index}
                            className="group border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden bg-white animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                                <div className={`p-4 rounded-full mb-6 ${info.bg} ${info.hoverBg} transition-colors duration-300`}>
                                    <info.icon className={`h-8 w-8 ${info.color}`} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                    {info.title}
                                </h3>
                                <p className="text-lg font-bold text-slate-800 mb-1">
                                    {info.value}
                                </p>
                                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                                    {info.subtitle}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Map Placeholder or additional form space could go here */}

            </div>
        </div>
    );
};

export default ContactPage;
