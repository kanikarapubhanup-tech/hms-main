import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Search, Download, Eye, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/use-toast";

const PatientBilling = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [bills, setBills] = useState([
        {
            id: "INV-2024-001",
            date: "2024-03-15",
            description: "General Consultation",
            amount: 150.00,
            status: "Paid",
            items: ["Consultation Fee"]
        },
        {
            id: "INV-2024-002",
            date: "2024-03-14",
            description: "Lab Tests - CBC, Lipid Profile",
            amount: 450.00,
            status: "Pending",
            items: ["CBC Test", "Lipid Profile"]
        },
        {
            id: "INV-2024-003",
            date: "2024-01-10",
            description: "Pharmacy Medicines",
            amount: 75.50,
            status: "Paid",
            items: ["Ibuprofen", "Cetirizine"]
        },
    ]);

    const [newInvoice, setNewInvoice] = useState({
        description: "",
        amount: "",
        items: "",
    });

    const handleCreateInvoice = () => {
        if (!newInvoice.description || !newInvoice.amount) {
            toast({
                title: "Error",
                description: "Description and Amount are required.",
                variant: "destructive",
            });
            return;
        }

        const invoice = {
            id: `INV-2024-00${bills.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            description: newInvoice.description,
            amount: parseFloat(newInvoice.amount),
            status: "Pending",
            items: newInvoice.items ? newInvoice.items.split(',').map(item => item.trim()) : [newInvoice.description]
        };

        setBills([invoice, ...bills]);
        setIsAddDialogOpen(false);
        setNewInvoice({
            description: "",
            amount: "",
            items: "",
        });

        toast({
            title: "Success",
            description: "Invoice created successfully.",
        });
    };

    const filteredBills = bills.filter(bill =>
        bill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing & Payments</h1>
                    <p className="text-muted-foreground">Manage your invoices and view payment history.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Invoice
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Invoice</DialogTitle>
                            <DialogDescription>
                                Generate a new invoice for services.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    value={newInvoice.description}
                                    onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                                    className="col-span-3"
                                    placeholder="e.g. Lab Tests"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount (₹)
                                </Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={newInvoice.amount}
                                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                                    className="col-span-3"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="items" className="text-right">
                                    Items
                                </Label>
                                <Input
                                    id="items"
                                    value={newInvoice.items}
                                    onChange={(e) => setNewInvoice({ ...newInvoice, items: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Comma separated items"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleCreateInvoice}>Create Invoice</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-yellow-600" />
                            Invoices
                        </CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search invoice..."
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
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBills.map((bill) => (
                                <TableRow key={bill.id}>
                                    <TableCell className="font-medium">{bill.id}</TableCell>
                                    <TableCell>{bill.date}</TableCell>
                                    <TableCell>
                                        <div>{bill.description}</div>
                                        <div className="text-xs text-muted-foreground italic">
                                            {bill.items.join(", ")}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold">₹{bill.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={bill.status === "Paid" ? "outline" : "secondary"}
                                            className={bill.status === "Paid" ? "text-green-600 border-green-600" : ""}
                                        >
                                            {bill.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 items-center">
                                            {bill.status === "Pending" && (
                                                <Button size="sm" className="h-8">Pay Now</Button>
                                            )}
                                            <Button variant="ghost" size="icon" title="View Details">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" title="Download Invoice">
                                                <Download className="h-4 w-4" />
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

export default PatientBilling;
