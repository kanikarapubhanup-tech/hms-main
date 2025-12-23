import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clipboard, Search, Plus, FileText, User, Calendar as CalendarIcon, Stethoscope, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Diagnosis = () => {
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [diagnosisRecords, setDiagnosisRecords] = useState([
        {
            id: 1,
            patient: "John Doe",
            patientId: "P-2024-001",
            doctor: "Dr. Smith",
            diagnosis: "Acute Bronchitis",
            date: "2024-03-21",
            symptoms: "Cough, Fever, Shortness of breath",
            notes: "Prescribed antibiotics and rest. Follow up in 1 week.",
            status: "Active"
        },
        {
            id: 2,
            patient: "Jane Smith",
            patientId: "P-2024-045",
            doctor: "Dr. Brown",
            diagnosis: "Migraine",
            date: "2024-03-20",
            symptoms: "Severe headache, sensitivity to light",
            notes: "Recommended MRI scan if symptoms persist.",
            status: "Chronic"
        },
        {
            id: 3,
            patient: "Robert Johnson",
            patientId: "P-2024-089",
            doctor: "Dr. Wilson",
            diagnosis: "Type 2 Diabetes",
            date: "2024-03-18",
            symptoms: "Increased thirst, frequent urination",
            notes: "Dietary changes recommended. Metformin prescribed.",
            status: "Active"
        },
    ]);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingDiagnosis, setEditingDiagnosis] = useState<any>(null);
    const { toast } = useToast();
    const [newDiagnosis, setNewDiagnosis] = useState({
        patient: "",
        doctor: "",
        diagnosis: "",
        date: new Date().toISOString().split('T')[0],
        symptoms: "",
        notes: "",
        status: "Active"
    });

    const handleAddDiagnosis = () => {
        if (!newDiagnosis.patient || !newDiagnosis.diagnosis || !newDiagnosis.doctor) {
            toast({
                title: "Error",
                description: "Please fill in patient, doctor and diagnosis fields",
                variant: "destructive"
            });
            return;
        }

        const record = {
            id: diagnosisRecords.length + 1,
            patientId: `P-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
            ...newDiagnosis
        };

        setDiagnosisRecords([record, ...diagnosisRecords]);
        setIsAddDialogOpen(false);
        setNewDiagnosis({
            patient: "",
            doctor: "",
            diagnosis: "",
            date: new Date().toISOString().split('T')[0],
            symptoms: "",
            notes: "",
            status: "Active"
        });

        toast({
            title: "Success",
            description: "Diagnosis record added successfully"
        });
    };

    const handleEditDiagnosis = () => {
        if (!editingDiagnosis.patient || !editingDiagnosis.diagnosis || !editingDiagnosis.doctor) {
            toast({
                title: "Error",
                description: "Please fill in patient, doctor and diagnosis fields",
                variant: "destructive"
            });
            return;
        }

        setDiagnosisRecords(diagnosisRecords.map(d => d.id === editingDiagnosis.id ? editingDiagnosis : d));
        setIsEditDialogOpen(false);
        setEditingDiagnosis(null);

        toast({
            title: "Success",
            description: "Diagnosis record updated successfully"
        });
    };

    const handleDeleteDiagnosis = (id: number) => {
        setDiagnosisRecords(diagnosisRecords.filter(d => d.id !== id));
        toast({
            title: "Success",
            description: "Diagnosis record deleted"
        });
    };

    const handleViewDetails = (record: any) => {
        setSelectedDiagnosis(record);
        setIsDetailsOpen(true);
    };

    const filteredDiagnosis = diagnosisRecords.filter(d =>
        d.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Diagnosis</h1>
                    <p className="text-muted-foreground">Patient diagnosis records and history.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Diagnosis
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Diagnosis</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="patient">Patient Name</Label>
                                <Input id="patient" value={newDiagnosis.patient} onChange={(e) => setNewDiagnosis({ ...newDiagnosis, patient: e.target.value })} placeholder="Enter patient name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="doctor">Doctor Name</Label>
                                <Input id="doctor" value={newDiagnosis.doctor} onChange={(e) => setNewDiagnosis({ ...newDiagnosis, doctor: e.target.value })} placeholder="Enter doctor name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="diagnosis">Diagnosis / Condition</Label>
                                <Input id="diagnosis" value={newDiagnosis.diagnosis} onChange={(e) => setNewDiagnosis({ ...newDiagnosis, diagnosis: e.target.value })} placeholder="e.g. Acute Bronchitis" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" type="date" value={newDiagnosis.date} onChange={(e) => setNewDiagnosis({ ...newDiagnosis, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={newDiagnosis.status} onValueChange={(v) => setNewDiagnosis({ ...newDiagnosis, status: v })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Chronic">Chronic</SelectItem>
                                            <SelectItem value="Resolved">Resolved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="symptoms">Symptoms</Label>
                                <Input id="symptoms" value={newDiagnosis.symptoms} onChange={(e) => setNewDiagnosis({ ...newDiagnosis, symptoms: e.target.value })} placeholder="e.g. Cough, Fever" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea id="notes" value={newDiagnosis.notes} onChange={(e) => setNewDiagnosis({ ...newDiagnosis, notes: e.target.value })} placeholder="Additional notes..." />
                            </div>
                        </div>
                        <Button onClick={handleAddDiagnosis} className="w-full">Save Diagnosis</Button>
                    </DialogContent>
                </Dialog>

                {/* Edit Diagnosis Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Diagnosis</DialogTitle>
                        </DialogHeader>
                        {editingDiagnosis && (
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-patient">Patient Name</Label>
                                    <Input id="edit-patient" value={editingDiagnosis.patient} onChange={(e) => setEditingDiagnosis({ ...editingDiagnosis, patient: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-doctor">Doctor Name</Label>
                                    <Input id="edit-doctor" value={editingDiagnosis.doctor} onChange={(e) => setEditingDiagnosis({ ...editingDiagnosis, doctor: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-diagnosis">Diagnosis / Condition</Label>
                                    <Input id="edit-diagnosis" value={editingDiagnosis.diagnosis} onChange={(e) => setEditingDiagnosis({ ...editingDiagnosis, diagnosis: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-date">Date</Label>
                                        <Input id="edit-date" type="date" value={editingDiagnosis.date} onChange={(e) => setEditingDiagnosis({ ...editingDiagnosis, date: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-status">Status</Label>
                                        <Select value={editingDiagnosis.status} onValueChange={(v) => setEditingDiagnosis({ ...editingDiagnosis, status: v })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Chronic">Chronic</SelectItem>
                                                <SelectItem value="Resolved">Resolved</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-symptoms">Symptoms</Label>
                                    <Input id="edit-symptoms" value={editingDiagnosis.symptoms} onChange={(e) => setEditingDiagnosis({ ...editingDiagnosis, symptoms: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-notes">Notes</Label>
                                    <Textarea id="edit-notes" value={editingDiagnosis.notes} onChange={(e) => setEditingDiagnosis({ ...editingDiagnosis, notes: e.target.value })} />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={handleEditDiagnosis} className="w-full">Update Diagnosis</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Diagnosis Records</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search records..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Diagnosis</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDiagnosis.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell className="font-medium">{d.patient}</TableCell>
                                    <TableCell>{d.doctor}</TableCell>
                                    <TableCell>{d.diagnosis}</TableCell>
                                    <TableCell>{d.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{d.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleViewDetails(d)}>
                                                    <FileText className="mr-2 h-4 w-4" /> Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { setEditingDiagnosis(d); setIsEditDialogOpen(true); }}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteDiagnosis(d.id)}>
                                                    <Trash className="mr-2 h-4 w-4" /> Delete
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

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Diagnosis Details</DialogTitle>
                        <DialogDescription>
                            Detailed medical information for {selectedDiagnosis?.patient}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedDiagnosis && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <User className="h-3 w-3" /> Patient
                                    </span>
                                    <p className="font-medium">{selectedDiagnosis.patient}</p>
                                    <p className="text-xs text-muted-foreground">{selectedDiagnosis.patientId}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Stethoscope className="h-3 w-3" /> Doctor
                                    </span>
                                    <p className="font-medium">{selectedDiagnosis.doctor}</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <FileText className="h-3 w-3" /> Condition
                                </span>
                                <p className="text-lg font-semibold text-primary">{selectedDiagnosis.diagnosis}</p>
                            </div>

                            <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                                <div>
                                    <span className="text-xs font-semibold text-muted-foreground">Symptoms</span>
                                    <p className="text-sm">{selectedDiagnosis.symptoms}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-muted-foreground">Doctor's Notes</span>
                                    <p className="text-sm">{selectedDiagnosis.notes}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <CalendarIcon className="h-4 w-4" />
                                    {selectedDiagnosis.date}
                                </div>
                                <Badge>{selectedDiagnosis.status}</Badge>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Diagnosis;
