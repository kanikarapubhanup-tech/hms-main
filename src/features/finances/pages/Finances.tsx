import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialTransactions = [
    { id: 1, type: "Income", amount: 15000, description: "OPD Fees", category: "Consultation", date: "2024-03-20" },
    { id: 2, type: "Expense", amount: 5000, description: "Medical Supplies", category: "Inventory", date: "2024-03-19" },
    { id: 3, type: "Income", amount: 45000, description: "Surgery Payment", category: "Operation", date: "2024-03-18" },
    { id: 4, type: "Expense", amount: 12000, description: "Staff Salary Advance", category: "Payroll", date: "2024-03-15" },
];

const Finances = () => {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();
    const [newTransaction, setNewTransaction] = useState({
        type: "Income",
        amount: "",
        description: "",
        category: "General",
    });
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<any>(null);

    const totalIncome = transactions
        .filter(t => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpense;

    const handleAddTransaction = () => {
        if (!newTransaction.amount || !newTransaction.description) {
            toast({
                title: "Error",
                description: "Amount and Description are required.",
                variant: "destructive",
            });
            return;
        }

        const transaction = {
            id: transactions.length + 1,
            type: newTransaction.type,
            amount: parseFloat(newTransaction.amount),
            description: newTransaction.description,
            category: newTransaction.category,
            date: new Date().toISOString().split('T')[0],
        };

        setTransactions([transaction, ...transactions]);
        setIsAddDialogOpen(false);
        setNewTransaction({
            type: "Income",
            amount: "",
            description: "",
            category: "General",
        });

        toast({
            title: "Success",
            description: "Transaction added successfully.",
        });
        toast({
            title: "Success",
            description: "Transaction added successfully.",
        });
    };

    const handleEditTransaction = () => {
        if (!editingTransaction.amount || !editingTransaction.description) {
            toast({
                title: "Error",
                description: "Amount and Description are required.",
                variant: "destructive",
            });
            return;
        }

        setTransactions(transactions.map(t => t.id === editingTransaction.id ? {
            ...editingTransaction,
            amount: parseFloat(editingTransaction.amount),
        } : t));
        setIsEditDialogOpen(false);
        setEditingTransaction(null);

        toast({
            title: "Success",
            description: "Transaction updated successfully.",
        });
    };

    const handleDeleteTransaction = (id: number) => {
        setTransactions(transactions.filter(t => t.id !== id));
        toast({
            title: "Success",
            description: "Transaction deleted successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Finances</h1>
                    <p className="text-muted-foreground">Track hospital income and expenses.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Transaction
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Transaction</DialogTitle>
                            <DialogDescription>
                                Record a new income or expense.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Type</Label>
                                <Select
                                    value={newTransaction.type}
                                    onValueChange={(val) => setNewTransaction({ ...newTransaction, type: val })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Income">Income</SelectItem>
                                        <SelectItem value="Expense">Expense</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">Amount (₹)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={newTransaction.amount}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                    className="col-span-3"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Input
                                    id="description"
                                    value={newTransaction.description}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                    className="col-span-3"
                                    placeholder="e.g. Consultation Fees"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Category</Label>
                                <Input
                                    id="category"
                                    value={newTransaction.category}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                                    className="col-span-3"
                                    placeholder="e.g. OPD"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddTransaction}>Save Transaction</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Transaction Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Transaction</DialogTitle>
                            <DialogDescription>
                                Update the transaction details.
                            </DialogDescription>
                        </DialogHeader>
                        {editingTransaction && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-type" className="text-right">Type</Label>
                                    <Select
                                        value={editingTransaction.type}
                                        onValueChange={(val) => setEditingTransaction({ ...editingTransaction, type: val })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Income">Income</SelectItem>
                                            <SelectItem value="Expense">Expense</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-amount" className="text-right">Amount (₹)</Label>
                                    <Input
                                        id="edit-amount"
                                        type="number"
                                        value={editingTransaction.amount}
                                        onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
                                        className="col-span-3"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-description" className="text-right">Description</Label>
                                    <Input
                                        id="edit-description"
                                        value={editingTransaction.description}
                                        onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-category" className="text-right">Category</Label>
                                    <Input
                                        id="edit-category"
                                        value={editingTransaction.category}
                                        onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditTransaction}>Update Transaction</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Based on {transactions.filter(t => t.type === "Income").length} records</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalExpense.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Based on {transactions.filter(t => t.type === "Expense").length} records</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{netProfit.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Description</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Category</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Amount</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {transactions.map((t) => (
                                    <tr key={t.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle">{t.date}</td>
                                        <td className="p-4 align-middle">{t.description}</td>
                                        <td className="p-4 align-middle">{t.category}</td>
                                        <td className="p-4 align-middle">
                                            <span className={t.type === "Income" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                                {t.type}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right font-medium">₹{t.amount.toLocaleString()}</td>
                                        <td className="p-4 align-middle text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => {
                                                        setEditingTransaction({ ...t, amount: t.amount });
                                                        setIsEditDialogOpen(true);
                                                    }}>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTransaction(t.id)}>
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Finances;
