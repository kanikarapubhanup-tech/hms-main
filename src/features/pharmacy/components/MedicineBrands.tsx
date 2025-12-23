
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
import { Search, Plus, Eye, Pencil, Trash2, Mail, Phone } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialBrands = [
    { id: 1, name: "Cipla", email: "contact@cipla.com", phone: "+91-9876543210" },
    { id: 2, name: "Sun Pharma", email: "info@sunpharma.com", phone: "+91-9876543211" },
    { id: 3, name: "Dr. Reddy's", email: "support@drreddys.com", phone: "+91-9876543212" },
    { id: 4, name: "Pfizer", email: "global@pfizer.com", phone: "+91-9876543213" },
];

const MedicineBrands = () => {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [brands, setBrands] = useState(initialBrands);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newBrand, setNewBrand] = useState({ name: "", email: "", phone: "" });
    const [editingBrand, setEditingBrand] = useState<{ id: number; name: string; email: string; phone: string } | null>(null);

    const handleAddBrand = () => {
        if (!newBrand.name) {
            toast({ title: "Error", description: "Brand Name is required", variant: "destructive" });
            return;
        }
        const brand = { id: brands.length + 1, ...newBrand };
        setBrands([...brands, brand]);
        setIsAddDialogOpen(false);
        setNewBrand({ name: "", email: "", phone: "" });
        toast({ title: "Success", description: "Brand added successfully" });
    };

    const handleEditBrand = () => {
        if (!editingBrand || !editingBrand.name) {
            toast({ title: "Error", description: "Brand Name is required", variant: "destructive" });
            return;
        }
        setBrands(brands.map((b) => (b.id === editingBrand.id ? editingBrand : b)));
        setIsEditDialogOpen(false);
        setEditingBrand(null);
        toast({ title: "Success", description: "Brand updated successfully" });
    };

    const handleDeleteBrand = (id: number) => {
        setBrands(brands.filter((b) => b.id !== id));
        toast({ title: "Success", description: "Brand deleted successfully" });
    };

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Brand
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Brand</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Brand Name</Label>
                                <Input id="name" value={newBrand.name} onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })} placeholder="Enter brand name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={newBrand.email} onChange={(e) => setNewBrand({ ...newBrand, email: e.target.value })} placeholder="Enter email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" value={newBrand.phone} onChange={(e) => setNewBrand({ ...newBrand, phone: e.target.value })} placeholder="Enter phone" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddBrand}>Save Brand</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Brand</DialogTitle>
                    </DialogHeader>
                    {editingBrand && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Brand Name</Label>
                                <Input id="edit-name" value={editingBrand.name} onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-email">Email</Label>
                                <Input id="edit-email" value={editingBrand.email} onChange={(e) => setEditingBrand({ ...editingBrand, email: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-phone">Phone</Label>
                                <Input id="edit-phone" value={editingBrand.phone} onChange={(e) => setEditingBrand({ ...editingBrand, phone: e.target.value })} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={handleEditBrand}>Update Brand</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="rounded-md border shadow-sm bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Brand Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBrands.length > 0 ? (
                            filteredBrands.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell className="font-medium">{brand.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3 w-3 text-muted-foreground" />
                                            {brand.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3 w-3 text-muted-foreground" />
                                            {brand.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View">
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Edit" onClick={() => { setEditingBrand(brand); setIsEditDialogOpen(true); }}>
                                                <Pencil className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDeleteBrand(brand.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">
                                    No brands found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MedicineBrands;
