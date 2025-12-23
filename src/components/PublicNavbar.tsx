import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu, Globe, Stethoscope } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const PublicNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Doctors", href: "/doctors" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const features = [
        "Working Hours",
        "Testimonials",
        "Terms of Service",
        "Privacy Policy",
    ];

    const featureContent: Record<string, { title: string; content: React.ReactNode }> = {
        "Working Hours": {
            title: "Working Hours",
            content: (
                <div className="space-y-4 text-sm text-slate-600">
                    <p>Our hospital and digital services operate with a commitment to accessibility and patient care.</p>
                    <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-semibold text-slate-900 mb-1">Hospital OPD:</h4>
                            <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                            <p>Sunday: Emergency Services Only</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-semibold text-slate-900 mb-1">Emergency Department:</h4>
                            <p>24/7 Available</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-semibold text-slate-900 mb-1">Online Portal (Appointments, Reports, Billing):</h4>
                            <p>24/7 Access</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-semibold text-slate-900 mb-1">Customer Support:</h4>
                            <p>Monday – Saturday: 9:00 AM – 8:00 PM.</p>
                        </div>
                    </div>
                </div>
            )
        },
        "Testimonials": {
            title: "Testimonials",
            content: (
                <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">What our patients and staff say about us</p>
                    <div className="space-y-4">
                        <blockquote className="relative p-4 bg-slate-50 rounded-r-xl border-l-4 border-primary">
                            <p className="italic text-slate-700 mb-2">“The Med AI hospital system made appointments and reports extremely easy to access. Very user-friendly!”</p>
                            <footer className="text-xs font-semibold text-slate-900">— Ramesh Kumar, Patient</footer>
                        </blockquote>
                        <blockquote className="relative p-4 bg-slate-50 rounded-r-xl border-l-4 border-blue-500">
                            <p className="italic text-slate-700 mb-2">“Patient records and billing are well organized. It saves a lot of time for doctors and staff.”</p>
                            <footer className="text-xs font-semibold text-slate-900">— Dr. Anjali Rao</footer>
                        </blockquote>
                        <blockquote className="relative p-4 bg-slate-50 rounded-r-xl border-l-4 border-green-500">
                            <p className="italic text-slate-700 mb-2">“The dashboard and alerts help us manage OPD and IPD patients efficiently.”</p>
                            <footer className="text-xs font-semibold text-slate-900">— Hospital Administrator</footer>
                        </blockquote>
                    </div>
                </div>
            )
        },
        "Terms of Service": {
            title: "Terms of Service",
            content: (
                <div className="space-y-4 text-sm text-slate-600">
                    <p>By using our hospital management system and services, you agree to the following:</p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                        <li>Users must provide accurate and complete information</li>
                        <li>The system is intended only for medical and administrative use</li>
                        <li>Unauthorized access, misuse, or data manipulation is strictly prohibited</li>
                        <li>The hospital reserves the right to update features or policies without prior notice</li>
                        <li>Services may be temporarily unavailable due to maintenance or technical updates.</li>
                    </ul>
                </div>
            )
        },
        "Privacy Policy": {
            title: "Privacy Policy",
            content: (
                <div className="space-y-4 text-sm text-slate-600">
                    <p>We value your privacy and are committed to protecting your personal and medical data.</p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                        <li>Patient data is collected only for treatment, billing, and hospital operations</li>
                        <li>All medical records are stored securely with restricted access</li>
                        <li>We do not share personal data with third parties without consent, except when legally required</li>
                        <li>Advanced security measures are used to protect against unauthorized access</li>
                        <li>Users can request data correction or deletion as per hospital policy.</li>
                    </ul>
                </div>
            )
        }
    };

    const handleFeatureClick = (feature: string) => {
        if (featureContent[feature]) {
            setSelectedFeature(feature);
            setIsFeatureDialogOpen(true);
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/70 backdrop-blur-md shadow-md border-b border-white/20"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Stethoscope className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                MediCare
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="px-5 py-2.5 text-base font-medium text-gray-700 hover:text-primary rounded-full hover:bg-primary/5 transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Features Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 px-5 py-2.5 text-base font-medium text-gray-700 hover:text-primary rounded-full hover:bg-primary/5 transition-all duration-200 outline-none">
                                    Our Features <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-white/20">
                                    {features.map((feature) => (
                                        <DropdownMenuItem
                                            key={feature}
                                            onClick={() => handleFeatureClick(feature)}
                                            className="cursor-pointer hover:bg-primary/5 focus:bg-primary/5 text-base py-2.5"
                                        >
                                            {feature}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            {/* Language Selector */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2 rounded-full hover:bg-primary/5 text-base px-4">
                                        <Globe className="h-4 w-4" />
                                        <span>English</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>English</DropdownMenuItem>
                                    <DropdownMenuItem>Spanish</DropdownMenuItem>
                                    <DropdownMenuItem>French</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Login Button */}
                            <Button
                                onClick={() => navigate("/auth")}
                                size="lg"
                                className="rounded-full px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                            >
                                Sign In
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <div className="flex flex-col gap-4 mt-8">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-lg font-medium text-gray-700 hover:text-primary px-2 py-1"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <div className="h-px bg-gray-100 my-2" />
                                    <p className="text-sm font-medium text-muted-foreground px-2">Our Features</p>
                                    {features.map((feature) => (
                                        <button
                                            key={feature}
                                            onClick={() => handleFeatureClick(feature)}
                                            className="text-left text-base text-gray-600 hover:text-primary px-4 py-1"
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                    <div className="h-px bg-gray-100 my-2" />
                                    <Button onClick={() => navigate("/auth")} className="w-full rounded-full">
                                        Sign In
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>

            <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">
                            {selectedFeature && featureContent[selectedFeature]?.title}
                        </DialogTitle>
                        <DialogDescription className="hidden">
                            Feature details
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {selectedFeature && featureContent[selectedFeature]?.content}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PublicNavbar;
