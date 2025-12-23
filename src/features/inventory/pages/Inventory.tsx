import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Package, AlertTriangle, MoreHorizontal, Pencil, Trash } from "lucide-react";
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

const initialStock = [
    { id: 1, item: "Syringes (5ml)", category: "Consumables", store: "Main Store", quantity: 500, minLevel: 100, status: "In Stock" },
    { id: 2, item: "Cotton Rolls", category: "Consumables", store: "Main Store", quantity: 45, minLevel: 50, status: "Low Stock" },
    { id: 3, item: "Surgical Gloves", category: "Surgical", store: "OT Store", quantity: 1200, minLevel: 200, status: "In Stock" },
    { id: 4, item: "Face Masks", category: "Protective Gear", store: "Main Store", quantity: 0, minLevel: 100, status: "Out of Stock" },
];

const Inventory = () => {
    const [stockItems, setStockItems] = useState(initialStock);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const { toast } = useToast();

    const [newItem, setNewItem] = useState({
        item: "",
        category: "",
        store: "Main Store",
        quantity: "",
        minLevel: ""
    });

    const handleAddItem = () => {
        if (!newItem.item || !newItem.quantity) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const quantity = parseInt(newItem.quantity);
        const minLevel = parseInt(newItem.minLevel) || 0;
        let status = "In Stock";
        if (quantity === 0) status = "Out of Stock";
        else if (quantity <= minLevel) status = "Low Stock";

        const item = {
            id: stockItems.length + 1,
            item: newItem.item,
            category: newItem.category,
            store: newItem.store,
            quantity: quantity,
            minLevel: minLevel,
            status: status
        };

        setStockItems([...stockItems, item]);
        setIsAddDialogOpen(false);
        setNewItem({
            item: "",
            category: "",
            store: "Main Store",
            quantity: "",
            minLevel: ""
        });

        toast({
            title: "Success",
            description: "Item added to inventory.",
        });
    };

    const handleEditItem = () => {
        if (!editingItem.item || !editingItem.quantity) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const quantity = parseInt(editingItem.quantity);
        const minLevel = parseInt(editingItem.minLevel) || 0;
        let status = "In Stock";
        if (quantity === 0) status = "Out of Stock";
        else if (quantity <= minLevel) status = "Low Stock";

        const updatedItem = {
            ...editingItem,
            quantity: quantity,
            minLevel: minLevel,
            status: status
        };

        setStockItems(stockItems.map(item => item.id === editingItem.id ? updatedItem : item));
        setIsEditDialogOpen(false);
        setEditingItem(null);

        toast({
            title: "Success",
            description: "Item updated successfully.",
        });
    };

    const handleDeleteItem = (id: number) => {
        setStockItems(stockItems.filter(item => item.id !== id));
        toast({
            title: "Success",
            description: "Item deleted from inventory.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inventory Management</h1>
                    <p className="text-muted-foreground">Track stock items, suppliers, and purchase orders.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Item Stock</Button>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Inventory Item</DialogTitle>
                                <DialogDescription>
                                    Add a new item to the inventory stock.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="item" className="text-right">
                                        Item Name
                                    </Label>
                                    <Input
                                        id="item"
                                        value={newItem.item}
                                        onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                                        className="col-span-3"
                                        placeholder="Surgical Masks"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <Input
                                        id="category"
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                        className="col-span-3"
                                        placeholder="Consumables"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="store" className="text-right">
                                        Store
                                    </Label>
                                    <Select
                                        value={newItem.store}
                                        onValueChange={(value) => setNewItem({ ...newItem, store: value })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select store" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Main Store">Main Store</SelectItem>
                                            <SelectItem value="OT Store">OT Store</SelectItem>
                                            <SelectItem value="Pharmacy Store">Pharmacy Store</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="quantity" className="text-right">
                                        Quantity
                                    </Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={newItem.quantity}
                                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                        className="col-span-3"
                                        placeholder="100"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="minLevel" className="text-right">
                                        Min Level
                                    </Label>
                                    <Input
                                        id="minLevel"
                                        type="number"
                                        value={newItem.minLevel}
                                        onChange={(e) => setNewItem({ ...newItem, minLevel: e.target.value })}
                                        className="col-span-3"
                                        placeholder="20"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddItem}>Add Item</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Edit Item Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Inventory Item</DialogTitle>
                        <DialogDescription>
                            Update the details for this inventory item.
                        </DialogDescription>
                    </DialogHeader>
                    {editingItem && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-item" className="text-right">
                                    Item Name
                                </Label>
                                <Input
                                    id="edit-item"
                                    value={editingItem.item}
                                    onChange={(e) => setEditingItem({ ...editingItem, item: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-category" className="text-right">
                                    Category
                                </Label>
                                <Input
                                    id="edit-category"
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-store" className="text-right">
                                    Store
                                </Label>
                                <Select
                                    value={editingItem.store}
                                    onValueChange={(value) => setEditingItem({ ...editingItem, store: value })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select store" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Main Store">Main Store</SelectItem>
                                        <SelectItem value="OT Store">OT Store</SelectItem>
                                        <SelectItem value="Pharmacy Store">Pharmacy Store</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-quantity" className="text-right">
                                    Quantity
                                </Label>
                                <Input
                                    id="edit-quantity"
                                    type="number"
                                    value={editingItem.quantity}
                                    onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-minLevel" className="text-right">
                                    Min Level
                                </Label>
                                <Input
                                    id="edit-minLevel"
                                    type="number"
                                    value={editingItem.minLevel}
                                    onChange={(e) => setEditingItem({ ...editingItem, minLevel: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={handleEditItem}>Update Item</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,240</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">12</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Purchase Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Pending delivery</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Item Stock Status</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search items..." className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Store</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stockItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.item}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.store}</TableCell>
                                    <TableCell className={item.quantity <= item.minLevel ? "text-red-500 font-bold" : ""}>
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'In Stock' ? 'default' : item.status === 'Low Stock' ? 'secondary' : 'destructive'}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => { setEditingItem(item); setIsEditDialogOpen(true); }}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteItem(item.id)}>
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
        </div>
    );
};

export default Inventory;
