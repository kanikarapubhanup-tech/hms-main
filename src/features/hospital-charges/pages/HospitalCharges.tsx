import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialCharges = [
    { id: 1, type: "OPD", category: "Consultation", name: "General Consultation", code: "OPD-001", charge: 500, tax: 18 },
    { id: 2, type: "IPD", category: "Room Rent", name: "Private Ward AC", code: "IPD-RM-01", charge: 2500, tax: 12 },
    { id: 3, type: "Pathology", category: "Blood Test", name: "CBC", code: "PATH-CBC", charge: 350, tax: 0 },
    { id: 4, type: "Radiology", category: "X-Ray", name: "Chest X-Ray", code: "RAD-XR-01", charge: 800, tax: 5 },
];

const HospitalCharges = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [charges, setCharges] = useState(initialCharges);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingCharge, setEditingCharge] = useState<any>(null);
    const { toast } = useToast();

    const [newCharge, setNewCharge] = useState({
        type: "OPD",
        category: "",
        name: "",
        code: "",
        charge: "",
        tax: ""
    });

    const handleEditCharge = () => {
        if (!editingCharge.name || !editingCharge.charge) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        setCharges(charges.map(c => c.id === editingCharge.id ? {
            ...editingCharge,
            charge: parseFloat(editingCharge.charge),
            tax: parseFloat(editingCharge.tax) || 0
        } : c));
        setIsEditDialogOpen(false);
        setEditingCharge(null);

        toast({
            title: "Success",
            description: "Charge updated successfully.",
        });
    };

    const handleDeleteCharge = (id: number) => {
        setCharges(charges.filter(c => c.id !== id));
        toast({
            title: "Success",
            description: "Charge deleted successfully.",
        });
    };

    const handleAddCharge = () => {
        if (!newCharge.name || !newCharge.charge) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const charge = {
            id: charges.length + 1,
            type: newCharge.type,
            category: newCharge.category,
            name: newCharge.name,
            code: newCharge.code,
            charge: parseFloat(newCharge.charge),
            tax: parseFloat(newCharge.tax) || 0
        };

        setCharges([...charges, charge]);
        setIsAddDialogOpen(false);
        setNewCharge({
            type: "OPD",
            category: "",
            name: "",
            code: "",
            charge: "",
            tax: ""
        });

        toast({
            title: "Success",
            description: "Charge added successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hospital Charges</h1>
                    <p className="text-muted-foreground">Manage standard charges for various services.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Charge
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Charge</DialogTitle>
                            <DialogDescription>
                                Set a standard charge for a hospital service.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Type
                                </Label>
                                <Select
                                    value={newCharge.type}
                                    onValueChange={(value) => setNewCharge({ ...newCharge, type: value })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="OPD">OPD</SelectItem>
                                        <SelectItem value="IPD">IPD</SelectItem>
                                        <SelectItem value="Pathology">Pathology</SelectItem>
                                        <SelectItem value="Radiology">Radiology</SelectItem>
                                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newCharge.name}
                                    onChange={(e) => setNewCharge({ ...newCharge, name: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Service Name"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="code" className="text-right">
                                    Code
                                </Label>
                                <Input
                                    id="code"
                                    value={newCharge.code}
                                    onChange={(e) => setNewCharge({ ...newCharge, code: e.target.value })}
                                    className="col-span-3"
                                    placeholder="SVC-001"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <Input
                                    id="category"
                                    value={newCharge.category}
                                    onChange={(e) => setNewCharge({ ...newCharge, category: e.target.value })}
                                    className="col-span-3"
                                    placeholder="General"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="charge" className="text-right">
                                    Charge (₹)
                                </Label>
                                <Input
                                    id="charge"
                                    type="number"
                                    value={newCharge.charge}
                                    onChange={(e) => setNewCharge({ ...newCharge, charge: e.target.value })}
                                    className="col-span-3"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tax" className="text-right">
                                    Tax (%)
                                </Label>
                                <Input
                                    id="tax"
                                    type="number"
                                    value={newCharge.tax}
                                    onChange={(e) => setNewCharge({ ...newCharge, tax: e.target.value })}
                                    className="col-span-3"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddCharge}>Add Charge</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Charge Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Charge</DialogTitle>
                            <DialogDescription>
                                Update the details for this hospital service charge.
                            </DialogDescription>
                        </DialogHeader>
                        {editingCharge && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-type" className="text-right">
                                        Type
                                    </Label>
                                    <Select
                                        value={editingCharge.type}
                                        onValueChange={(value) => setEditingCharge({ ...editingCharge, type: value })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="OPD">OPD</SelectItem>
                                            <SelectItem value="IPD">IPD</SelectItem>
                                            <SelectItem value="Pathology">Pathology</SelectItem>
                                            <SelectItem value="Radiology">Radiology</SelectItem>
                                            <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                                            <SelectItem value="Laboratory">Laboratory</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="edit-name"
                                        value={editingCharge.name}
                                        onChange={(e) => setEditingCharge({ ...editingCharge, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-code" className="text-right">
                                        Code
                                    </Label>
                                    <Input
                                        id="edit-code"
                                        value={editingCharge.code}
                                        onChange={(e) => setEditingCharge({ ...editingCharge, code: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-category" className="text-right">
                                        Category
                                    </Label>
                                    <Input
                                        id="edit-category"
                                        value={editingCharge.category}
                                        onChange={(e) => setEditingCharge({ ...editingCharge, category: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-charge" className="text-right">
                                        Charge (₹)
                                    </Label>
                                    <Input
                                        id="edit-charge"
                                        type="number"
                                        value={editingCharge.charge}
                                        onChange={(e) => setEditingCharge({ ...editingCharge, charge: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-tax" className="text-right">
                                        Tax (%)
                                    </Label>
                                    <Input
                                        id="edit-tax"
                                        type="number"
                                        value={editingCharge.tax}
                                        onChange={(e) => setEditingCharge({ ...editingCharge, tax: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditCharge}>Update Charge</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Standard Charges List</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or code..."
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
                                <TableHead>Charge Name</TableHead>
                                <TableHead>Charge Type</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead className="text-right">Std Charge (₹)</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {charges.map((charge) => (
                                <TableRow key={charge.id}>
                                    <TableCell className="font-medium">{charge.name}</TableCell>
                                    <TableCell><Badge variant="outline">{charge.type}</Badge></TableCell>
                                    <TableCell>{charge.category}</TableCell>
                                    <TableCell>{charge.code}</TableCell>
                                    <TableCell className="text-right">{charge.charge.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => {
                                                    setEditingCharge({ ...charge, charge: charge.charge.toString(), tax: charge.tax.toString() });
                                                    setIsEditDialogOpen(true);
                                                }}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCharge(charge.id)}>
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

export default HospitalCharges;
