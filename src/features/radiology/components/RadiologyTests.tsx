
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
const initialTests = [
    {
        id: 1,
        name: "Chest X-Ray PA View",
        shortName: "CXR-PA",
        type: "X-Ray",
        category: "X-Ray",
        chargeCategory: "Radiology Charges",
        charge: 500,
    },
    {
        id: 2,
        name: "USG Abdomen",
        shortName: "USG-ABD",
        type: "Ultrasound",
        category: "Ultrasound",
        chargeCategory: "Sonography Charges",
        charge: 1200,
    },
    {
        id: 3,
        name: "CT Brain Plain",
        shortName: "CT-Brain",
        type: "CT Scan",
        category: "CT Scan",
        chargeCategory: "CT Charges",
        charge: 3500,
    },
    {
        id: 4,
        name: "MRI Knee Joint",
        shortName: "MRI-Knee",
        type: "MRI",
        category: "MRI",
        chargeCategory: "MRI Charges",
        charge: 6000,
    },
    {
        id: 5,
        name: "X-Ray Left Leg",
        shortName: "XR-Leg-L",
        type: "X-Ray",
        category: "X-Ray",
        chargeCategory: "Radiology Charges",
        charge: 600,
    },
];

const RadiologyTests = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [tests, setTests] = useState(initialTests);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [newTest, setNewTest] = useState({
        name: "",
        shortName: "",
        type: "",
        category: "",
        chargeCategory: "",
        charge: ""
    });

    const [editingTest, setEditingTest] = useState<{ id: number; name: string; shortName: string; type: string; category: string; chargeCategory: string; charge: number } | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditTest = () => {
        if (!editingTest || !editingTest.name || !editingTest.charge) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        setTests(tests.map((t) => (t.id === editingTest.id ? editingTest : t)));
        setIsEditDialogOpen(false);
        setEditingTest(null);
        toast({
            title: "Success",
            description: "Radiology test updated successfully.",
        });
    };

    const handleDeleteTest = (id: number) => {
        setTests(tests.filter((t) => t.id !== id));
        toast({
            title: "Success",
            description: "Radiology test deleted successfully.",
        });
    };

    const handleAddTest = () => {
        if (!newTest.name || !newTest.charge) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const test = {
            id: tests.length + 1,
            name: newTest.name,
            shortName: newTest.shortName,
            type: newTest.type,
            category: newTest.category,
            chargeCategory: newTest.chargeCategory,
            charge: parseFloat(newTest.charge),
        };

        setTests([...tests, test]);
        setIsAddDialogOpen(false);
        setNewTest({
            name: "",
            shortName: "",
            type: "",
            category: "",
            chargeCategory: "",
            charge: ""
        });

        toast({
            title: "Success",
            description: "Radiology test added successfully.",
        });
    };

    const filteredTests = tests.filter((test) => {
        const matchesSearch =
            test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.shortName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || test.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    const uniqueCategories = Array.from(new Set(tests.map((t) => t.category)));

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-1 gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search Test Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {uniqueCategories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Test
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Radiology Test</DialogTitle>
                            <DialogDescription>
                                Add a new radiology test to the system.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Test Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newTest.name}
                                    onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Chest X-Ray PA View"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="shortName" className="text-right">
                                    Short Name
                                </Label>
                                <Input
                                    id="shortName"
                                    value={newTest.shortName}
                                    onChange={(e) => setNewTest({ ...newTest, shortName: e.target.value })}
                                    className="col-span-3"
                                    placeholder="CXR-PA"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Type
                                </Label>
                                <Input
                                    id="type"
                                    value={newTest.type}
                                    onChange={(e) => setNewTest({ ...newTest, type: e.target.value })}
                                    className="col-span-3"
                                    placeholder="X-Ray"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <Input
                                    id="category"
                                    value={newTest.category}
                                    onChange={(e) => setNewTest({ ...newTest, category: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Radiology"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="chargeCategory" className="text-right">
                                    Charge Cat.
                                </Label>
                                <Input
                                    id="chargeCategory"
                                    value={newTest.chargeCategory}
                                    onChange={(e) => setNewTest({ ...newTest, chargeCategory: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Radiology Charges"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="charge" className="text-right">
                                    Charge (₹)
                                </Label>
                                <Input
                                    id="charge"
                                    type="number"
                                    value={newTest.charge}
                                    onChange={(e) => setNewTest({ ...newTest, charge: e.target.value })}
                                    className="col-span-3"
                                    placeholder="500"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddTest}>Add Test</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Radiology Test</DialogTitle>
                            <DialogDescription>
                                Update radiology test details.
                            </DialogDescription>
                        </DialogHeader>
                        {editingTest && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Test Name</Label>
                                    <Input id="edit-name" value={editingTest.name} onChange={(e) => setEditingTest({ ...editingTest, name: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-shortName" className="text-right">Short Name</Label>
                                    <Input id="edit-shortName" value={editingTest.shortName} onChange={(e) => setEditingTest({ ...editingTest, shortName: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-type" className="text-right">Type</Label>
                                    <Input id="edit-type" value={editingTest.type} onChange={(e) => setEditingTest({ ...editingTest, type: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-category" className="text-right">Category</Label>
                                    <Input id="edit-category" value={editingTest.category} onChange={(e) => setEditingTest({ ...editingTest, category: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-chargeCategory" className="text-right">Charge Cat.</Label>
                                    <Input id="edit-chargeCategory" value={editingTest.chargeCategory} onChange={(e) => setEditingTest({ ...editingTest, chargeCategory: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-charge" className="text-right">Charge (₹)</Label>
                                    <Input id="edit-charge" type="number" value={editingTest.charge} onChange={(e) => setEditingTest({ ...editingTest, charge: parseFloat(e.target.value) || 0 })} className="col-span-3" />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditTest}>Update Test</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border shadow-sm bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Test Name</TableHead>
                            <TableHead>Short Name</TableHead>
                            <TableHead>Test Type</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Charge Category</TableHead>
                            <TableHead>Charge (₹)</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTests.length > 0 ? (
                            filteredTests.map((test) => (
                                <TableRow key={test.id}>
                                    <TableCell className="font-medium">{test.name}</TableCell>
                                    <TableCell>{test.shortName}</TableCell>
                                    <TableCell>{test.type}</TableCell>
                                    <TableCell>{test.category}</TableCell>
                                    <TableCell>{test.chargeCategory}</TableCell>
                                    <TableCell>₹{test.charge}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View">
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Edit" onClick={() => { setEditingTest(test); setIsEditDialogOpen(true); }}>
                                                <Pencil className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDeleteTest(test.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">
                                    No tests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RadiologyTests;
