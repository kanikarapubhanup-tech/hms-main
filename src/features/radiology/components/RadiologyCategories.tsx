
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
import { Switch } from "@/components/ui/switch";
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
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const initialCategories = [
    { id: 1, name: "X-Ray", status: "Active" },
    { id: 2, name: "Ultrasound", status: "Active" },
    { id: 3, name: "CT Scan", status: "Active" },
    { id: 4, name: "MRI", status: "Inactive" },
    { id: 5, name: "Mammography", status: "Active" },
];

const RadiologyCategories = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState(initialCategories);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();
    const [newCategoryName, setNewCategoryName] = useState("");

    const [editingCategory, setEditingCategory] = useState<{ id: number; name: string; status: string } | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditCategory = () => {
        if (!editingCategory || !editingCategory.name) {
            toast({
                title: "Error",
                description: "Category name is required.",
                variant: "destructive",
            });
            return;
        }

        setCategories(categories.map((c) => (c.id === editingCategory.id ? editingCategory : c)));
        setIsEditDialogOpen(false);
        setEditingCategory(null);
        toast({
            title: "Success",
            description: "Category updated successfully.",
        });
    };

    const handleDeleteCategory = (id: number) => {
        setCategories(categories.filter((c) => c.id !== id));
        toast({
            title: "Success",
            description: "Category deleted successfully.",
        });
    };

    const handleAddCategory = () => {
        if (!newCategoryName) {
            toast({
                title: "Error",
                description: "Category name is required.",
                variant: "destructive",
            });
            return;
        }

        const category = {
            id: categories.length + 1,
            name: newCategoryName,
            status: "Active",
        };

        setCategories([...categories, category]);
        setIsAddDialogOpen(false);
        setNewCategoryName("");

        toast({
            title: "Success",
            description: "Category added successfully.",
        });
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Category Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Radiology Category</DialogTitle>
                            <DialogDescription>
                                Add a new category for radiology tests.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Nuclear Medicine"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddCategory}>Add Category</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                                Update radiology category details.
                            </DialogDescription>
                        </DialogHeader>
                        {editingCategory && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                                    <Input id="edit-name" value={editingCategory.name} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-status" className="text-right">Status</Label>
                                    <div className="flex items-center space-x-2 col-span-3">
                                        <Switch
                                            id="edit-status"
                                            checked={editingCategory.status === "Active"}
                                            onCheckedChange={(checked) => setEditingCategory({ ...editingCategory, status: checked ? "Active" : "Inactive" })}
                                        />
                                        <Label htmlFor="edit-status">{editingCategory.status}</Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditCategory}>Update Category</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border shadow-sm bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={category.status === "Active" ? "default" : "secondary"}
                                        >
                                            {category.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View">
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Edit" onClick={() => { setEditingCategory(category); setIsEditDialogOpen(true); }}>
                                                <Pencil className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDeleteCategory(category.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center h-24">
                                    No categories found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RadiologyCategories;
