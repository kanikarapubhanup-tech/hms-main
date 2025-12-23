import { useState } from "react";
import { Search, Filter, MoreHorizontal, Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

import { INDIAN_STATES, DISTRICTS, MANDALS } from "@/data/indianAddressData";

const initialOpdPatients = [
    {
        opdNo: "OPD-2024-101",
        name: "David Wilson",
        age: "29",
        gender: "Male",
        doctor: "Dr. Smith",
        appointmentDate: "2024-03-20",
        appointmentTime: "10:00 AM",
        contactNumber: "9876543210",
        address: "123 Street",
        charge: "₹50",
        payment: "Cash",
        diagnosis: "Lower Back Pain",
        treatment: "Physiotherapy",
        medications: "Painkillers (SOS)",
        visitAgainDate: "2024-03-27",
        visitAgainTime: "10:00 AM",
        specialInstructions: "Avoid lifting heavy weights",
        country: "India", state: "Telangana", district: "Hyderabad", mandal: "Ameerpet", pincode: "500038"
    },
    {
        opdNo: "OPD-2024-102",
        name: "Emma Thomas",
        age: "34",
        gender: "Female",
        doctor: "Dr. Jones",
        appointmentDate: "2024-03-21",
        appointmentTime: "11:30 AM",
        contactNumber: "9876543211",
        address: "456 Avenue",
        charge: "₹50",
        payment: "Card",
        diagnosis: "Migraine",
        treatment: "Medication",
        medications: "Migranil 10mg",
        visitAgainDate: "2024-04-21",
        visitAgainTime: "11:00 AM",
        specialInstructions: "Avoid bright lights",
        country: "India", state: "Maharashtra", district: "Mumbai", mandal: "Bandra", pincode: "400050"
    },
];

const COUNTRIES = ["India", "USA", "UK", "Australia", "Canada"];

const OPDPortal = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState(initialOpdPatients);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [editingPatient, setEditingPatient] = useState<any>(null);
    const { toast } = useToast();

    // Updated state to match "Patient Out Details Form"
    const [newVisit, setNewVisit] = useState({
        name: "",
        age: "",
        gender: "Male",
        doctor: "",
        appointmentDate: new Date().toISOString().split('T')[0],
        appointmentTime: "",
        contactNumber: "",
        charge: "",
        payment: "Cash",
        diagnosis: "",
        treatment: "",
        medications: "",
        visitAgainDate: "",
        visitAgainTime: "",
        specialInstructions: "",
        country: "India",
        state: "",
        district: "",
        mandal: "",
        pincode: ""
    });

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.opdNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCountryChange = (val: string) => {
        setNewVisit(prev => ({
            ...prev,
            country: val,
            state: val === "India" ? "" : "N/A",
            district: val === "India" ? "" : "N/A",
            mandal: ""
        }));
    };

    const handleStateChange = (val: string) => {
        setNewVisit(prev => ({ ...prev, state: val, district: "", mandal: "" }));
    };

    const handleAddVisit = () => {
        if (!newVisit.name || !newVisit.doctor) {
            toast({
                title: "Error",
                description: "Please fill in all required fields (Name, Doctor).",
                variant: "destructive",
            });
            return;
        }

        const patient = {
            opdNo: `OPD-2024-${100 + patients.length + 1}`,
            name: newVisit.name,
            age: newVisit.age,
            gender: newVisit.gender,
            doctor: newVisit.doctor,
            appointmentDate: newVisit.appointmentDate,
            appointmentTime: newVisit.appointmentTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            contactNumber: newVisit.contactNumber,
            address: `${newVisit.mandal}, ${newVisit.district}, ${newVisit.state}`,
            charge: newVisit.charge || "₹0",
            payment: newVisit.payment,
            diagnosis: newVisit.diagnosis,
            treatment: newVisit.treatment,
            medications: newVisit.medications,
            visitAgainDate: newVisit.visitAgainDate,
            visitAgainTime: newVisit.visitAgainTime,
            specialInstructions: newVisit.specialInstructions,
            country: newVisit.country,
            state: newVisit.state,
            district: newVisit.district,
            mandal: newVisit.mandal,
            pincode: newVisit.pincode
        };

        setPatients([patient, ...patients]);
        setIsAddDialogOpen(false);
        setNewVisit({
            name: "",
            age: "",
            gender: "Male",
            doctor: "",
            appointmentDate: new Date().toISOString().split('T')[0],
            appointmentTime: "",
            contactNumber: "",
            charge: "",
            payment: "Cash",
            diagnosis: "",
            treatment: "",
            medications: "",
            visitAgainDate: "",
            visitAgainTime: "",
            specialInstructions: "",
            country: "India",
            state: "",
            district: "",
            mandal: "",
            pincode: ""
        });

        toast({
            title: "Success",
            description: "Patient Out saved successfully.",
        });
    };

    const handleDeleteVisit = (opdNo: string) => {
        setPatients(patients.filter(p => p.opdNo !== opdNo));
        toast({
            title: "Success",
            description: "Record deleted successfully.",
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* View Details Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>OPD Patient Details</DialogTitle>
                    </DialogHeader>
                    {selectedPatient && (
                        <div className="grid gap-4 py-4">
                            <div className="border border-slate-200 rounded-md p-4 bg-slate-50">
                                <h3 className="text-center font-bold text-lg mb-4 text-slate-800 uppercase">OPD Patient Out Details Review</h3>

                                {/* Patient Info Section */}
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-semibold uppercase mb-3">Patient Information</div>
                                <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                                    <p><span className="font-semibold">Patient Name:</span> {selectedPatient.name}</p>
                                    <p><span className="font-semibold">Age/Gender:</span> {selectedPatient.age} / {selectedPatient.gender}</p>
                                    <p><span className="font-semibold">Date:</span> {selectedPatient.appointmentDate}</p>
                                    <p><span className="font-semibold">File/OPD No:</span> {selectedPatient.opdNo}</p>
                                    <p><span className="font-semibold">Contact:</span> {selectedPatient.contactNumber}</p>
                                    <p><span className="font-semibold">Address:</span> {selectedPatient.mandal}, {selectedPatient.district}</p>
                                </div>

                                {/* Diagnosis Section */}
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-semibold uppercase mb-3">Diagnosis & Treatment Details</div>
                                <div className="space-y-2 text-sm mb-4">
                                    <p><span className="font-semibold">Diagnosis:</span> {selectedPatient.diagnosis}</p>
                                    <p><span className="font-semibold">Recommended Treatment:</span> {selectedPatient.treatment}</p>
                                    <p><span className="font-semibold">Medications:</span> {selectedPatient.medications}</p>
                                </div>

                                {/* Follow Up Section */}
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-semibold uppercase mb-3">Follow-up Instructions</div>
                                <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                                    <p><span className="font-semibold">Visit Again On:</span> {selectedPatient.visitAgainDate || "N/A"} {selectedPatient.visitAgainTime ? `at ${selectedPatient.visitAgainTime}` : ""}</p>
                                    <p className="col-span-2"><span className="font-semibold">Special Instructions:</span> {selectedPatient.specialInstructions}</p>
                                </div>

                                {/* Doctor Section */}
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-semibold uppercase mb-3">Doctor's Details</div>
                                <div className="text-sm">
                                    <p><span className="font-semibold">Doctor's Name:</span> {selectedPatient.doctor}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="page-title">OPD Portal</h1>
                    <p className="page-subtitle">Out-Patient Department Records</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <ClipboardList className="h-4 w-4 mr-2" />
                            Patient Out
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-center font-bold text-xl uppercase text-slate-800">OPD Patient Out</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-6 py-4">
                            {/* Section 1: Patient Information */}
                            <div className="space-y-4">
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-bold uppercase rounded-sm">Patient Information</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Patient Name</Label>
                                        <Input
                                            id="name"
                                            value={newVisit.name}
                                            onChange={(e) => setNewVisit({ ...newVisit, name: e.target.value })}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="age">Age</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                value={newVisit.age}
                                                onChange={(e) => setNewVisit({ ...newVisit, age: e.target.value })}
                                                placeholder="Age"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            <Select
                                                value={newVisit.gender}
                                                onValueChange={(value) => setNewVisit({ ...newVisit, gender: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact">Contact Number</Label>
                                        <Input
                                            id="contact"
                                            value={newVisit.contactNumber}
                                            onChange={(e) => setNewVisit({ ...newVisit, contactNumber: e.target.value })}
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={newVisit.appointmentDate}
                                            onChange={(e) => setNewVisit({ ...newVisit, appointmentDate: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Address Fields - Compact */}
                                <div className="border p-3 rounded-md bg-slate-50">
                                    <Label className="mb-2 block font-semibold text-slate-700">Address Details</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <Select value={newVisit.country} onValueChange={handleCountryChange}>
                                            <SelectTrigger><SelectValue placeholder="Country" /></SelectTrigger>
                                            <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <Select value={newVisit.state} onValueChange={handleStateChange} disabled={newVisit.country !== "India"}>
                                            <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
                                            <SelectContent>{INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <Select value={newVisit.district} onValueChange={(val) => setNewVisit({ ...newVisit, district: val })} disabled={!newVisit.state}>
                                            <SelectTrigger><SelectValue placeholder="District" /></SelectTrigger>
                                            <SelectContent>{newVisit.state && DISTRICTS[newVisit.state]?.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <div className="col-span-2">
                                            {newVisit.district && MANDALS[newVisit.district] ? (
                                                <Select value={newVisit.mandal} onValueChange={(val) => setNewVisit({ ...newVisit, mandal: val })}>
                                                    <SelectTrigger><SelectValue placeholder="Mandal" /></SelectTrigger>
                                                    <SelectContent>{MANDALS[newVisit.district].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                                </Select>
                                            ) : (
                                                <Input value={newVisit.mandal} onChange={(e) => setNewVisit({ ...newVisit, mandal: e.target.value })} placeholder="Mandal" />
                                            )}
                                        </div>
                                        <Input value={newVisit.pincode} onChange={(e) => setNewVisit({ ...newVisit, pincode: e.target.value })} placeholder="Pincode" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Diagnosis & Treatment */}
                            <div className="space-y-4">
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-bold uppercase rounded-sm">Diagnosis & Treatment Details</div>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <Label htmlFor="diagnosis">Diagnosis</Label>
                                        <Input
                                            id="diagnosis"
                                            value={newVisit.diagnosis}
                                            onChange={(e) => setNewVisit({ ...newVisit, diagnosis: e.target.value })}
                                            placeholder="Enter Diagnosis"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="treatment">Recommended Treatment/Procedure</Label>
                                        <Input
                                            id="treatment"
                                            value={newVisit.treatment}
                                            onChange={(e) => setNewVisit({ ...newVisit, treatment: e.target.value })}
                                            placeholder="Enter Treatment"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="medications">Medications Prescribed</Label>
                                        <textarea
                                            id="medications"
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            value={newVisit.medications}
                                            onChange={(e) => setNewVisit({ ...newVisit, medications: e.target.value })}
                                            placeholder="List medications..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Follow-up Instructions */}
                            <div className="space-y-4">
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-bold uppercase rounded-sm">Follow-up Instructions</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="visitAgainOn">Visit Again On (Date)</Label>
                                        <Input
                                            id="visitAgainOn"
                                            type="date"
                                            value={newVisit.visitAgainDate}
                                            onChange={(e) => setNewVisit({ ...newVisit, visitAgainDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="visitAgainTime">Time (AM/PM)</Label>
                                        <Input
                                            id="visitAgainTime"
                                            type="time"
                                            value={newVisit.visitAgainTime}
                                            onChange={(e) => setNewVisit({ ...newVisit, visitAgainTime: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="specialInstructions">Special Instructions</Label>
                                        <Input
                                            id="specialInstructions"
                                            value={newVisit.specialInstructions}
                                            onChange={(e) => setNewVisit({ ...newVisit, specialInstructions: e.target.value })}
                                            placeholder="Any special instructions..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Doctor's Details */}
                            <div className="space-y-4">
                                <div className="bg-blue-600 text-white px-3 py-1 text-sm font-bold uppercase rounded-sm">Doctor's Details</div>
                                <div className="space-y-2">
                                    <Label htmlFor="doctorName">Doctor's Name</Label>
                                    <Input
                                        id="doctorName"
                                        value={newVisit.doctor}
                                        onChange={(e) => setNewVisit({ ...newVisit, doctor: e.target.value })}
                                        placeholder="Dr. Name"
                                    />
                                </div>
                            </div>

                            {/* Hidden fields for internal logic */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground text-xs">Internal: Charge (₹)</Label>
                                    <Input
                                        value={newVisit.charge}
                                        onChange={(e) => setNewVisit({ ...newVisit, charge: e.target.value })}
                                        className="h-8"
                                        placeholder="50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground text-xs">Internal: Payment Mode</Label>
                                    <Select
                                        value={newVisit.payment}
                                        onValueChange={(value) => setNewVisit({ ...newVisit, payment: value })}
                                    >
                                        <SelectTrigger className="h-8">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cash">Cash</SelectItem>
                                            <SelectItem value="Card">Card</SelectItem>
                                            <SelectItem value="Online">Online</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit" onClick={handleAddVisit} className="w-full">Save Patient Out</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search patients..."
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
                                <TableHead>OPD No</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Age/Gender</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Diagnosis</TableHead>
                                <TableHead>Visit Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map((patient) => (
                                <TableRow key={patient.opdNo}>
                                    <TableCell className="font-medium">{patient.opdNo}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{patient.name}</p>
                                            <p className="text-xs text-muted-foreground">{patient.contactNumber}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{patient.age} / {patient.gender}</TableCell>
                                    <TableCell>{patient.doctor}</TableCell>
                                    <TableCell>{patient.diagnosis || "-"}</TableCell>
                                    <TableCell>{patient.appointmentDate}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => { setSelectedPatient(patient); setIsViewDialogOpen(true); }}>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
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

export default OPDPortal;
