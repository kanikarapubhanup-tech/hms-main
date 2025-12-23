import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const initialAssigns = [
    { ipdNo: "IPD-001", patient: "John Doe", bed: "101", assignDate: "2024-03-10", dischargeDate: "-", status: "Active" },
    { ipdNo: "IPD-002", patient: "Jane Smith", bed: "201", assignDate: "2024-03-12", dischargeDate: "-", status: "Active" },
    { ipdNo: "IPD-003", patient: "Robert Brown", bed: "305", assignDate: "2024-03-05", dischargeDate: "2024-03-15", status: "Discharged" },
];

const BedAssigns = () => {
    const [assigns, setAssigns] = useState(initialAssigns);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingAssign, setEditingAssign] = useState<any>(null);
    const { toast } = useToast();

    const handleDischarge = (ipdNo: string) => {
        setAssigns(assigns.map(a =>
            a.ipdNo === ipdNo
                ? { ...a, status: "Discharged", dischargeDate: new Date().toISOString().split('T')[0] }
                : a
        ));
        toast({
            title: "Success",
            description: "Patient discharged and bed released."
        });
    };

    const handleEditAssign = () => {
        if (!editingAssign) return;
        setAssigns(assigns.map(a => a.ipdNo === editingAssign.ipdNo ? editingAssign : a));
        setIsEditDialogOpen(false);
        setEditingAssign(null);
        toast({
            title: "Success",
            description: "Assignment details updated."
        });
    };

    return (
        <div className="space-y-4">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Assignment</DialogTitle>
                    </DialogHeader>
                    {editingAssign && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Bed Number</Label>
                                <Input
                                    value={editingAssign.bed}
                                    onChange={(e) => setEditingAssign({ ...editingAssign, bed: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Discharge Date</Label>
                                <Input
                                    value={editingAssign.dischargeDate}
                                    onChange={(e) => setEditingAssign({ ...editingAssign, dischargeDate: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={handleEditAssign}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>IPD No</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Bed Number</TableHead>
                            <TableHead>Assign Date</TableHead>
                            <TableHead>Discharge Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[50px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assigns.map((assign) => (
                            <TableRow key={assign.ipdNo}>
                                <TableCell className="font-medium">{assign.ipdNo}</TableCell>
                                <TableCell>{assign.patient}</TableCell>
                                <TableCell>{assign.bed}</TableCell>
                                <TableCell>{assign.assignDate}</TableCell>
                                <TableCell>{assign.dischargeDate}</TableCell>
                                <TableCell>
                                    <Badge variant={assign.status === "Active" ? "default" : "secondary"}>
                                        {assign.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => {
                                                setEditingAssign(assign);
                                                setIsEditDialogOpen(true);
                                            }}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={() => handleDischarge(assign.ipdNo)}
                                                disabled={assign.status === "Discharged"}
                                            >
                                                Discharge
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BedAssigns;
