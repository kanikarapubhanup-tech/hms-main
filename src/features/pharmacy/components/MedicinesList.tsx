
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Eye, Pencil, Trash2, ArrowUpDown } from "lucide-react";

const initialMedicines = [
    { id: 1, name: "Amoxicillin 500mg", brand: "Cipla", quantity: 150, buyingPrice: 40, sellingPrice: 55 },
    { id: 2, name: "Paracetamol 650mg", brand: "Sun Pharma", quantity: 20, buyingPrice: 2, sellingPrice: 5 }, // Low stock
    { id: 3, name: "Vitamin C", brand: "Dr. Reddy's", quantity: 500, buyingPrice: 5, sellingPrice: 10 },
    { id: 4, name: "Ibuprofen 400mg", brand: "Pfizer", quantity: 80, buyingPrice: 6, sellingPrice: 12 },
];


interface Medicine {
    id: number;
    name: string;
    brand: string;
    quantity: number;
    buyingPrice: number;
    sellingPrice: number;
}

const MedicinesList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
    const { toast } = useToast();

    const [newMedicine, setNewMedicine] = useState({
        name: "",
        brand: "",
        quantity: "",
        buyingPrice: "",
        sellingPrice: ""
    });

    const handleAddMedicine = () => {
        if (!newMedicine.name || !newMedicine.brand || !newMedicine.quantity || !newMedicine.buyingPrice || !newMedicine.sellingPrice) {
            toast({
                title: "Error",
                description: "All fields are required.",
                variant: "destructive",
            });
            return;
        }

        const medicine = {
            id: medicines.length + 1,
            name: newMedicine.name,
            brand: newMedicine.brand,
            quantity: parseInt(newMedicine.quantity),
            buyingPrice: parseFloat(newMedicine.buyingPrice),
            sellingPrice: parseFloat(newMedicine.sellingPrice),
        };

        setMedicines([...medicines, medicine]);
        setIsAddDialogOpen(false);
        setNewMedicine({
            name: "",
            brand: "",
            quantity: "",
            buyingPrice: "",
            sellingPrice: ""
        });

        toast({
            title: "Success",
            description: "Medicine added successfully.",
        });
    };

    const handleEditMedicine = () => {
        if (!editingMedicine.name || !editingMedicine.brand || !editingMedicine.quantity || !editingMedicine.buyingPrice || !editingMedicine.sellingPrice) {
            toast({
                title: "Error",
                description: "All fields are required.",
                variant: "destructive",
            });
            return;
        }

        const updatedMedicine = {
            ...editingMedicine,
            quantity: editingMedicine.quantity,
            buyingPrice: editingMedicine.buyingPrice,
            sellingPrice: editingMedicine.sellingPrice,
        };

        setMedicines(medicines.map(m => m.id === editingMedicine.id ? updatedMedicine : m));
        setIsEditDialogOpen(false);
        setEditingMedicine(null);

        toast({
            title: "Success",
            description: "Medicine details updated successfully.",
        });
    };

    const handleDeleteMedicine = (id: number) => {
        setMedicines(medicines.filter(m => m.id !== id));
        toast({
            title: "Success",
            description: "Medicine removed from list.",
        });
    };

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedMedicines = [...filteredMedicines].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        // @ts-ignore
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        // @ts-ignore
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };


    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Medicine..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Medicine
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Medicine</DialogTitle>
                            <DialogDescription>
                                Add a new medicine to the inventory.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newMedicine.name}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Amoxicillin"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="brand" className="text-right">
                                    Brand
                                </Label>
                                <Input
                                    id="brand"
                                    value={newMedicine.brand}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, brand: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Cipla"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity" className="text-right">
                                    Quantity
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={newMedicine.quantity}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
                                    className="col-span-3"
                                    placeholder="100"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="buyingPrice" className="text-right">
                                    Buy Price (₹)
                                </Label>
                                <Input
                                    id="buyingPrice"
                                    type="number"
                                    value={newMedicine.buyingPrice}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, buyingPrice: e.target.value })}
                                    className="col-span-3"
                                    placeholder="10"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="sellingPrice" className="text-right">
                                    Sell Price (₹)
                                </Label>
                                <Input
                                    id="sellingPrice"
                                    type="number"
                                    value={newMedicine.sellingPrice}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, sellingPrice: e.target.value })}
                                    className="col-span-3"
                                    placeholder="15"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddMedicine}>Add Medicine</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Medicine Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Medicine</DialogTitle>
                            <DialogDescription>
                                Update the details for this medicine.
                            </DialogDescription>
                        </DialogHeader>
                        {editingMedicine && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="edit-name"
                                        value={editingMedicine.name}
                                        onChange={(e) => setEditingMedicine({ ...editingMedicine, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-brand" className="text-right">
                                        Brand
                                    </Label>
                                    <Input
                                        id="edit-brand"
                                        value={editingMedicine.brand}
                                        onChange={(e) => setEditingMedicine({ ...editingMedicine, brand: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-quantity" className="text-right">
                                        Quantity
                                    </Label>
                                    <Input
                                        id="edit-quantity"
                                        type="number"
                                        value={editingMedicine.quantity}
                                        onChange={(e) => setEditingMedicine({ ...editingMedicine, quantity: parseInt(e.target.value) || 0 })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-buyingPrice" className="text-right">
                                        Buy Price (₹)
                                    </Label>
                                    <Input
                                        id="edit-buyingPrice"
                                        type="number"
                                        value={editingMedicine.buyingPrice}
                                        onChange={(e) => setEditingMedicine({ ...editingMedicine, buyingPrice: parseFloat(e.target.value) || 0 })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-sellingPrice" className="text-right">
                                        Sell Price (₹)
                                    </Label>
                                    <Input
                                        id="edit-sellingPrice"
                                        type="number"
                                        value={editingMedicine.sellingPrice}
                                        onChange={(e) => setEditingMedicine({ ...editingMedicine, sellingPrice: parseFloat(e.target.value) || 0 })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditMedicine}>Update Medicine</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border shadow-sm bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Medicine Name</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('quantity')} className="hover:bg-transparent px-0 font-bold">
                                    Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('sellingPrice')} className="hover:bg-transparent px-0 font-bold">
                                    Selling Price <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Buying Price</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedMedicines.length > 0 ? (
                            sortedMedicines.map((medicine) => (
                                <TableRow key={medicine.id}>
                                    <TableCell className="font-medium">{medicine.name}</TableCell>
                                    <TableCell>{medicine.brand}</TableCell>
                                    <TableCell>
                                        {medicine.quantity <= 50 ? (
                                            <Badge variant="destructive">{medicine.quantity} (Low)</Badge>
                                        ) : (
                                            <Badge variant="outline">{medicine.quantity}</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>₹{medicine.sellingPrice}</TableCell>
                                    <TableCell>₹{medicine.buyingPrice}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View">
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Edit" onClick={() => { setEditingMedicine(medicine); setIsEditDialogOpen(true); }}>
                                                <Pencil className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDeleteMedicine(medicine.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">
                                    No medicines found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MedicinesList;
