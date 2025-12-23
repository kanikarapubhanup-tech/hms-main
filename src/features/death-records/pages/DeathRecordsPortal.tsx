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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skull, Search, Plus, Calendar, MapPin, User, FileText, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DeathRecord {
    id: string;
    deceasedName: string;
    patientId: string;
    guardianName: string;
    dateOfDeath: string;
    timeOfDeath: string;
    causeOfDeath: string;
    location: string;
    doctorInCharge: string;
    status: "processed" | "pending" | "released";
}

const DeathRecordsPortal = () => {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newRecord, setNewRecord] = useState<Partial<DeathRecord>>({
        status: "pending",
    });
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DeathRecord | null>(null);

    const [records, setRecords] = useState<DeathRecord[]>([
        {
            id: "1",
            deceasedName: "John Doe",
            patientId: "P-2024-001",
            guardianName: "Jane Doe",
            dateOfDeath: "2024-03-15",
            timeOfDeath: "14:30",
            causeOfDeath: "Cardiac Arrest",
            location: "ICU Bed 04",
            doctorInCharge: "Dr. Sharma",
            status: "released",
        },
        {
            id: "2",
            deceasedName: "Mary Johnson",
            patientId: "P-2024-045",
            guardianName: "Robert Johnson",
            dateOfDeath: "2024-03-20",
            timeOfDeath: "09:15",
            causeOfDeath: "Multiple Organ Failure",
            location: "Emergency Ward",
            doctorInCharge: "Dr. Patel",
            status: "processed",
        },
    ]);

    const handleAddRecord = () => {
        if (!newRecord.deceasedName || !newRecord.dateOfDeath || !newRecord.causeOfDeath) {
            toast({
                title: "Error",
                description: "Please fill all required fields",
                variant: "destructive",
            });
            return;
        }

        const record: DeathRecord = {
            id: Date.now().toString(),
            deceasedName: newRecord.deceasedName!,
            patientId: newRecord.patientId || `P-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
            guardianName: newRecord.guardianName || "Unknown",
            dateOfDeath: newRecord.dateOfDeath!,
            timeOfDeath: newRecord.timeOfDeath || "00:00",
            causeOfDeath: newRecord.causeOfDeath!,
            location: newRecord.location || "Hospital Mortuary",
            doctorInCharge: newRecord.doctorInCharge || "Unknown",
            status: (newRecord.status as any) || "pending",
        };

        setRecords([record, ...records]);
        setNewRecord({ status: "pending" });
        setShowAddDialog(false);
        toast({
            title: "Success",
            description: "Death record added successfully",
        });
    };

    const handleEditRecord = () => {
        if (!editingRecord || !editingRecord.deceasedName || !editingRecord.dateOfDeath) {
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
            description: "Death record updated successfully",
        });
    };

    const handleDeleteRecord = (id: string) => {
        setRecords(records.filter(r => r.id !== id));
        toast({
            title: "Success",
            description: "Death record deleted successfully",
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "released":
                return <Badge className="bg-success/10 text-success border-success/20">Released</Badge>;
            case "processed":
                return <Badge className="bg-primary/10 text-primary border-primary/20">Processed</Badge>;
            case "pending":
                return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const filteredRecords = records.filter(
        (r) =>
            r.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="page-header">
                <h1 className="page-title">Death Records</h1>
                <p className="page-subtitle">Manage deceased patient records and mortuary details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <Skull className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Records</p>
                                <h3 className="text-2xl font-bold">{records.length}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Processed</p>
                                <h3 className="text-2xl font-bold">
                                    {records.filter((r) => r.status === "processed").length}
                                </h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <User className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Pending Release</p>
                                <h3 className="text-2xl font-bold">
                                    {records.filter((r) => r.status === "pending").length}
                                </h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Deceased List</CardTitle>
                    <div className="flex gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search records..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                            <DialogTrigger asChild>
                                <Button variant="destructive">
                                    <Plus className="mr-2 h-4 w-4" /> Add Record
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add Death Record</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Deceased Name</Label>
                                        <Input
                                            placeholder="Enter name"
                                            value={newRecord.deceasedName || ""}
                                            onChange={(e) =>
                                                setNewRecord({ ...newRecord, deceasedName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Guardian Name</Label>
                                        <Input
                                            placeholder="Guardian/Relative name"
                                            value={newRecord.guardianName || ""}
                                            onChange={(e) =>
                                                setNewRecord({ ...newRecord, guardianName: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Date of Death</Label>
                                            <Input
                                                type="date"
                                                value={newRecord.dateOfDeath || ""}
                                                onChange={(e) =>
                                                    setNewRecord({ ...newRecord, dateOfDeath: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Time of Death</Label>
                                            <Input
                                                type="time"
                                                value={newRecord.timeOfDeath || ""}
                                                onChange={(e) =>
                                                    setNewRecord({ ...newRecord, timeOfDeath: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Cause of Death</Label>
                                        <Textarea
                                            placeholder="Medical cause of death"
                                            value={newRecord.causeOfDeath || ""}
                                            onChange={(e) =>
                                                setNewRecord({ ...newRecord, causeOfDeath: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Location</Label>
                                            <Input
                                                placeholder="e.g. ICU, Ward"
                                                value={newRecord.location || ""}
                                                onChange={(e) =>
                                                    setNewRecord({ ...newRecord, location: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Doctor In Charge</Label>
                                            <Input
                                                placeholder="Doctor name"
                                                value={newRecord.doctorInCharge || ""}
                                                onChange={(e) =>
                                                    setNewRecord({ ...newRecord, doctorInCharge: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleAddRecord} variant="destructive" className="w-full">
                                        Save Record
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Edit Dialog */}
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Edit Death Record</DialogTitle>
                                </DialogHeader>
                                {editingRecord && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Deceased Name</Label>
                                            <Input
                                                placeholder="Enter name"
                                                value={editingRecord.deceasedName}
                                                onChange={(e) =>
                                                    setEditingRecord({ ...editingRecord, deceasedName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Guardian Name</Label>
                                            <Input
                                                placeholder="Guardian/Relative name"
                                                value={editingRecord.guardianName}
                                                onChange={(e) =>
                                                    setEditingRecord({ ...editingRecord, guardianName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Date of Death</Label>
                                                <Input
                                                    type="date"
                                                    value={editingRecord.dateOfDeath}
                                                    onChange={(e) =>
                                                        setEditingRecord({ ...editingRecord, dateOfDeath: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>Time of Death</Label>
                                                <Input
                                                    type="time"
                                                    value={editingRecord.timeOfDeath}
                                                    onChange={(e) =>
                                                        setEditingRecord({ ...editingRecord, timeOfDeath: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Cause of Death</Label>
                                            <Textarea
                                                placeholder="Medical cause of death"
                                                value={editingRecord.causeOfDeath}
                                                onChange={(e) =>
                                                    setEditingRecord({ ...editingRecord, causeOfDeath: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Location</Label>
                                                <Input
                                                    placeholder="e.g. ICU, Ward"
                                                    value={editingRecord.location}
                                                    onChange={(e) =>
                                                        setEditingRecord({ ...editingRecord, location: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>Doctor In Charge</Label>
                                                <Input
                                                    placeholder="Doctor name"
                                                    value={editingRecord.doctorInCharge}
                                                    onChange={(e) =>
                                                        setEditingRecord({ ...editingRecord, doctorInCharge: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleEditRecord} variant="default" className="w-full">
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
                                <TableHead>Deceased Name</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Cause</TableHead>
                                <TableHead>Guardian</TableHead>
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
                                        {record.deceasedName}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{record.dateOfDeath}</span>
                                            <span className="text-xs text-muted-foreground">{record.timeOfDeath}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{record.causeOfDeath}</TableCell>
                                    <TableCell>{record.guardianName}</TableCell>
                                    <TableCell>{record.doctorInCharge}</TableCell>
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

export default DeathRecordsPortal;
