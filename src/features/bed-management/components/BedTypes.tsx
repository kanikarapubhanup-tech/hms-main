import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
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
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const initialTypes = [
    { id: 1, name: "General" },
    { id: 2, name: "Semi-Private" },
    { id: 3, name: "Private" },
    { id: 4, name: "ICU" },
    { id: 5, name: "Ventilator" },
];

const BedTypes = () => {
    const [types, setTypes] = useState(initialTypes);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newType, setNewType] = useState("");
    const [editingType, setEditingType] = useState<{ id: number; name: string } | null>(null);
    const { toast } = useToast();

    const handleAddType = () => {
        if (!newType.trim()) {
            toast({
                title: "Error",
                description: "Bed Type name is required",
                variant: "destructive"
            });
            return;
        }
        const type = {
            id: types.length + 1,
            name: newType
        };
        setTypes([...types, type]);
        setNewType("");
        setIsAddDialogOpen(false);
        toast({
            title: "Success",
            description: "Bed Type added successfully"
        });
    };

    const handleEditType = () => {
        if (!editingType || !editingType.name.trim()) {
            toast({
                title: "Error",
                description: "Bed Type name is required",
                variant: "destructive"
            });
            return;
        }
        setTypes(types.map(t => t.id === editingType.id ? editingType : t));
        setEditingType(null);
        setIsEditDialogOpen(false);
        toast({
            title: "Success",
            description: "Bed Type updated successfully"
        });
    };

    const handleDeleteType = (id: number) => {
        setTypes(types.filter(t => t.id !== id));
        toast({
            title: "Success",
            description: "Bed Type deleted successfully"
        });
    };
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Bed Type
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Bed Type</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={newType} onChange={(e) => setNewType(e.target.value)} placeholder="Enter bed type name" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddType}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Bed Type</DialogTitle>
                        </DialogHeader>
                        {editingType && (
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input id="edit-name" value={editingType.name} onChange={(e) => setEditingType({ ...editingType, name: e.target.value })} />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={handleEditType}>Update</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type Name</TableHead>
                            <TableHead className="w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {types.map((type) => (
                            <TableRow key={type.id}>
                                <TableCell className="font-medium">{type.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                                            setEditingType(type);
                                            setIsEditDialogOpen(true);
                                        }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteType(type.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BedTypes;
