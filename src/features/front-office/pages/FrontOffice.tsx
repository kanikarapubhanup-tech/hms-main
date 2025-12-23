import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, UserPlus, PhoneCall, Calendar, MoreHorizontal, Pencil, Trash, Phone } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useToast } from "@/hooks/use-toast";

const FrontOffice = () => {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingVisitor, setEditingVisitor] = useState<any>(null);
    const [visitorsList, setVisitorsList] = useState([
        { id: 1, name: "John Smith", purpose: "Visit Patient", phone: "123-456-7890", date: "2024-03-20 09:00 AM", status: "Checked In" },
        { id: 2, name: "Sarah Doe", purpose: "Appointment", phone: "987-654-3210", date: "2024-03-20 09:30 AM", status: "Waiting" },
        { id: 3, name: "Mike Ross", purpose: "Inquiry", phone: "456-123-7890", date: "2024-03-20 10:00 AM", status: "Checked Out" },
    ]);

    const [callsList, setCallsList] = useState([
        { id: 1, name: "Alice Brown", phone: "555-0101", date: "2024-03-20 10:15 AM", description: "Inquiry about room rates", type: "Incoming" },
        { id: 2, name: "Bob Wilson", phone: "555-0202", date: "2024-03-20 11:30 AM", description: "Follow up on appointment", type: "Outgoing" },
    ]);

    const [isCallLogDialogOpen, setIsCallLogDialogOpen] = useState(false);
    const [editingCall, setEditingCall] = useState<any>(null);
    const [isEditCallDialogOpen, setIsEditCallDialogOpen] = useState(false);

    const [newVisitor, setNewVisitor] = useState({
        name: "",
        purpose: "",
        phone: "",
        date: new Date().toISOString().split('T')[0],
        time: ""
    });

    const [newCall, setNewCall] = useState({
        name: "",
        phone: "",
        description: "",
        type: "Incoming"
    });

    const handleAddVisitor = () => {
        if (!newVisitor.name || !newVisitor.purpose || !newVisitor.phone) {
            toast({
                title: "Error",
                description: "Please fill in name, purpose and phone fields",
                variant: "destructive"
            });
            return;
        }

        const visitor = {
            id: visitorsList.length + 1,
            name: newVisitor.name,
            purpose: newVisitor.purpose,
            phone: newVisitor.phone,
            date: `${newVisitor.date} ${newVisitor.time}`,
            status: "Checked In"
        };

        setVisitorsList([visitor, ...visitorsList]);
        setIsAddDialogOpen(false);
        setNewVisitor({
            name: "",
            purpose: "",
            phone: "",
            date: new Date().toISOString().split('T')[0],
            time: ""
        });

        toast({
            title: "Success",
            description: "Visitor added successfully"
        });
    };

    const handleAddCall = () => {
        if (!newCall.name || !newCall.phone) {
            toast({
                title: "Error",
                description: "Please fill in name and phone fields",
                variant: "destructive"
            });
            return;
        }

        const call = {
            id: callsList.length + 1,
            name: newCall.name,
            phone: newCall.phone,
            date: new Date().toLocaleString(),
            description: newCall.description,
            type: newCall.type
        };

        setCallsList([call, ...callsList]);
        setIsCallLogDialogOpen(false);
        setNewCall({ name: "", phone: "", description: "", type: "Incoming" });

        toast({
            title: "Success",
            description: "Call logged successfully"
        });
    };

    const handleEditCall = () => {
        if (!editingCall.name || !editingCall.phone) {
            toast({
                title: "Error",
                description: "Please fill in name and phone fields",
                variant: "destructive"
            });
            return;
        }

        setCallsList(callsList.map(c => c.id === editingCall.id ? editingCall : c));
        setIsEditCallDialogOpen(false);
        setEditingCall(null);

        toast({
            title: "Success",
            description: "Call log updated successfully"
        });
    };

    const handleDeleteCall = (id: number) => {
        setCallsList(callsList.filter(c => c.id !== id));
        toast({
            title: "Success",
            description: "Call log deleted successfully"
        });
    };

    const handleEditVisitor = () => {
        if (!editingVisitor.name || !editingVisitor.purpose || !editingVisitor.phone) {
            toast({
                title: "Error",
                description: "Please fill in name, purpose and phone fields",
                variant: "destructive"
            });
            return;
        }

        setVisitorsList(visitorsList.map(v => v.id === editingVisitor.id ? editingVisitor : v));
        setIsEditDialogOpen(false);
        setEditingVisitor(null);

        toast({
            title: "Success",
            description: "Visitor details updated successfully"
        });
    };

    const handleDeleteVisitor = (id: number) => {
        setVisitorsList(visitorsList.filter(v => v.id !== id));
        toast({
            title: "Success",
            description: "Visitor record deleted"
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Front Office</h1>
                    <p className="text-muted-foreground">Manage visitors, postal dispatch, and reception queries.</p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" /> Add Visitor
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add New Visitor</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Visitor Name</Label>
                                    <Input id="name" value={newVisitor.name} onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })} placeholder="Enter visitor name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="purpose">Purpose</Label>
                                    <Input id="purpose" value={newVisitor.purpose} onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })} placeholder="e.g. Visit Patient, Inquiry" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" value={newVisitor.phone} onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })} placeholder="Enter phone number" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input id="date" type="date" value={newVisitor.date} onChange={(e) => setNewVisitor({ ...newVisitor, date: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Time</Label>
                                        <Input id="time" type="time" value={newVisitor.time} onChange={(e) => setNewVisitor({ ...newVisitor, time: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <Button onClick={handleAddVisitor} className="w-full">Save Visitor</Button>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Visitor Dialog */}
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit Visitor</DialogTitle>
                            </DialogHeader>
                            {editingVisitor && (
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-name">Visitor Name</Label>
                                        <Input id="edit-name" value={editingVisitor.name} onChange={(e) => setEditingVisitor({ ...editingVisitor, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-purpose">Purpose</Label>
                                        <Input id="edit-purpose" value={editingVisitor.purpose} onChange={(e) => setEditingVisitor({ ...editingVisitor, purpose: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-phone">Phone Number</Label>
                                        <Input id="edit-phone" value={editingVisitor.phone} onChange={(e) => setEditingVisitor({ ...editingVisitor, phone: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-date-time">Date/Time</Label>
                                        <Input id="edit-date-time" value={editingVisitor.date} onChange={(e) => setEditingVisitor({ ...editingVisitor, date: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-status">Status</Label>
                                        <Input id="edit-status" value={editingVisitor.status} onChange={(e) => setEditingVisitor({ ...editingVisitor, status: e.target.value })} />
                                    </div>
                                </div>
                            )}
                            <DialogFooter>
                                <Button onClick={handleEditVisitor} className="w-full">Update Visitor</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isCallLogDialogOpen} onOpenChange={setIsCallLogDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <PhoneCall className="mr-2 h-4 w-4" /> Log Call
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Log New Call</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="call-name">Caller Name</Label>
                                    <Input id="call-name" value={newCall.name} onChange={(e) => setNewCall({ ...newCall, name: e.target.value })} placeholder="Enter name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="call-phone">Phone Number</Label>
                                    <Input id="call-phone" value={newCall.phone} onChange={(e) => setNewCall({ ...newCall, phone: e.target.value })} placeholder="Enter phone" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="call-description">Description/Notes</Label>
                                    <Input id="call-description" value={newCall.description} onChange={(e) => setNewCall({ ...newCall, description: e.target.value })} placeholder="Purpose of call" />
                                </div>
                            </div>
                            <Button onClick={handleAddCall} className="w-full">Log Call</Button>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Call Dialog */}
                    <Dialog open={isEditCallDialogOpen} onOpenChange={setIsEditCallDialogOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit Call Log</DialogTitle>
                            </DialogHeader>
                            {editingCall && (
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-call-name">Caller Name</Label>
                                        <Input id="edit-call-name" value={editingCall.name} onChange={(e) => setEditingCall({ ...editingCall, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-call-phone">Phone Number</Label>
                                        <Input id="edit-call-phone" value={editingCall.phone} onChange={(e) => setEditingCall({ ...editingCall, phone: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-call-description">Description</Label>
                                        <Input id="edit-call-description" value={editingCall.description} onChange={(e) => setEditingCall({ ...editingCall, description: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-call-type">Type</Label>
                                        <Input id="edit-call-type" value={editingCall.type} onChange={(e) => setEditingCall({ ...editingCall, type: e.target.value })} />
                                    </div>
                                </div>
                            )}
                            <DialogFooter>
                                <Button onClick={handleEditCall} className="w-full">Update Call Log</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Pending Queries</CardTitle>
                        <PhoneCall className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground text-orange-500">Action required</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">32</div>
                        <p className="text-xs text-muted-foreground">Scheduled for today</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="visitors" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="visitors">Visitor Log</TabsTrigger>
                    <TabsTrigger value="calls">Call Log</TabsTrigger>
                </TabsList>

                <TabsContent value="visitors">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Visitor Log</CardTitle>
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search visitors..."
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
                                        <TableHead>Visitor Name</TableHead>
                                        <TableHead>Purpose</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Date/Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {visitorsList.filter(v =>
                                        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        v.purpose.toLowerCase().includes(searchTerm.toLowerCase())
                                    ).map((visitor) => (
                                        <TableRow key={visitor.id}>
                                            <TableCell className="font-medium">{visitor.name}</TableCell>
                                            <TableCell>{visitor.purpose}</TableCell>
                                            <TableCell>{visitor.phone}</TableCell>
                                            <TableCell>{visitor.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={visitor.status === 'Checked In' ? 'default' : 'secondary'}>{visitor.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Details</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => { setEditingVisitor(visitor); setIsEditDialogOpen(true); }}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteVisitor(visitor.id)}>
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
                </TabsContent>

                <TabsContent value="calls">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Phone Call Log</CardTitle>
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search calls..."
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
                                        <TableHead>Caller Name</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Date/Time</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {callsList.filter(c =>
                                        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        c.description.toLowerCase().includes(searchTerm.toLowerCase())
                                    ).map((call) => (
                                        <TableRow key={call.id}>
                                            <TableCell className="font-medium">{call.name}</TableCell>
                                            <TableCell>{call.phone}</TableCell>
                                            <TableCell>{call.date}</TableCell>
                                            <TableCell>{call.description}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{call.type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => { setEditingCall(call); setIsEditCallDialogOpen(true); }}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCall(call.id)}>
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
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default FrontOffice;
