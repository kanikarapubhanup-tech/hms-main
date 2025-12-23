import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Syringe, Search, Plus, Calendar, User, FileText, MoreHorizontal, Pencil, Trash } from "lucide-react";

interface VaccinationRecord {
    id: string;
    patientName: string;
    patientId: string;
    vaccineName: string;
    doseNumber: number;
    date: string;
    status: "completed" | "scheduled" | "overdue";
    doctor: string;
    notes: string;
}

const VaccinationPortal = () => {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newRecord, setNewRecord] = useState<Partial<VaccinationRecord>>({
        status: "scheduled",
        doseNumber: 1,
    });
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<VaccinationRecord | null>(null);

    const [records, setRecords] = useState<VaccinationRecord[]>([
        {
            id: "1",
            patientName: "Rahul Sharma",
            patientId: "P-2024-001",
            vaccineName: "COVID-19 Covishield",
            doseNumber: 1,
            date: "2024-01-15",
            status: "completed",
            doctor: "Dr. Priya Patel",
            notes: "No adverse reactions",
        },
        {
            id: "2",
            patientName: "Sarah Smith",
            patientId: "P-2024-045",
            vaccineName: "Influenza",
            doseNumber: 1,
            date: "2024-03-20",
            status: "scheduled",
            doctor: "Dr. Rajesh Kumar",
            notes: "Annual flu shot",
        },
        {
            id: "3",
            patientName: "Baby Aarav",
            patientId: "P-2024-089",
            vaccineName: "Polio",
            doseNumber: 2,
            date: "2024-03-10",
            status: "overdue",
            doctor: "Dr. Meera Reddy",
            notes: "Missed appointment",
        },
    ]);

    const handleAddRecord = () => {
        if (!newRecord.patientName || !newRecord.vaccineName || !newRecord.date) {
            toast({
                title: "Error",
                description: "Please fill all required fields",
                variant: "destructive",
            });
            return;
        }

        const record: VaccinationRecord = {
            id: Date.now().toString(),
            patientName: newRecord.patientName!,
            patientId: `P-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
            vaccineName: newRecord.vaccineName!,
            doseNumber: newRecord.doseNumber || 1,
            date: newRecord.date!,
            status: (newRecord.status as any) || "scheduled",
            doctor: newRecord.doctor || "Unassigned",
            notes: newRecord.notes || "",
        };

        setRecords([record, ...records]);
        setNewRecord({ status: "scheduled", doseNumber: 1 });
        setShowAddDialog(false);
        toast({
            title: "Success",
            description: "Vaccination record added successfully",
        });
    };

    const handleEditRecord = () => {
        if (!editingRecord || !editingRecord.patientId || !editingRecord.vaccineName || !editingRecord.doseNumber) {
            toast({
                title: "Error",
                description: "Please fill all required fields",
                variant: "destructive",
            });
            return;
        }

        setRecords(records.map(r => r.id === editingRecord.id ? editingRecord : r));
        setIsEditDialogOpen(false);
        setEditingRecord(null);
        toast({
            title: "Success",
            description: "Vaccination record updated successfully",
        });
    };

    const handleDeleteRecord = (id: string) => {
        setRecords(records.filter(r => r.id !== id));
        toast({
            title: "Success",
            description: "Vaccination record deleted successfully",
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
            case "scheduled":
                return <Badge className="bg-primary/10 text-primary border-primary/20">Scheduled</Badge>;
            case "overdue":
                return <Badge variant="destructive">Overdue</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const filteredRecords = records.filter(
        (r) =>
            r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.vaccineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="page-header">
                <h1 className="page-title">Vaccinations</h1>
                <p className="page-subtitle">Manage patient immunization records and schedules</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Syringe className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Vaccinations</p>
                                <h3 className="text-2xl font-bold">{records.length}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-success/10 rounded-lg">
                                <Calendar className="h-6 w-6 text-success" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Completed Today</p>
                                <h3 className="text-2xl font-bold">
                                    {records.filter((r) => r.status === "completed").length}
                                </h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-destructive/10 rounded-lg">
                                <User className="h-6 w-6 text-destructive" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Overdue</p>
                                <h3 className="text-2xl font-bold">
                                    {records.filter((r) => r.status === "overdue").length}
                                </h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Vaccination Records</CardTitle>
                    <div className="flex gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search patients or vaccines..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Record
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add Vaccination Record</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Patient Name</Label>
                                        <Input
                                            placeholder="Enter patient name"
                                            value={newRecord.patientName || ""}
                                            onChange={(e) =>
                                                setNewRecord({ ...newRecord, patientName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Vaccine Name</Label>
                                        <Input
                                            placeholder="e.g. COVID-19, Flu, Hepatitis B"
                                            value={newRecord.vaccineName || ""}
                                            onChange={(e) =>
                                                setNewRecord({ ...newRecord, vaccineName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Dose Number</Label>
                                            <Input
                                                type="number"
                                                min="1"
                                                value={newRecord.doseNumber}
                                                onChange={(e) =>
                                                    setNewRecord({
                                                        ...newRecord,
                                                        doseNumber: parseInt(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Date</Label>
                                            <Input
                                                type="date"
                                                value={newRecord.date || ""}
                                                onChange={(e) =>
                                                    setNewRecord({ ...newRecord, date: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Doctor</Label>
                                            <Input
                                                placeholder="Doctor name"
                                                value={newRecord.doctor || ""}
                                                onChange={(e) =>
                                                    setNewRecord({ ...newRecord, doctor: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Status</Label>
                                            <Select
                                                value={newRecord.status}
                                                onValueChange={(v: any) =>
                                                    setNewRecord({ ...newRecord, status: v })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="overdue">Overdue</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Button onClick={handleAddRecord} className="w-full">
                                        Save Record
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Edit Dialog */}
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Edit Vaccination Record</DialogTitle>
                                </DialogHeader>
                                {editingRecord && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Patient Name</Label>
                                            <Input
                                                placeholder="Enter patient name"
                                                value={editingRecord.patientName}
                                                onChange={(e) =>
                                                    setEditingRecord({ ...editingRecord, patientName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Vaccine Name</Label>
                                            <Input
                                                placeholder="e.g. COVID-19"
                                                value={editingRecord.vaccineName}
                                                onChange={(e) =>
                                                    setEditingRecord({ ...editingRecord, vaccineName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Dose Number</Label>
                                                <Input
                                                    type="number"
                                                    value={editingRecord.doseNumber}
                                                    onChange={(e) =>
                                                        setEditingRecord({ ...editingRecord, doseNumber: parseInt(e.target.value) || 0 })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>Status</Label>
                                                <Select
                                                    value={editingRecord.status}
                                                    onValueChange={(val: any) =>
                                                        setEditingRecord({ ...editingRecord, status: val })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="overdue">Overdue</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Date</Label>
                                                <Input
                                                    type="date"
                                                    value={editingRecord.date}
                                                    onChange={(e) =>
                                                        setEditingRecord({ ...editingRecord, date: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>Doctor</Label>
                                                <Input
                                                    placeholder="Doctor name"
                                                    value={editingRecord.doctor}
                                                    onChange={(e) =>
                                                        setEditingRecord({ ...editingRecord, doctor: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleEditRecord} className="w-full">
                                            Update Record
                                        </Button>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient ID</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Vaccine</TableHead>
                                <TableHead>Dose</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRecords.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-mono text-sm">
                                        {record.patientId}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {record.patientName}
                                    </TableCell>
                                    <TableCell>{record.vaccineName}</TableCell>
                                    <TableCell>#{record.doseNumber}</TableCell>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{record.doctor}</TableCell>
                                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => {
                                                    setEditingRecord(record);
                                                    setIsEditDialogOpen(true);
                                                }}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRecord(record.id)}>
                                                    <Trash className="mr-2 h-4 w-4" />
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

export default VaccinationPortal;
