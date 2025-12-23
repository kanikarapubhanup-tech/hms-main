import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const initialTests = [
    { id: 1, name: "Complete Blood Count (CBC)", code: "PATH-CBC", category: "Hematology", charge: 350 },
    { id: 2, name: "Lipid Profile", code: "PATH-LP", category: "Biochemistry", charge: 500 },
    { id: 3, name: "Blood Sugar Fasting", code: "PATH-BSF", category: "Biochemistry", charge: 150 },
];

const Pathology = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [tests, setTests] = useState(initialTests);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [editingTest, setEditingTest] = useState<{ id: number; name: string; code: string; category: string; charge: number } | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newTest, setNewTest] = useState({
        name: "",
        code: "",
        category: "",
        charge: ""
    });

    const handleEditTest = () => {
        if (!editingTest || !editingTest.name || !editingTest.code || !editingTest.charge) {
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
            description: "Pathology test updated successfully.",
        });
    };

    const handleDeleteTest = (id: number) => {
        setTests(tests.filter((t) => t.id !== id));
        toast({
            title: "Success",
            description: "Pathology test deleted successfully.",
        });
    };

    const handleAddTest = () => {
        if (!newTest.name || !newTest.code || !newTest.charge) {
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
            code: newTest.code,
            category: newTest.category || "General",
            charge: parseFloat(newTest.charge)
        };

        setTests([...tests, test]);
        setIsAddDialogOpen(false);
        setNewTest({
            name: "",
            code: "",
            category: "",
            charge: ""
        });

        toast({
            title: "Success",
            description: "Pathology test added successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pathology</h1>
                    <p className="text-muted-foreground">Manage pathology tests and patient test requests.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Test
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Test</DialogTitle>
                            <DialogDescription>
                                Add a new pathology test to the catalog.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newTest.name}
                                    onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Complete Blood Count"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="code" className="text-right">
                                    Code
                                </Label>
                                <Input
                                    id="code"
                                    value={newTest.code}
                                    onChange={(e) => setNewTest({ ...newTest, code: e.target.value })}
                                    className="col-span-3"
                                    placeholder="PATH-CBC"
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
                                    placeholder="Hematology"
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
                                    placeholder="350"
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
                            <DialogTitle>Edit Test</DialogTitle>
                            <DialogDescription>
                                Update pathology test details.
                            </DialogDescription>
                        </DialogHeader>
                        {editingTest && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                                    <Input id="edit-name" value={editingTest.name} onChange={(e) => setEditingTest({ ...editingTest, name: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-code" className="text-right">Code</Label>
                                    <Input id="edit-code" value={editingTest.code} onChange={(e) => setEditingTest({ ...editingTest, code: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-category" className="text-right">Category</Label>
                                    <Input id="edit-category" value={editingTest.category} onChange={(e) => setEditingTest({ ...editingTest, category: e.target.value })} className="col-span-3" />
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

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Pathology Tests</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search tests..." className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Short Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Charge (₹)</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tests.map((test) => (
                                <TableRow key={test.id}>
                                    <TableCell className="font-medium">{test.name}</TableCell>
                                    <TableCell>{test.code}</TableCell>
                                    <TableCell>{test.category}</TableCell>
                                    <TableCell>{test.charge}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => { setEditingTest(test); setIsEditDialogOpen(true); }}>
                                                <Pencil className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteTest(test.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
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

export default Pathology;
