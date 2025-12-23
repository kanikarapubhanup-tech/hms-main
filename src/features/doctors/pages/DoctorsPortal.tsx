import { useState } from "react";
import { Search, Filter, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialDoctors = [
    { id: 1, name: "Dr. Sarah Wilson", specialty: "Cardiologist", consultationTime: "15 mins", availability: "Available" },
    { id: 2, name: "Dr. James Brown", specialty: "Neurologist", consultationTime: "30 mins", availability: "Busy" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Pediatrician", consultationTime: "20 mins", availability: "Available" },
    { id: 4, name: "Dr. Michael Chen", specialty: "Orthopedic", consultationTime: "25 mins", availability: "On Leave" },
    { id: 5, name: "Dr. Lisa Taylor", specialty: "Dermatologist", consultationTime: "15 mins", availability: "Available" },
];


interface Doctor {
    id: number;
    name: string;
    specialty: string;
    consultationTime: string;
    availability: string;
}

const DoctorsPortal = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const { toast } = useToast();

    const [newDoctor, setNewDoctor] = useState({
        name: "",
        specialty: "",
        consultationTime: "15 mins",
        availability: "Available"
    });

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddDoctor = () => {
        if (!newDoctor.name || !newDoctor.specialty) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const doctor = {
            id: doctors.length + 1,
            name: newDoctor.name,
            specialty: newDoctor.specialty,
            consultationTime: newDoctor.consultationTime,
            availability: newDoctor.availability
        };

        setDoctors([...doctors, doctor]);
        setIsAddDialogOpen(false);
        setNewDoctor({
            name: "",
            specialty: "",
            consultationTime: "15 mins",
            availability: "Available"
        });

        toast({
            title: "Success",
            description: "Doctor added successfully.",
        });
    };

    const handleEditDoctor = () => {
        if (!editingDoctor.name || !editingDoctor.specialty) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        setDoctors(doctors.map(d => d.id === editingDoctor.id ? editingDoctor : d));
        setIsEditDialogOpen(false);
        setEditingDoctor(null);

        toast({
            title: "Success",
            description: "Doctor updated successfully.",
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="page-title">Doctors Portal</h1>
                    <p className="page-subtitle">Manage doctor profiles and schedules</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Doctor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Doctor</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new doctor here.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newDoctor.name}
                                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Dr. John Doe"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="specialty" className="text-right">
                                    Specialty
                                </Label>
                                <Input
                                    id="specialty"
                                    value={newDoctor.specialty}
                                    onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Cardiologist"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                    Time
                                </Label>
                                <Select
                                    value={newDoctor.consultationTime}
                                    onValueChange={(value) => setNewDoctor({ ...newDoctor, consultationTime: value })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10 mins">10 mins</SelectItem>
                                        <SelectItem value="15 mins">15 mins</SelectItem>
                                        <SelectItem value="20 mins">20 mins</SelectItem>
                                        <SelectItem value="30 mins">30 mins</SelectItem>
                                        <SelectItem value="45 mins">45 mins</SelectItem>
                                        <SelectItem value="60 mins">60 mins</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="availability" className="text-right">
                                    Status
                                </Label>
                                <Select
                                    value={newDoctor.availability}
                                    onValueChange={(value) => setNewDoctor({ ...newDoctor, availability: value })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Busy">Busy</SelectItem>
                                        <SelectItem value="On Leave">On Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddDoctor}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Doctor Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Doctor</DialogTitle>
                            <DialogDescription>
                                Update the details of the doctor here.
                            </DialogDescription>
                        </DialogHeader>
                        {editingDoctor && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="edit-name"
                                        value={editingDoctor.name}
                                        onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-specialty" className="text-right">
                                        Specialty
                                    </Label>
                                    <Input
                                        id="edit-specialty"
                                        value={editingDoctor.specialty}
                                        onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-time" className="text-right">
                                        Time
                                    </Label>
                                    <Select
                                        value={editingDoctor.consultationTime}
                                        onValueChange={(value) => setEditingDoctor({ ...editingDoctor, consultationTime: value })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10 mins">10 mins</SelectItem>
                                            <SelectItem value="15 mins">15 mins</SelectItem>
                                            <SelectItem value="20 mins">20 mins</SelectItem>
                                            <SelectItem value="30 mins">30 mins</SelectItem>
                                            <SelectItem value="45 mins">45 mins</SelectItem>
                                            <SelectItem value="60 mins">60 mins</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-availability" className="text-right">
                                        Status
                                    </Label>
                                    <Select
                                        value={editingDoctor.availability}
                                        onValueChange={(value) => setEditingDoctor({ ...editingDoctor, availability: value })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Available">Available</SelectItem>
                                            <SelectItem value="Busy">Busy</SelectItem>
                                            <SelectItem value="On Leave">On Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditDoctor}>Update changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search doctors..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Doctor Name</TableHead>
                                <TableHead>Per Patient Consultation Time</TableHead>
                                <TableHead className="w-[100px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDoctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {doctor.name.split(' ').map(n => n.replace('Dr. ', '')[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{doctor.name}</p>
                                                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{doctor.consultationTime}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { setEditingDoctor(doctor); setIsEditDialogOpen(true); }}>
                                                    Edit Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => {
                                                    setDoctors(doctors.filter(d => d.id !== doctor.id));
                                                    toast({ title: "Success", description: "Doctor deleted successfully." });
                                                }}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorsPortal;
