import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PhoneCall, Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialEnquiries = [
    { id: 1, name: "Alice Brown", phone: "555-0123", subject: "Appointment Availability", date: "2024-03-21", status: "Open" },
    { id: 2, name: "Charlie Green", phone: "555-0124", subject: "Treatment Cost", date: "2024-03-20", status: "Closed" },
];

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState(initialEnquiries);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [newEnquiry, setNewEnquiry] = useState({
        name: "",
        phone: "",
        subject: "",
        status: "Open"
    });
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingEnquiry, setEditingEnquiry] = useState<any>(null);

    const handleAddEnquiry = () => {
        if (!newEnquiry.name || !newEnquiry.phone || !newEnquiry.subject) {
            toast({
                title: "Error",
                description: "Name, Phone and Subject are required.",
                variant: "destructive",
            });
            return;
        }

        const enquiry = {
            id: enquiries.length + 1,
            name: newEnquiry.name,
            phone: newEnquiry.phone,
            subject: newEnquiry.subject,
            date: new Date().toISOString().split('T')[0],
            status: newEnquiry.status,
        };

        setEnquiries([enquiry, ...enquiries]);
        setIsAddDialogOpen(false);
        setNewEnquiry({
            name: "",
            phone: "",
            subject: "",
            status: "Open"
        });

        toast({
            title: "Success",
            description: "Enquiry added successfully.",
        });
    };

    const handleEditEnquiry = () => {
        if (!editingEnquiry.name || !editingEnquiry.phone || !editingEnquiry.subject) {
            toast({
                title: "Error",
                description: "Name, Phone and Subject are required.",
                variant: "destructive",
            });
            return;
        }

        setEnquiries(enquiries.map(e => e.id === editingEnquiry.id ? editingEnquiry : e));
        setIsEditDialogOpen(false);
        setEditingEnquiry(null);

        toast({
            title: "Success",
            description: "Enquiry updated successfully.",
        });
    };

    const handleDeleteEnquiry = (id: number) => {
        setEnquiries(enquiries.filter(e => e.id !== id));
        toast({
            title: "Success",
            description: "Enquiry deleted successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Enquiries</h1>
                    <p className="text-muted-foreground">Track general enquiries from patients/visitors.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Enquiry
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Enquiry</DialogTitle>
                            <DialogDescription>
                                Log a new enquiry from a patient or visitor.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newEnquiry.name}
                                    onChange={(e) => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Alice Brown"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    value={newEnquiry.phone}
                                    onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                                    className="col-span-3"
                                    placeholder="555-0123"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                    Subject
                                </Label>
                                <Input
                                    id="subject"
                                    value={newEnquiry.subject}
                                    onChange={(e) => setNewEnquiry({ ...newEnquiry, subject: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Appointment Query"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddEnquiry}>Add Enquiry</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Enquiry Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Enquiry</DialogTitle>
                            <DialogDescription>
                                Update the enquiry details.
                            </DialogDescription>
                        </DialogHeader>
                        {editingEnquiry && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editingEnquiry.name}
                                        onChange={(e) => setEditingEnquiry({ ...editingEnquiry, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-phone" className="text-right">Phone</Label>
                                    <Input
                                        id="edit-phone"
                                        value={editingEnquiry.phone}
                                        onChange={(e) => setEditingEnquiry({ ...editingEnquiry, phone: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-subject" className="text-right">Subject</Label>
                                    <Input
                                        id="edit-subject"
                                        value={editingEnquiry.subject}
                                        onChange={(e) => setEditingEnquiry({ ...editingEnquiry, subject: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-status" className="text-right">Status</Label>
                                    <Select
                                        value={editingEnquiry.status}
                                        onValueChange={(val) => setEditingEnquiry({ ...editingEnquiry, status: val })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditEnquiry}>Update Enquiry</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <PhoneCall className="h-5 w-5" /> Recent Enquiries
                        </CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search enquiries..." className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {enquiries.map((e) => (
                                <TableRow key={e.id}>
                                    <TableCell className="font-medium">{e.name}</TableCell>
                                    <TableCell>{e.phone}</TableCell>
                                    <TableCell>{e.subject}</TableCell>
                                    <TableCell>{e.date}</TableCell>
                                    <TableCell><Badge variant={e.status === "Open" ? "secondary" : "default"}>{e.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => {
                                                    setEditingEnquiry(e);
                                                    setIsEditDialogOpen(true);
                                                }}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteEnquiry(e.id)}>
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
        </div >
    );
};

export default Enquiries;
