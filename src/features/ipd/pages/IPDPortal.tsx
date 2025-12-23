import { useState } from "react";
import { Search, Filter, MoreHorizontal, Plus, MapPin } from "lucide-react";
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

const initialIpdPatients = [
    { ipdNo: "IPD-2024-001", name: "John Doe", age: "45", gender: "Male", doctor: "Dr. Smith", admissionDate: "2024-03-10", bed: "ICU-01", billStatus: "Paid", weight: "70", bp: "120/80", height: "175", symptoms: "Chest Pain", notes: "Stable", country: "India", state: "Telangana", district: "Hyderabad", mandal: "Charminar", pincode: "500002" },
    { ipdNo: "IPD-2024-002", name: "Jane Smith", age: "32", gender: "Female", doctor: "Dr. Jones", admissionDate: "2024-03-12", bed: "GEN-10", billStatus: "Pending", weight: "60", bp: "110/70", height: "165", symptoms: "Fever", notes: "Observation", country: "India", state: "Maharashtra", district: "Mumbai", mandal: "Andheri", pincode: "400053" },
    { ipdNo: "IPD-2024-003", name: "Alice Johnson", age: "28", gender: "Female", doctor: "Dr. Brown", admissionDate: "2024-03-15", bed: "PRI-05", billStatus: "Unpaid", weight: "55", bp: "115/75", height: "160", symptoms: "Migraine", notes: "Medication given", country: "India", state: "Karnataka", district: "Bengaluru Urban", mandal: "Bengaluru South", pincode: "560041" },
];

const COUNTRIES = ["India", "USA", "UK", "Australia", "Canada"];


interface IPDPatient {
    ipdNo: string;
    name: string;
    age: string;
    gender: string;
    doctor: string;
    admissionDate: string;
    bed: string;
    billStatus: string;
    weight: string;
    bp: string;
    height: string;
    symptoms: string;
    notes: string;
    country: string;
    state: string;
    district: string;
    mandal: string;
    pincode: string;
}

