import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Clock, Users, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />
                    <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl opacity-20 w-[800px] h-[800px] bg-primary" />
                    <div className="absolute left-0 bottom-0 translate-y-1/2 -translate-x-1/2 rounded-full blur-3xl opacity-20 w-[600px] h-[600px] bg-blue-400" />
                </div>

                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        <div className="flex-1 text-center lg:text-left space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium border border-blue-200 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                #1 Hospital Management System
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                                Modern Healthcare <br />
                                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                    For Everyone
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Experience the next generation of healthcare management. Book appointments, track records, and consult with top doctors - all in one place.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300" asChild>
                                    <Link to="/auth">
                                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-2 hover:bg-gray-50/80 transition-all duration-300">
                                    Book Appointment
                                </Button>
                            </div>

                            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-70">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                    <span className="text-sm font-medium">Verified Doctors</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span className="text-sm font-medium">24/7 Support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span className="text-sm font-medium">1M+ Patients</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image / Illustration Placeholder */}
                        <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070"
                                    alt="Doctor with patient"
                                    className="w-full h-auto object-cover"
                                />

                                {/* Floating Cards */}
                                <div className="absolute -left-12 bottom-12 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 hidden md:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Happy Patients</p>
                                            <p className="text-lg font-bold text-gray-900">12k+</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -right-8 top-12 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 hidden md:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Stethoscope className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Expert Doctors</p>
                                            <p className="text-lg font-bold text-gray-900">150+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
