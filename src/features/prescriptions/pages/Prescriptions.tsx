import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Search, Plus, Eye, Pencil, Trash, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const initialRx = [
    { id: "RX-001", patient: "John Doe", doctor: "Dr. Smith", date: "2024-03-21", medicines: "Paracetamol, Amoxicillin" },
    { id: "RX-002", patient: "Jane Smith", doctor: "Dr. Brown", date: "2024-03-20", medicines: "Ibuprofen" },
];


interface Prescription {
    id: string;
    patient: string;
    doctor: string;
    date: string;
    medicines: string;
}

const Prescriptions = () => {
    const [rx, setRx] = useState<Prescription[]>(initialRx);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [newRx, setNewRx] = useState({
        patient: "",
        doctor: "",
        date: new Date().toISOString().split('T')[0],
        medicines: ""
    });

    const [editingRx, setEditingRx] = useState<Prescription | null>(null);

    const handleAddRx = () => {
        if (!newRx.patient || !newRx.doctor || !newRx.medicines) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        const prescription = {
            id: `RX-${String(rx.length + 1).padStart(3, '0')}`,
            ...newRx
        };

        setRx([...rx, prescription]);
        setIsAddDialogOpen(false);
        setNewRx({
            patient: "",
            doctor: "",
            date: new Date().toISOString().split('T')[0],
            medicines: ""
        });
        toast({
            title: "Success",
            description: "Prescription added successfully."
        });
    };

    const handleEditRx = () => {
        if (!editingRx.patient || !editingRx.doctor || !editingRx.medicines) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        setRx(rx.map(r => r.id === editingRx.id ? editingRx : r));
        setIsEditDialogOpen(false);
        setEditingRx(null);
        toast({
            title: "Success",
            description: "Prescription updated successfully."
        });
    };

    const handleDeleteRx = (id: string) => {
        setRx(rx.filter(r => r.id !== id));
        toast({
            title: "Success",
            description: "Prescription deleted successfully."
        });
    };

    const filteredRx = rx.filter(r =>
        r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Prescriptions</h1>
                    <p className="text-muted-foreground">Manage and track patient prescriptions.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Prescription
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Prescription</DialogTitle>
                            <DialogDescription>Create a new prescription record.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Patient Name</Label>
                                <Input value={newRx.patient} onChange={(e) => setNewRx({ ...newRx, patient: e.target.value })} placeholder="Enter patient name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Doctor</Label>
                                    <Input value={newRx.doctor} onChange={(e) => setNewRx({ ...newRx, doctor: e.target.value })} placeholder="Dr. Name" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input type="date" value={newRx.date} onChange={(e) => setNewRx({ ...newRx, date: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Medicines</Label>
                                <Textarea value={newRx.medicines} onChange={(e) => setNewRx({ ...newRx, medicines: e.target.value })} placeholder="List medicines..." />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddRx}>Save Prescription</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Prescription</DialogTitle>
                    </DialogHeader>
                    {editingRx && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Patient Name</Label>
                                <Input value={editingRx.patient} onChange={(e) => setEditingRx({ ...editingRx, patient: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Doctor</Label>
                                    <Input value={editingRx.doctor} onChange={(e) => setEditingRx({ ...editingRx, doctor: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input type="date" value={editingRx.date} onChange={(e) => setEditingRx({ ...editingRx, date: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Medicines</Label>
                                <Textarea value={editingRx.medicines} onChange={(e) => setEditingRx({ ...editingRx, medicines: e.target.value })} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={handleEditRx}>Update Prescription</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Prescription List</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search prescription..."
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
                                <TableHead>Rx ID</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Medicines</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRx.length > 0 ? (
                                filteredRx.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.id}</TableCell>
                                        <TableCell>{r.patient}</TableCell>
                                        <TableCell>{r.doctor}</TableCell>
                                        <TableCell>{r.date}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{r.medicines}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" title="View Details"><Eye className="h-4 w-4" /></Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => {
                                                            setEditingRx(r);
                                                            setIsEditDialogOpen(true);
                                                        }}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRx(r.id)}>
                                                            <Trash className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">No prescriptions found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Prescriptions;