const IPDPortal = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState<IPDPatient[]>(initialIpdPatients);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<IPDPatient | null>(null);
    const [editingPatient, setEditingPatient] = useState<IPDPatient | null>(null);
    const { toast } = useToast();

    const [newAdmission, setNewAdmission] = useState({
        name: "",
        age: "",
        gender: "Male",
        doctor: "",
        admissionDate: new Date().toISOString().split('T')[0],
        bed: "",
        billStatus: "Pending",
        weight: "",
        bp: "",
        height: "",
        symptoms: "",
        notes: "",
        country: "India",
        state: "",
        district: "",
        mandal: "",
        pincode: ""
    });

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.ipdNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Paid": return "default";
            case "Pending": return "secondary";
            case "Unpaid": return "destructive";
            default: return "secondary";
        }
    };

    // Handle State Change based on Country (Reset if not India)
    const handleCountryChange = (val: string) => {
        setNewAdmission(prev => ({
            ...prev,
            country: val,
            state: val === "India" ? "" : "N/A",
            district: val === "India" ? "" : "N/A",
            mandal: ""
        }));
    };

    const handleStateChange = (val: string) => {
        setNewAdmission(prev => ({ ...prev, state: val, district: "", mandal: "" }));
    };

    const handleAddAdmission = () => {
        if (!newAdmission.name || !newAdmission.doctor || !newAdmission.bed) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const patient = {
            ipdNo: `IPD-2024-${String(patients.length + 1).padStart(3, '0')}`,
            name: newAdmission.name,
            age: newAdmission.age,
            gender: newAdmission.gender,
            doctor: newAdmission.doctor,
            admissionDate: newAdmission.admissionDate,
            bed: newAdmission.bed,
            billStatus: newAdmission.billStatus,
            weight: newAdmission.weight,
            bp: newAdmission.bp,
            height: newAdmission.height,
            symptoms: newAdmission.symptoms,
            notes: newAdmission.notes,
            country: newAdmission.country,
            state: newAdmission.state,
            district: newAdmission.district,
            mandal: newAdmission.mandal,
            pincode: newAdmission.pincode
        };

        setPatients([patient, ...patients]);
        setIsAddDialogOpen(false);
        setNewAdmission({
            name: "",
            age: "",
            gender: "Male",
            doctor: "",
            admissionDate: new Date().toISOString().split('T')[0],
            bed: "",
            billStatus: "Pending",
            weight: "",
            bp: "",
            height: "",
            symptoms: "",
            notes: "",
            country: "India",
            state: "",
            district: "",
            mandal: "",
            pincode: ""
        });

        toast({
            title: "Success",
            description: "New IPD Admission added successfully.",
        });
    };

    const handleEditAdmission = () => {
        if (!editingPatient.name || !editingPatient.doctor || !editingPatient.bed) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        setPatients(patients.map(p => p.ipdNo === editingPatient.ipdNo ? editingPatient : p));
        setIsEditDialogOpen(false);
        setEditingPatient(null);

        toast({
            title: "Success",
            description: "Admission details updated successfully.",
        });
    };

    const handleDeleteAdmission = (ipdNo: string) => {
        setPatients(patients.filter(p => p.ipdNo !== ipdNo));
        toast({
            title: "Success",
            description: "Admission record deleted successfully.",
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* View Details Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>IPD Patient Details</DialogTitle>
                        <DialogDescription>
                            Full details for patient admission.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPatient && (
                        <div className="grid gap-4 py-4">
                            {/* Personal Details */}
                            <h4 className="text-sm font-medium text-muted-foreground">Personal Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Patient Name</Label>
                                    <Input value={selectedPatient.name} readOnly />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Age</Label>
                                        <Input value={selectedPatient.age || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <Input value={selectedPatient.gender || "N/A"} readOnly />
                                    </div>
                                </div>
                            </div>

                            {/* Address Details */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Address Details</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Country</Label>
                                        <Input value={selectedPatient.country || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>State</Label>
                                        <Input value={selectedPatient.state || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>District</Label>
                                        <Input value={selectedPatient.district || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mandal</Label>
                                        <Input value={selectedPatient.mandal || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Pincode</Label>
                                        <Input value={selectedPatient.pincode || "N/A"} readOnly />
                                    </div>
                                </div>
                            </div>

                            {/* Admission Details */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Admission Details</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Doctor Assigned</Label>
                                        <Input value={selectedPatient.doctor} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Bed Number</Label>
                                        <Input value={selectedPatient.bed} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Bill Status</Label>
                                        <Input value={selectedPatient.billStatus} readOnly />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <Label>Admission Date</Label>
                                        <Input value={selectedPatient.admissionDate} readOnly />
                                    </div>
                                </div>
                            </div>

                            {/* Vitals & Clinical Info */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Vitals & Clinical Info</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Height (cm)</Label>
                                        <Input value={selectedPatient.height || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Weight (kg)</Label>
                                        <Input value={selectedPatient.weight || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Blood Pressure</Label>
                                        <Input value={selectedPatient.bp || "N/A"} readOnly />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <Label>Symptoms</Label>
                                        <Input value={selectedPatient.symptoms || "N/A"} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Notes/Diagnosis</Label>
                                        <textarea
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                                            value={selectedPatient.notes || "N/A"}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="page-title">IPD Portal</h1>
                    <p className="page-subtitle">In-Patient Department Records</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Admission
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>New IPD Admission</DialogTitle>
                            <DialogDescription>
                                Enter details for the new in-patient admission.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {/* Personal Details */}
                            <h4 className="text-sm font-medium text-muted-foreground">Personal Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Patient Name *</Label>
                                    <Input
                                        id="name"
                                        value={newAdmission.name}
                                        onChange={(e) => setNewAdmission({ ...newAdmission, name: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            value={newAdmission.age}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, age: e.target.value })}
                                            placeholder="30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select
                                            value={newAdmission.gender}
                                            onValueChange={(value) => setNewAdmission({ ...newAdmission, gender: value })}
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
                            </div>

                            {/* Address Details */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Address Details</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Select
                                            value={newAdmission.country}
                                            onValueChange={handleCountryChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {COUNTRIES.map(c => (
                                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Select
                                            value={newAdmission.state}
                                            onValueChange={handleStateChange}
                                            disabled={newAdmission.country !== "India"}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={newAdmission.country === "India" ? "Select State" : "N/A"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {INDIAN_STATES.map(s => (
                                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="district">District</Label>
                                        <Select
                                            value={newAdmission.district}
                                            onValueChange={(val) => setNewAdmission({ ...newAdmission, district: val })}
                                            disabled={!newAdmission.state || newAdmission.country !== "India"}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={newAdmission.state ? "Select District" : "Select State First"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {newAdmission.state && DISTRICTS[newAdmission.state]?.map(d => (
                                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mandal">Mandal</Label>
                                        {newAdmission.district && MANDALS[newAdmission.district] ? (
                                            <Select
                                                value={newAdmission.mandal}
                                                onValueChange={(val) => setNewAdmission({ ...newAdmission, mandal: val })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Mandal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {MANDALS[newAdmission.district].map(m => (
                                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <Input
                                                id="mandal"
                                                value={newAdmission.mandal}
                                                onChange={(e) => setNewAdmission({ ...newAdmission, mandal: e.target.value })}
                                                placeholder="Enter Mandal Name"
                                            />
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pincode">Pincode</Label>
                                        <Input
                                            id="pincode"
                                            value={newAdmission.pincode}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, pincode: e.target.value })}
                                            placeholder="500001"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Admission Details */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Admission Details</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="doctor">Doctor Assigned *</Label>
                                        <Input
                                            id="doctor"
                                            value={newAdmission.doctor}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, doctor: e.target.value })}
                                            placeholder="Dr. Smith"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bed">Bed Number *</Label>
                                        <Input
                                            id="bed"
                                            value={newAdmission.bed}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, bed: e.target.value })}
                                            placeholder="ICU-01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="billStatus">Bill Status</Label>
                                        <Select
                                            value={newAdmission.billStatus}
                                            onValueChange={(value) => setNewAdmission({ ...newAdmission, billStatus: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Paid">Paid</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Unpaid">Unpaid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="admissionDate">Admission Date</Label>
                                        <Input
                                            id="admissionDate"
                                            type="date"
                                            value={newAdmission.admissionDate}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, admissionDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Vitals & Symptoms */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Vitals & Clinical Info</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="height">Height (cm)</Label>
                                        <Input
                                            id="height"
                                            value={newAdmission.height}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, height: e.target.value })}
                                            placeholder="175"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Weight (kg)</Label>
                                        <Input
                                            id="weight"
                                            value={newAdmission.weight}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, weight: e.target.value })}
                                            placeholder="70"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bp">Blood Pressure</Label>
                                        <Input
                                            id="bp"
                                            value={newAdmission.bp}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, bp: e.target.value })}
                                            placeholder="120/80"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="symptoms">Symptoms</Label>
                                        <Input
                                            id="symptoms"
                                            value={newAdmission.symptoms}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, symptoms: e.target.value })}
                                            placeholder="Fever, Cough, Headache..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes/Diagnosis</Label>
                                        <textarea
                                            id="notes"
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={newAdmission.notes}
                                            onChange={(e) => setNewAdmission({ ...newAdmission, notes: e.target.value })}
                                            placeholder="Patient requires observation..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddAdmission}>Add Admission</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Admission Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Admission</DialogTitle>
                            <DialogDescription>
                                Update details for the patient admission.
                            </DialogDescription>
                        </DialogHeader>
                        {editingPatient && (
                            <div className="grid gap-4 py-4">
                                {/* Personal Details */}
                                <h4 className="text-sm font-medium text-muted-foreground">Personal Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-name">Patient Name *</Label>
                                        <Input
                                            id="edit-name"
                                            value={editingPatient.name}
                                            onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-age">Age</Label>
                                            <Input
                                                id="edit-age"
                                                type="number"
                                                value={editingPatient.age}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, age: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-gender">Gender</Label>
                                            <Select
                                                value={editingPatient.gender}
                                                onValueChange={(value) => setEditingPatient({ ...editingPatient, gender: value })}
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
                                </div>

                                {/* Address Details */}
                                <div className="border-t pt-4">
                                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Address Details</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-country">Country</Label>
                                            <Select
                                                value={editingPatient.country}
                                                onValueChange={(val) => setEditingPatient({ ...editingPatient, country: val, state: val === "India" ? "" : "N/A", district: val === "India" ? "" : "N/A", mandal: "" })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {COUNTRIES.map(c => (
                                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-state">State</Label>
                                            <Select
                                                value={editingPatient.state}
                                                onValueChange={(val) => setEditingPatient({ ...editingPatient, state: val, district: "", mandal: "" })}
                                                disabled={editingPatient.country !== "India"}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={editingPatient.country === "India" ? "Select State" : "N/A"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {INDIAN_STATES.map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-district">District</Label>
                                            <Select
                                                value={editingPatient.district}
                                                onValueChange={(val) => setEditingPatient({ ...editingPatient, district: val, mandal: "" })}
                                                disabled={!editingPatient.state || editingPatient.country !== "India"}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={editingPatient.state ? "Select District" : "Select State First"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {editingPatient.state && DISTRICTS[editingPatient.state]?.map(d => (
                                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-mandal">Mandal</Label>
                                            {editingPatient.district && MANDALS[editingPatient.district] ? (
                                                <Select
                                                    value={editingPatient.mandal}
                                                    onValueChange={(val) => setEditingPatient({ ...editingPatient, mandal: val })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Mandal" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {MANDALS[editingPatient.district].map(m => (
                                                            <SelectItem key={m} value={m}>{m}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input
                                                    id="edit-mandal"
                                                    value={editingPatient.mandal}
                                                    onChange={(e) => setEditingPatient({ ...editingPatient, mandal: e.target.value })}
                                                    placeholder="Enter Mandal Name"
                                                />
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-pincode">Pincode</Label>
                                            <Input
                                                id="edit-pincode"
                                                value={editingPatient.pincode}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, pincode: e.target.value })}
                                                placeholder="500001"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Admission Details */}
                                <div className="border-t pt-4">
                                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Admission Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-doctor">Doctor Assigned *</Label>
                                            <Input
                                                id="edit-doctor"
                                                value={editingPatient.doctor}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, doctor: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-bed">Bed Number *</Label>
                                            <Input
                                                id="edit-bed"
                                                value={editingPatient.bed}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, bed: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-billStatus">Bill Status</Label>
                                            <Select
                                                value={editingPatient.billStatus}
                                                onValueChange={(value) => setEditingPatient({ ...editingPatient, billStatus: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Paid">Paid</SelectItem>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-admissionDate">Admission Date</Label>
                                            <Input
                                                id="edit-admissionDate"
                                                type="date"
                                                value={editingPatient.admissionDate}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, admissionDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Vitals & Symptoms */}
                                <div className="border-t pt-4">
                                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Vitals & Clinical Info</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-height">Height (cm)</Label>
                                            <Input
                                                id="edit-height"
                                                value={editingPatient.height}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, height: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-weight">Weight (kg)</Label>
                                            <Input
                                                id="edit-weight"
                                                value={editingPatient.weight}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, weight: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-bp">Blood Pressure</Label>
                                            <Input
                                                id="edit-bp"
                                                value={editingPatient.bp}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, bp: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-symptoms">Symptoms</Label>
                                            <Input
                                                id="edit-symptoms"
                                                value={editingPatient.symptoms}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, symptoms: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-notes">Notes/Diagnosis</Label>
                                            <textarea
                                                id="edit-notes"
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={editingPatient.notes}
                                                onChange={(e) => setEditingPatient({ ...editingPatient, notes: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditAdmission}>Update Admission</Button>
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
                                placeholder="Search IPD patients..."
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
                                <TableHead>IPD No</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Doctor Assigned</TableHead>
                                <TableHead>Admission Date</TableHead>
                                <TableHead>Bed Number</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Bill Status</TableHead>
                                <TableHead className="w-[50px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map((patient) => (
                                <TableRow key={patient.ipdNo}>
                                    <TableCell className="font-medium">{patient.ipdNo}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.doctor}</TableCell>
                                    <TableCell>{patient.admissionDate}</TableCell>
                                    <TableCell>{patient.bed}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            {patient.district && patient.country === "India" ? `${patient.district}, ${patient.state}` : patient.country}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(patient.billStatus)}>
                                            {patient.billStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => { setSelectedPatient(patient); setIsViewDialogOpen(true); }}>
                                                    View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { setEditingPatient(patient); setIsEditDialogOpen(true); }}>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteAdmission(patient.ipdNo)}>
                                                    Delete
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>Bed History</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Discharge</DropdownMenuItem>
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

export default IPDPortal;
