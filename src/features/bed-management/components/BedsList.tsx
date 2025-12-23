import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Plus, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type BedStatus = "Available" | "Occupied" | "Maintenance";
type BedType = "General" | "Private" | "ICU" | "Emergency";

interface Bed {
    id: string;
    number: string;
    type: BedType;
    charge: string;
    status: BedStatus;
    ward: string;
    room: string;
    floor: string;
    patientName?: string;
    admissionDate?: string;
}

const initialBeds: Bed[] = [
    { id: "B101", number: "101", type: "General", charge: "₹500", status: "Available", ward: "General Ward A", room: "101", floor: "1st" },
    { id: "B102", number: "102", type: "General", charge: "₹500", status: "Occupied", ward: "General Ward A", room: "102", floor: "1st", patientName: "Rahul Kumar", admissionDate: "2024-10-25" },
    { id: "B201", number: "201", type: "ICU", charge: "₹2000", status: "Available", ward: "ICU Ward", room: "201", floor: "2nd" },
    { id: "B301", number: "301", type: "Private", charge: "₹1500", status: "Maintenance", ward: "Private Ward", room: "301", floor: "3rd" },
    { id: "B302", number: "302", type: "Private", charge: "₹1500", status: "Occupied", ward: "Private Ward", room: "302", floor: "3rd", patientName: "Sita Devi", admissionDate: "2024-10-26" },
];

