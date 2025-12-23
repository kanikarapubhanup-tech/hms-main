import { useState } from "react";
import { Search, Filter, MoreHorizontal, Droplet, Printer, Pencil, Trash2, Eye } from "lucide-react";
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const bloodIssues = [
    { id: 1, patient: "Sarah Johnson", doctor: "Dr. Wilson", donor: "James Smith", issueDate: "2024-03-20", bloodGroup: "A+", amount: "350ml" },
    { id: 2, patient: "Michael Brown", doctor: "Dr. Jones", donor: "Robert Taylor", issueDate: "2024-03-19", bloodGroup: "B-", amount: "450ml" },
    { id: 3, patient: "Emma Davis", doctor: "Dr. Brown", donor: "John Doe", issueDate: "2024-03-18", bloodGroup: "O+", amount: "350ml" },
    { id: 4, patient: "David Wilson", doctor: "Dr. Clark", donor: "Lisa Anderson", issueDate: "2024-03-17", bloodGroup: "AB-", amount: "350ml" },
    { id: 5, patient: "Jennifer Lee", doctor: "Dr. White", donor: "Thomas Moore", issueDate: "2024-03-16", bloodGroup: "B+", amount: "400ml" },
];

const BloodBankPortal = () => {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [issues, setIssues] = useState(bloodIssues);

    const [newIssue, setNewIssue] = useState({
        patient: "",
        doctor: "",
        donor: "",
        bloodGroup: "A+",
        amount: "",
        issueDate: new Date().toISOString().split('T')[0]
    });

    const [editingIssue, setEditingIssue] = useState<{ id: number; patient: string; doctor: string; donor: string; bloodGroup: string; amount: string; issueDate: string } | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditIssue = () => {
        if (!editingIssue || !editingIssue.patient || !editingIssue.doctor || !editingIssue.amount) {
            toast({
                title: "Error",
                description: "Please fill in all required fields",
                variant: "destructive"
            });
            return;
        }

        setIssues(issues.map((i) => (i.id === editingIssue.id ? editingIssue : i)));
        setIsEditDialogOpen(false);
        setEditingIssue(null);
        toast({
            title: "Success",
            description: "Blood issue record updated successfully"
        });
    };

    const handleDeleteIssue = (id: number) => {
        setIssues(issues.filter((i) => i.id !== id));
        toast({
            title: "Success",
            description: "Blood issue record deleted successfully"
        });
    };

    const handleIssueBlood = () => {
        if (!newIssue.patient || !newIssue.doctor || !newIssue.donor || !newIssue.amount) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive"
            });
            return;
        }

        const issue = {
            id: issues.length + 1,
            ...newIssue
        };

        setIssues([issue, ...issues]);
        setIsAddDialogOpen(false);
        setNewIssue({
            patient: "",
            doctor: "",
            donor: "",
            bloodGroup: "A+",
            amount: "",
            issueDate: new Date().toISOString().split('T')[0]
        });

        toast({
            title: "Success",
            description: "Blood issued successfully"
        });
    };

    const filteredIssues = issues.filter(issue =>
        issue.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.donor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="page-title">Blood Bank Portal</h1>
                    <p className="page-subtitle">Manage blood issue records and donor details</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-red-600 hover:bg-red-700">
                            <Droplet className="h-4 w-4 mr-2" />
                            Issue Blood
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Issue Blood</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="patient" className="text-right text-xs">Patient Name</Label>
                                <Input id="patient" value={newIssue.patient} onChange={(e) => setNewIssue({ ...newIssue, patient: e.target.value })} className="col-span-3 h-8" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="doctor" className="text-right text-xs">Doctor Name</Label>
                                <Input id="doctor" value={newIssue.doctor} onChange={(e) => setNewIssue({ ...newIssue, doctor: e.target.value })} className="col-span-3 h-8" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="donor" className="text-right text-xs">Donor Name</Label>
                                <Input id="donor" value={newIssue.donor} onChange={(e) => setNewIssue({ ...newIssue, donor: e.target.value })} className="col-span-3 h-8" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bloodGroup" className="text-right text-xs">Blood Group</Label>
                                <Input id="bloodGroup" value={newIssue.bloodGroup} onChange={(e) => setNewIssue({ ...newIssue, bloodGroup: e.target.value })} className="col-span-3 h-8" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right text-xs">Amount</Label>
                                <Input id="amount" value={newIssue.amount} onChange={(e) => setNewIssue({ ...newIssue, amount: e.target.value })} placeholder="e.g. 350ml" className="col-span-3 h-8" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="issueDate" className="text-right text-xs">Issue Date</Label>
                                <Input id="issueDate" type="date" value={newIssue.issueDate} onChange={(e) => setNewIssue({ ...newIssue, issueDate: e.target.value })} className="col-span-3 h-8" />
                            </div>
                        </div>
                        <Button onClick={handleIssueBlood} className="bg-red-600 hover:bg-red-700 w-full h-8 text-xs">Save Record</Button>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Blood Issue Record</DialogTitle>
                        </DialogHeader>
                        {editingIssue && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-patient" className="text-right text-xs">Patient Name</Label>
                                    <Input id="edit-patient" value={editingIssue.patient} onChange={(e) => setEditingIssue({ ...editingIssue, patient: e.target.value })} className="col-span-3 h-8" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-doctor" className="text-right text-xs">Doctor Name</Label>
                                    <Input id="edit-doctor" value={editingIssue.doctor} onChange={(e) => setEditingIssue({ ...editingIssue, doctor: e.target.value })} className="col-span-3 h-8" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-donor" className="text-right text-xs">Donor Name</Label>
                                    <Input id="edit-donor" value={editingIssue.donor} onChange={(e) => setEditingIssue({ ...editingIssue, donor: e.target.value })} className="col-span-3 h-8" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-bloodGroup" className="text-right text-xs">Blood Group</Label>
                                    <Input id="edit-bloodGroup" value={editingIssue.bloodGroup} onChange={(e) => setEditingIssue({ ...editingIssue, bloodGroup: e.target.value })} className="col-span-3 h-8" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-amount" className="text-right text-xs">Amount</Label>
                                    <Input id="edit-amount" value={editingIssue.amount} onChange={(e) => setEditingIssue({ ...editingIssue, amount: e.target.value })} className="col-span-3 h-8" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-issueDate" className="text-right text-xs">Issue Date</Label>
                                    <Input id="edit-issueDate" type="date" value={editingIssue.issueDate} onChange={(e) => setEditingIssue({ ...editingIssue, issueDate: e.target.value })} className="col-span-3 h-8" />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleEditIssue} className="bg-red-600 hover:bg-red-700 w-full h-8 text-xs">Update Record</Button>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by patient or donor..."
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
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Doctor Name</TableHead>
                                <TableHead>Donor Name</TableHead>
                                <TableHead>Issue Date</TableHead>
                                <TableHead>Blood Group</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="w-[50px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredIssues.map((issue) => (
                                <TableRow key={issue.id}>
                                    <TableCell className="font-medium">{issue.patient}</TableCell>
                                    <TableCell>{issue.doctor}</TableCell>
                                    <TableCell>{issue.donor}</TableCell>
                                    <TableCell>{issue.issueDate}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                            {issue.bloodGroup}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{issue.amount}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { setEditingIssue(issue); setIsEditDialogOpen(true); }}>
                                                    <Pencil className="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteIssue(issue.id)}>
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Printer className="h-4 w-4 mr-2" />
                                                    Print
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>Issue History</DropdownMenuItem>
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

export default BloodBankPortal;
