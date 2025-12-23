import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, User, Calendar } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const initialPrescriptions = [
    { id: 1, patient: "Sarah Johnson", medicine: "Amoxicillin 500mg", dosage: "1-1-1", duration: "5 days", date: "2024-03-20", status: "Active" },
    { id: 2, patient: "Mike Brown", medicine: "Paracetamol 650mg", dosage: "1-0-1", duration: "3 days", date: "2024-03-19", status: "Completed" },
    { id: 3, patient: "Emily Davis", medicine: "Cetirizine 10mg", dosage: "0-0-1", duration: "7 days", date: "2024-03-18", status: "Active" },
];

const DoctorPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");

    const [newPrescription, setNewPrescription] = useState({
        patient: "",
        medicine: "",
        dosage: "",
        duration: "",
    });

    const handleAddPrescription = () => {
        if (!newPrescription.patient || !newPrescription.medicine || !newPrescription.dosage) {
            toast({
                title: "Error",
                description: "Patient, Medicine and Dosage are required.",
                variant: "destructive",
            });
            return;
        }

        const prescription = {
            id: prescriptions.length + 1,
            patient: newPrescription.patient,
            medicine: newPrescription.medicine,
            dosage: newPrescription.dosage,
            duration: newPrescription.duration || "N/A",
            date: new Date().toISOString().split('T')[0],
            status: "Active",
        };

        setPrescriptions([prescription, ...prescriptions]);
        setIsAddDialogOpen(false);
        setNewPrescription({
            patient: "",
            medicine: "",
            dosage: "",
            duration: "",
        });

        toast({
            title: "Success",
            description: "Prescription created successfully.",
        });
    };

    const filteredPrescriptions = prescriptions.filter((p) =>
        p.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.medicine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
                    <p className="text-muted-foreground mt-2">Manage patient prescriptions and medications.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Prescription
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Prescription</DialogTitle>
                            <DialogDescription>
                                Prescribe medication for a patient.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="patient" className="text-right">
                                    Patient
                                </Label>
                                <Input
                                    id="patient"
                                    value={newPrescription.patient}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, patient: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Sarah Johnson"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="medicine" className="text-right">
                                    Medicine
                                </Label>
                                <Input
                                    id="medicine"
                                    value={newPrescription.medicine}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, medicine: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Amoxicillin 500mg"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dosage" className="text-right">
                                    Dosage
                                </Label>
                                <Input
                                    id="dosage"
                                    value={newPrescription.dosage}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                                    className="col-span-3"
                                    placeholder="1-0-1"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="duration" className="text-right">
                                    Duration
                                </Label>
                                <Input
                                    id="duration"
                                    value={newPrescription.duration}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                                    className="col-span-3"
                                    placeholder="5 days"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddPrescription}>Create Prescription</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Prescriptions</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search patient..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Medicine</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPrescriptions.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {p.patient}
                                        </div>
                                    </TableCell>
                                    <TableCell>{p.medicine}</TableCell>
                                    <TableCell>{p.dosage}</TableCell>
                                    <TableCell>{p.duration}</TableCell>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={p.status === "Active" ? "default" : "secondary"}>{p.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Details</Button>
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

export default DoctorPrescriptions;