const BedsList = () => {
    const [beds, setBeds] = useState<Bed[]>(initialBeds);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterWard, setFilterWard] = useState<string>("all");

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [newBed, setNewBed] = useState<Omit<Bed, 'id'>>({
        number: "",
        type: "General",
        charge: "",
        status: "Available",
        ward: "General Ward A",
        room: "",
        floor: "1st"
    });

    const [editingBed, setEditingBed] = useState<Bed | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const filteredBeds = beds.filter(bed => {
        const matchesSearch =
            bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bed.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bed.ward.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === "all" || bed.type === filterType;
        const matchesStatus = filterStatus === "all" || bed.status === filterStatus;
        const matchesWard = filterWard === "all" || bed.ward === filterWard;

        return matchesSearch && matchesType && matchesStatus && matchesWard;
    });

    const handleEditBed = () => {
        if (!editingBed || !editingBed.number || !editingBed.charge) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const updatedBed = { ...editingBed };
        // Auto-update status if patient is added/removed logic
        if (updatedBed.patientName && updatedBed.status === "Available") {
            updatedBed.status = "Occupied";
        } else if (!updatedBed.patientName && updatedBed.status === "Occupied") {
            updatedBed.status = "Available";
        }

        setBeds(beds.map((b) => (b.id === editingBed.id ? updatedBed : b)));
        setIsEditDialogOpen(false);
        setEditingBed(null);
        toast({
            title: "Success",
            description: "Bed details updated successfully.",
        });
    };

    const handleDeleteBed = (id: string) => {
        setBeds(beds.filter((b) => b.id !== id));
        toast({
            title: "Success",
            description: "Bed deleted successfully.",
        });
    };

    const handleAddBed = () => {
        if (!newBed.number || !newBed.charge) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const bed: Bed = {
            id: `B${newBed.number}`,
            ...newBed,
            charge: newBed.charge.startsWith('₹') ? newBed.charge : `₹${newBed.charge}`,
        };

        setBeds([...beds, bed]);
        setIsAddDialogOpen(false);
        setNewBed({
            number: "",
            type: "General",
            charge: "",
            status: "Available",
            ward: "General Ward A",
            room: "",
            floor: "1st"
        });

        toast({
            title: "Success",
            description: "Bed added successfully.",
        });
    };

    const getStatusColor = (status: BedStatus) => {
        switch (status) {
            case "Available": return "default";
            case "Occupied": return "destructive";
            case "Maintenance": return "secondary";
            default: return "default";
        }
    };

    // Extract unique wards for filter
    const uniqueWards = Array.from(new Set(beds.map(b => b.ward)));

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-1 gap-4 overflow-x-auto pb-2">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search bed, patient, ward..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Bed Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Private">Private</SelectItem>
                            <SelectItem value="ICU">ICU</SelectItem>
                            <SelectItem value="Emergency">Emergency</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="Occupied">Occupied</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterWard} onValueChange={setFilterWard}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Ward" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Wards</SelectItem>
                            {uniqueWards.map(ward => (
                                <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Bed
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add New Bed</DialogTitle>
                            <DialogDescription>
                                Add a new bed to the hospital management system.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="number">Bed Number</Label>
                                <Input
                                    id="number"
                                    value={newBed.number}
                                    onChange={(e) => setNewBed({ ...newBed, number: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={newBed.type}
                                    onValueChange={(value: BedType) => setNewBed({ ...newBed, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="General">General</SelectItem>
                                        <SelectItem value="Private">Private</SelectItem>
                                        <SelectItem value="ICU">ICU</SelectItem>
                                        <SelectItem value="Emergency">Emergency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="charge">Charge (₹)</Label>
                                <Input
                                    id="charge"
                                    type="number"
                                    value={newBed.charge.replace('₹', '')}
                                    onChange={(e) => setNewBed({ ...newBed, charge: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ward">Ward</Label>
                                <Input
                                    id="ward"
                                    value={newBed.ward}
                                    onChange={(e) => setNewBed({ ...newBed, ward: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="floor">Floor</Label>
                                <Input
                                    id="floor"
                                    value={newBed.floor}
                                    onChange={(e) => setNewBed({ ...newBed, floor: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="room">Room</Label>
                                <Input
                                    id="room"
                                    value={newBed.room}
                                    onChange={(e) => setNewBed({ ...newBed, room: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={newBed.status}
                                    onValueChange={(value: BedStatus) => setNewBed({ ...newBed, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Occupied">Occupied</SelectItem>
                                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddBed}>Add Bed</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bed No.</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Ward / Room / Floor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Admission Date</TableHead>
                            <TableHead>Charge</TableHead>
                            <TableHead className="w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBeds.map((bed) => (
                            <TableRow key={bed.id}>
                                <TableCell className="font-medium">{bed.number}</TableCell>
                                <TableCell>{bed.type}</TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        <div>{bed.ward}</div>
                                        <div className="text-muted-foreground text-xs">Room: {bed.room} | Floor: {bed.floor}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusColor(bed.status)} className={bed.status === "Available" ? "bg-green-500 hover:bg-green-600" : ""}>
                                        {bed.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{bed.patientName || "-"}</TableCell>
                                <TableCell>{bed.admissionDate || "-"}</TableCell>
                                <TableCell>{bed.charge}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingBed(bed); setIsEditDialogOpen(true); }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteBed(bed.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Bed</DialogTitle>
                        <DialogDescription>
                            Update bed details and status.
                        </DialogDescription>
                    </DialogHeader>
                    {editingBed && (
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-number">Bed Number</Label>
                                <Input
                                    id="edit-number"
                                    value={editingBed.number}
                                    onChange={(e) => setEditingBed({ ...editingBed, number: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-type">Type</Label>
                                <Select
                                    value={editingBed.type}
                                    onValueChange={(value: BedType) => setEditingBed({ ...editingBed, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="General">General</SelectItem>
                                        <SelectItem value="Private">Private</SelectItem>
                                        <SelectItem value="ICU">ICU</SelectItem>
                                        <SelectItem value="Emergency">Emergency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-charge">Charge (₹)</Label>
                                <Input
                                    id="edit-charge"
                                    type="number"
                                    value={editingBed.charge.replace('₹', '')}
                                    onChange={(e) => setEditingBed({ ...editingBed, charge: `₹${e.target.value}` })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-ward">Ward</Label>
                                <Input
                                    id="edit-ward"
                                    value={editingBed.ward}
                                    onChange={(e) => setEditingBed({ ...editingBed, ward: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-floor">Floor</Label>
                                <Input
                                    id="edit-floor"
                                    value={editingBed.floor}
                                    onChange={(e) => setEditingBed({ ...editingBed, floor: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-room">Room</Label>
                                <Input
                                    id="edit-room"
                                    value={editingBed.room}
                                    onChange={(e) => setEditingBed({ ...editingBed, room: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                    value={editingBed.status}
                                    onValueChange={(value: BedStatus) => setEditingBed({ ...editingBed, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Occupied">Occupied</SelectItem>
                                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 col-span-2 border-t pt-4 mt-2">
                                <Label htmlFor="edit-patient">Patient Name (Optional)</Label>
                                <Input
                                    id="edit-patient"
                                    value={editingBed.patientName || ""}
                                    onChange={(e) => setEditingBed({ ...editingBed, patientName: e.target.value })}
                                    placeholder="Enter patient name if occupied"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="edit-date">Admission Date (Optional)</Label>
                                <Input
                                    id="edit-date"
                                    type="date"
                                    value={editingBed.admissionDate || ""}
                                    onChange={(e) => setEditingBed({ ...editingBed, admissionDate: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={handleEditBed}>Update Bed</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BedsList;
