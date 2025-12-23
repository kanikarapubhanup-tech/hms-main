import { useState } from "react";
import {
    Heart,
    Bone,
    Stethoscope,
    Smile,
    Pill,
    Ambulance,
    Eye,
    Brain,
    Activity,
    Plus,
    Minus,
    Thermometer
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialServices = [
    {
        title: "Cardiology",
        description: "Comprehensive heart care and treatments including advanced diagnostics and surgery.",
        iconName: "Heart",
        icon: Heart,
    },
    {
        title: "Orthopedics",
        description: "Expert care for bones, joints, and muscles with state-of-the-art rehabilitation.",
        iconName: "Bone",
        icon: Bone,
    },
    {
        title: "Pulmonology",
        description: "Specialized treatment for respiratory system disorders and lung health.",
        iconName: "Activity",
        icon: Activity,
    },
    {
        title: "Dental Care",
        description: "Complete dental services for a healthy smile, from checkups to cosmetic procedures.",
        iconName: "Smile",
        icon: Smile,
    },
    {
        title: "Neurology",
        description: "Advanced diagnostics and treatment for complex neurological disorders.",
        iconName: "Brain",
        icon: Brain,
    },
    {
        title: "Ophthalmology",
        description: "Comprehensive eye care, vision correction, and surgical solutions.",
        iconName: "Eye",
        icon: Eye,
    },
    {
        title: "Ambulance",
        description: "24/7 rapid response emergency transportation services equipped with life support.",
        iconName: "Ambulance",
        icon: Ambulance,
    },
    {
        title: "Medicine",
        description: "Primary care and general medicine for all your daily health needs.",
        iconName: "Pill",
        icon: Pill,
    },
];

const iconMap: any = {
    Heart,
    Bone,
    Activity,
    Smile,
    Brain,
    Eye,
    Ambulance,
    Pill,
    Stethoscope,
    Thermometer,
    Plus
};

const ServicesDashboard = () => {
    const [services, setServices] = useState(initialServices);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [newService, setNewService] = useState({
        title: "",
        description: "",
        iconName: "Stethoscope"
    });

    const handleAddService = () => {
        if (!newService.title || !newService.description) {
            toast({
                title: "Error",
                description: "Title and description are required.",
                variant: "destructive",
            });
            return;
        }

        const service = {
            title: newService.title,
            description: newService.description,
            iconName: newService.iconName,
            icon: iconMap[newService.iconName] || Stethoscope,
        };

        setServices([...services, service]);
        setIsAddDialogOpen(false);
        setNewService({
            title: "",
            description: "",
            iconName: "Stethoscope"
        });

        toast({
            title: "Success",
            description: "Service added successfully.",
        });
    };

    return (
        <div className="min-h-screen bg-white py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
                        We Offer Different Services To Improve Your Health
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Top-tier medical services tailored to your needs. Experience healthcare excellence with our specialized departments.
                    </p>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg" className="mt-4">
                                <Plus className="mr-2 h-4 w-4" /> Add New Service
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Service</DialogTitle>
                                <DialogDescription>
                                    Add a new medical service to the dashboard.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={newService.title}
                                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                        className="col-span-3"
                                        placeholder="Pediatrics"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={newService.description}
                                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                        className="col-span-3"
                                        placeholder="Child healthcare..."
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="icon" className="text-right">
                                        Icon
                                    </Label>
                                    <Select
                                        value={newService.iconName}
                                        onValueChange={(value) => setNewService({ ...newService, iconName: value })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(iconMap).map((iconName) => (
                                                <SelectItem key={iconName} value={iconName}>
                                                    {iconName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddService}>Add Service</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="bg-white border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group h-full"
                        >
                            <CardContent className="p-8 flex flex-col items-center text-center h-full">
                                <div className="mb-6 p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                                    <service.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesDashboard;
