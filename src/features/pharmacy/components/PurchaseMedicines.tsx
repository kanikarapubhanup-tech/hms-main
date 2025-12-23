
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Eye, Printer, FileText, MoreHorizontal, Pencil, Trash } from "lucide-react";

// Mock Data
const initialPurchases = [
    { id: 1, purchaseNo: "PUR-2024-001", total: 1000, tax: 50, net: 1050, status: "Paid", mode: "Cash" },
    { id: 2, purchaseNo: "PUR-2024-002", total: 5000, tax: 250, net: 5250, status: "Pending", mode: "Bank Transfer" },
    { id: 3, purchaseNo: "PUR-2024-003", total: 750, tax: 37.5, net: 787.5, status: "Paid", mode: "Card" },
];


interface Purchase {
    id: number;
    purchaseNo: string;
    total: number;
    tax: number;
    net: number;
    status: string;
    mode: string;
    supplier?: string;
}

const PurchaseMedicines = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newPurchase, setNewPurchase] = useState({
        supplier: "",
        total: "",
        tax: "",
        mode: "Cash"
    });
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);

    const handleAddPurchase = () => {
        if (!newPurchase.supplier || !newPurchase.total) {
            toast({
                title: "Error",
                description: "Supplier and Total are required",
                variant: "destructive"
            });
            return;
        }

        const purchase = {
            id: purchases.length + 1,
            purchaseNo: `PUR-2024-00${purchases.length + 1}`,
            total: parseFloat(newPurchase.total),
            tax: parseFloat(newPurchase.tax || "0"),
            net: parseFloat(newPurchase.total) + parseFloat(newPurchase.tax || "0"),
            status: "Pending",
            mode: newPurchase.mode
        };

        setPurchases([purchase, ...purchases]);
        setIsAddDialogOpen(false);
        setNewPurchase({ supplier: "", total: "", tax: "", mode: "Cash" });

        toast({
            title: "Success",
            description: "Purchase record added successfully"
        });
    };

    const handleEditPurchase = () => {
        if (!editingPurchase.supplier || !editingPurchase.total) {
            toast({
                title: "Error",
                description: "Supplier and Total are required",
                variant: "destructive"
            });
            return;
        }

        const updatedPurchase = {
            ...editingPurchase,
            total: editingPurchase.total,
            tax: editingPurchase.tax,
            net: editingPurchase.total + (editingPurchase.tax || 0),
        };

        setPurchases(purchases.map(p => p.id === editingPurchase.id ? updatedPurchase : p));
        setIsEditDialogOpen(false);
        setEditingPurchase(null);
        toast({
            title: "Success",
            description: "Purchase record updated successfully"
        });
    };

    const handleDeletePurchase = (id: number) => {
        setPurchases(purchases.filter(p => p.id !== id));
        toast({
            title: "Success",
            description: "Purchase record deleted successfully"
        });
    };

    const filteredPurchases = purchases.filter((purchase) =>
        purchase.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search Purchase Number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="date"
                            className="w-[150px]"
                            title="Start Date"
                        />
                        <span className="self-center text-muted-foreground">-</span>
                        <Input
                            type="date"
                            className="w-[150px]"
                            title="End Date"
                        />
                    </div>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Purchase
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Purchase</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="supplier">Supplier Name</Label>
                                <Input id="supplier" value={newPurchase.supplier} onChange={(e) => setNewPurchase({ ...newPurchase, supplier: e.target.value })} placeholder="Enter supplier" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="total">Total Amount (₹)</Label>
                                    <Input id="total" type="number" value={newPurchase.total} onChange={(e) => setNewPurchase({ ...newPurchase, total: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tax">Tax (₹)</Label>
                                    <Input id="tax" type="number" value={newPurchase.tax} onChange={(e) => setNewPurchase({ ...newPurchase, tax: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddPurchase}>Save Purchase</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Purchase</DialogTitle>
                        </DialogHeader>
                        {editingPurchase && (
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Supplier Name</Label>
                                    <Input
                                        value={editingPurchase.supplier}
                                        onChange={(e) => setEditingPurchase({ ...editingPurchase, supplier: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Total Amount (₹)</Label>
                                        <Input
                                            type="number"
                                            value={editingPurchase.total}
                                            onChange={(e) => setEditingPurchase({ ...editingPurchase, total: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tax (₹)</Label>
                                        <Input
                                            type="number"
                                            value={editingPurchase.tax}
                                            onChange={(e) => setEditingPurchase({ ...editingPurchase, tax: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select
                                            value={editingPurchase.status}
                                            onValueChange={(val) => setEditingPurchase({ ...editingPurchase, status: val })}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Paid">Paid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mode</Label>
                                        <Select
                                            value={editingPurchase.mode}
                                            onValueChange={(val) => setEditingPurchase({ ...editingPurchase, mode: val })}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Cash">Cash</SelectItem>
                                                <SelectItem value="Card">Card</SelectItem>
                                                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleEditPurchase}>Update Purchase</Button>
                                </DialogFooter>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border shadow-sm bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Purchase No</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Tax</TableHead>
                            <TableHead>Net Amount</TableHead>
                            <TableHead>Payment Mode</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPurchases.length > 0 ? (
                            filteredPurchases.map((purchase) => (
                                <TableRow key={purchase.id}>
                                    <TableCell className="font-medium">{purchase.purchaseNo}</TableCell>
                                    <TableCell>₹{purchase.total.toFixed(2)}</TableCell>
                                    <TableCell>₹{purchase.tax.toFixed(2)}</TableCell>
                                    <TableCell>₹{purchase.net.toFixed(2)}</TableCell>
                                    <TableCell>{purchase.mode}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={purchase.status === "Paid" ? "default" : "secondary"}
                                            className={purchase.status === "Pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                                        >
                                            {purchase.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" title="View Invoice">
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Invoice Details</DialogTitle>
                                                        <DialogDescription>
                                                            Purchase Order: {purchase.purchaseNo}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="font-semibold">Status:</span> {purchase.status}
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold">Mode:</span> {purchase.mode}
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold">Net Amount:</span> ₹{purchase.net}
                                                            </div>
                                                        </div>
                                                        <div className="border rounded p-4 bg-muted/50 text-center text-muted-foreground">
                                                            Invoice Preview Placeholder
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => {
                                                        setEditingPurchase({ ...purchase, supplier: "Unknown Supplier" }); // Mock data didn't have supplier, adding default
                                                        setIsEditDialogOpen(true);
                                                    }}>
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePurchase(purchase.id)}>
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
                                <TableCell colSpan={7} className="text-center h-24">
                                    No purchase records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PurchaseMedicines;
