import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Plus, Calendar, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const LiveConsultancy = () => {
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
    const [editingConsultation, setEditingConsultation] = useState<any>(null);
    const [consultationsList, setConsultationsList] = useState([
        { id: 1, title: "Dr. Smith - Patient Checkup", date: "2024-03-21 10:00 AM", duration: "30 mins", by: "Dr. Smith", status: "Awaiting", details: "Routine monthly checkup for heart patient." },
        { id: 2, title: "Staff Meeting", date: "2024-03-21 02:00 PM", duration: "60 mins", by: "Admin", status: "Scheduled", details: "Weekly coordination meeting for surgical department." },
    ]);

    const [newConsultation, setNewConsultation] = useState({
        title: "",
        date: "",
        time: "",
        duration: "30 mins",
        by: "",
        details: ""
    });

    const handleAddConsultation = () => {
        if (!newConsultation.title || !newConsultation.date || !newConsultation.by) {
            toast({
                title: "Error",
                description: "Please fill in title, date and created by fields",
                variant: "destructive"
            });
            return;
        }

        const consultation = {
            id: consultationsList.length + 1,
            title: newConsultation.title,
            date: `${newConsultation.date} ${newConsultation.time}`,
            duration: newConsultation.duration,
            by: newConsultation.by,
            details: newConsultation.details,
            status: "Scheduled"
        };

        setConsultationsList([consultation, ...consultationsList]);
        setIsAddDialogOpen(false);
        setNewConsultation({
            title: "",
            date: "",
            time: "",
            duration: "30 mins",
            by: "",
            details: ""
        });

        toast({
            title: "Success",
            description: "Consultation added successfully"
        });
    };

    const handleEditConsultation = () => {
        if (!editingConsultation.title || !editingConsultation.date || !editingConsultation.by) {
            toast({
                title: "Error",
                description: "Please fill in title, date and created by fields",
                variant: "destructive"
            });
            return;
        }

        setConsultationsList(consultationsList.map(c => c.id === editingConsultation.id ? editingConsultation : c));
        setIsEditDialogOpen(false);
        setEditingConsultation(null);

        toast({
            title: "Success",
            description: "Consultation updated successfully"
        });
    };

    const handleDeleteConsultation = (id: number) => {
        setConsultationsList(consultationsList.filter(c => c.id !== id));
        toast({
            title: "Success",
            description: "Consultation deleted"
        });
    };

    return (
        <div className="space-y-6">
            {/* View Details Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Consultation Details</DialogTitle>
                    </DialogHeader>
                    {selectedConsultation && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Title</Label>
                                <p className="text-lg font-semibold">{selectedConsultation.title}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Date & Time</Label>
                                    <p className="font-medium">{selectedConsultation.date}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Duration</Label>
                                    <p className="font-medium">{selectedConsultation.duration}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Created By</Label>
                                    <p className="font-medium">{selectedConsultation.by}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Status</Label>
                                    <div>
                                        <Badge variant="outline">{selectedConsultation.status}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 border-t space-y-1">
                                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Details</Label>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedConsultation.details || "No additional details provided."}</p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDialogOpen(false)} className="w-full">Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Live Consultancy</h1>
                    <p className="text-muted-foreground">Manage live video consultations and meetings (Zoom/Google Meet).</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Consultation
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Consultation</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={newConsultation.title} onChange={(e) => setNewConsultation({ ...newConsultation, title: e.target.value })} placeholder="e.g. Patient Checkup" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" type="date" value={newConsultation.date} onChange={(e) => setNewConsultation({ ...newConsultation, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time">Time</Label>
                                    <Input id="time" type="time" value={newConsultation.time} onChange={(e) => setNewConsultation({ ...newConsultation, time: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration</Label>
                                    <Input id="duration" value={newConsultation.duration} onChange={(e) => setNewConsultation({ ...newConsultation, duration: e.target.value })} placeholder="e.g. 30 mins" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="by">Created By</Label>
                                    <Input id="by" value={newConsultation.by} onChange={(e) => setNewConsultation({ ...newConsultation, by: e.target.value })} placeholder="Doctor or Admin name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="details">Consultation Details</Label>
                                <Input id="details" value={newConsultation.details} onChange={(e) => setNewConsultation({ ...newConsultation, details: e.target.value })} placeholder="Enter detailed notes..." />
                            </div>
                        </div>
                        <Button onClick={handleAddConsultation} className="w-full">Save Consultation</Button>
                    </DialogContent>
                </Dialog>

                {/* Edit Consultation Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Consultation</DialogTitle>
                        </DialogHeader>
                        {editingConsultation && (
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-title">Title</Label>
                                    <Input id="edit-title" value={editingConsultation.title} onChange={(e) => setEditingConsultation({ ...editingConsultation, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-date">Date & Time</Label>
                                    <Input id="edit-date" value={editingConsultation.date} onChange={(e) => setEditingConsultation({ ...editingConsultation, date: e.target.value })} placeholder="e.g. 2024-03-21 10:00 AM" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-duration">Duration</Label>
                                        <Input id="edit-duration" value={editingConsultation.duration} onChange={(e) => setEditingConsultation({ ...editingConsultation, duration: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-by">Created By</Label>
                                        <Input id="edit-by" value={editingConsultation.by} onChange={(e) => setEditingConsultation({ ...editingConsultation, by: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-status">Status</Label>
                                    <Input id="edit-status" value={editingConsultation.status} onChange={(e) => setEditingConsultation({ ...editingConsultation, status: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-details">Consultation Details</Label>
                                    <Input id="edit-details" value={editingConsultation.details} onChange={(e) => setEditingConsultation({ ...editingConsultation, details: e.target.value })} />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={handleEditConsultation} className="w-full">Update Consultation</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Live Meetings</CardTitle>
                        <Video className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Generic active sessions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Consultancy List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Created By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {consultationsList.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">{c.title}</TableCell>
                                    <TableCell>{c.date}</TableCell>
                                    <TableCell>{c.duration}</TableCell>
                                    <TableCell>{c.by}</TableCell>
                                    <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">Start</Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => { setSelectedConsultation(c); setIsViewDialogOpen(true); }}>
                                                        <MoreHorizontal className="mr-2 h-4 w-4" /> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setEditingConsultation(c); setIsEditDialogOpen(true); }}>
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteConsultation(c.id)}>
                                                        <Trash className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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

export default LiveConsultancy;
