import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Printer, Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialReports = [
    { id: 1, patient: "John Doe", test: "CBC", doctor: "Dr. Smith", date: "2024-03-21", status: "Completed" },
    { id: 2, patient: "Jane Smith", test: "X-Ray Chest", doctor: "Dr. Brown", date: "2024-03-21", status: "Pending" },
];

const LabReports = () => {
    const [reports, setReports] = useState(initialReports);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [newReport, setNewReport] = useState({
        patient: "",
        test: "",
        doctor: "",
        date: new Date().toISOString().split('T')[0],
        status: "Pending"
    });

    const [editingReport, setEditingReport] = useState<any>(null);

    const handleAddReport = () => {
        if (!newReport.patient || !newReport.test || !newReport.doctor) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        const report = {
            id: reports.length + 1,
            ...newReport
        };

        setReports([...reports, report]);
        setIsAddDialogOpen(false);
        setNewReport({
            patient: "",
            test: "",
            doctor: "",
            date: new Date().toISOString().split('T')[0],
            status: "Pending"
        });
        toast({
            title: "Success",
            description: "Lab report added successfully."
        });
    };

    const handleEditReport = () => {
        if (!editingReport.patient || !editingReport.test || !editingReport.doctor) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        setReports(reports.map(r => r.id === editingReport.id ? editingReport : r));
        setIsEditDialogOpen(false);
        setEditingReport(null);
        toast({
            title: "Success",
            description: "Lab report updated successfully."
        });
    };

    const handleDeleteReport = (id: number) => {
        setReports(reports.filter(r => r.id !== id));
        toast({
            title: "Success",
            description: "Lab report deleted successfully."
        });
    };

    const filteredReports = reports.filter(r =>
        r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.test.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Lab Reports</h1>
                    <p className="text-muted-foreground">View and print patient laboratory test reports.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Report
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Lab Report</DialogTitle>
                            <DialogDescription>Create a new lab report record.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Patient Name</Label>
                                <Input value={newReport.patient} onChange={(e) => setNewReport({ ...newReport, patient: e.target.value })} placeholder="Enter patient name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Test Name</Label>
                                    <Input value={newReport.test} onChange={(e) => setNewReport({ ...newReport, test: e.target.value })} placeholder="e.g. CBC" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Doctor</Label>
                                    <Input value={newReport.doctor} onChange={(e) => setNewReport({ ...newReport, doctor: e.target.value })} placeholder="Dr. Name" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input type="date" value={newReport.date} onChange={(e) => setNewReport({ ...newReport, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select value={newReport.status} onValueChange={(val) => setNewReport({ ...newReport, status: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddReport}>Save Report</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Lab Report</DialogTitle>
                    </DialogHeader>
                    {editingReport && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Patient Name</Label>
                                <Input value={editingReport.patient} onChange={(e) => setEditingReport({ ...editingReport, patient: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Test Name</Label>
                                    <Input value={editingReport.test} onChange={(e) => setEditingReport({ ...editingReport, test: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Doctor</Label>
                                    <Input value={editingReport.doctor} onChange={(e) => setEditingReport({ ...editingReport, doctor: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input type="date" value={editingReport.date} onChange={(e) => setEditingReport({ ...editingReport, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select value={editingReport.status} onValueChange={(val) => setEditingReport({ ...editingReport, status: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={handleEditReport}>Update Report</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Reports List</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search reports..."
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
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Consultant</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReports.length > 0 ? (
                                filteredReports.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.patient}</TableCell>
                                        <TableCell>{r.test}</TableCell>
                                        <TableCell>{r.doctor}</TableCell>
                                        <TableCell>{r.date}</TableCell>
                                        <TableCell><Badge variant={r.status === "Completed" ? "default" : "secondary"}>{r.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" title="Print"><Printer className="h-4 w-4" /></Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => {
                                                            setEditingReport(r);
                                                            setIsEditDialogOpen(true);
                                                        }}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteReport(r.id)}>
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
                                    <TableCell colSpan={6} className="text-center h-24">No reports found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default LabReports;
