import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Search, Plus, Pencil, Trash2, Eye, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface Bill {
    id: string;
    patient: string;
    date: string;
    amount: number;
    status: string;
    doctorName?: string;
    patientAddress?: string;
    patientMobile?: string;
    paymentMode?: string;
    discount?: number;
    taxRate?: number;
}

const Billing = () => {
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [billsList, setBillsList] = useState<Bill[]>([
        { id: "INV-001", patient: "John Doe", date: "2024-03-20", amount: 1500, status: "Paid", doctorName: "Dr. Smith", patientAddress: "123 Main St", paymentMode: "Cash", discount: 0, taxRate: 18 },
        { id: "INV-002", patient: "Jane Smith", date: "2024-03-19", amount: 3200, status: "Unpaid", doctorName: "Dr. Emily", patientAddress: "456 Oak Ave", paymentMode: "Card", discount: 10, taxRate: 18 },
        { id: "INV-003", patient: "Bob Wilson", date: "2024-03-18", amount: 850, status: "Paid", doctorName: "Dr. John", patientAddress: "789 Pine Rd", paymentMode: "UPI", discount: 0, taxRate: 18 },
    ]);

    const [newBill, setNewBill] = useState({
        patient: "",
        amount: "",
        status: "Unpaid",
        doctorName: "",
        patientAddress: "",
        patientMobile: "",
        paymentMode: "Cash",
        discount: "0",
        taxRate: "18"
    });

    const [editingBill, setEditingBill] = useState<Bill | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [viewingBill, setViewingBill] = useState<Bill | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const handleEditBill = () => {
        if (!editingBill || !editingBill.patient || !editingBill.amount) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        setBillsList(billsList.map((bill) => (bill.id === editingBill.id ? editingBill : bill)));
        setIsEditDialogOpen(false);
        setEditingBill(null);
        toast({
            title: "Success",
            description: "Bill updated successfully."
        });
    };

    const handleDeleteBill = (id: string) => {
        setBillsList(billsList.filter((bill) => bill.id !== id));
        toast({
            title: "Success",
            description: "Bill deleted successfully."
        });
    };

    const handleGenerateBill = () => {
        if (!newBill.patient || !newBill.amount) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        const bill: Bill = {
            id: `INV-${(billsList.length + 1).toString().padStart(3, '0')}`,
            patient: newBill.patient,
            date: new Date().toISOString().split('T')[0],
            amount: parseFloat(newBill.amount),
            status: newBill.status,
            doctorName: newBill.doctorName,
            patientAddress: newBill.patientAddress,
            patientMobile: newBill.patientMobile,
            paymentMode: newBill.paymentMode,
            discount: parseFloat(newBill.discount) || 0,
            taxRate: parseFloat(newBill.taxRate) || 18,
        };

        setBillsList([bill, ...billsList]);
        setIsAddDialogOpen(false);
        setNewBill({
            patient: "", amount: "", status: "Unpaid",
            doctorName: "", patientAddress: "", patientMobile: "",
            paymentMode: "Cash", discount: "0", taxRate: "18"
        });

        toast({
            title: "Success",
            description: "Bill generated successfully."
        });
    };

    const handlePrintBill = (bill: Bill) => {
        setViewingBill(bill);
        // Small timeout to allow state update and rendering of the print section
        setTimeout(() => {
            window.print();
        }, 100);
    };

    // Calculate totals for print view
    const getPrintCalculations = (bill: Bill) => {
        const subtotal = bill.amount;
        const taxRate = bill.taxRate || 18;
        const discount = bill.discount || 0;

        const taxAmount = (subtotal * taxRate) / 100;
        const cgst = taxAmount / 2;
        const sgst = taxAmount / 2;
        const total = subtotal + taxAmount - discount;

        return { subtotal, cgst, sgst, discount, total, taxRate };
    };

    return (
        <div className="space-y-6">
            {/* Printable Invoice Section - Only visible during print */}
            <div className="hidden print:block fixed inset-0 bg-white z-[100] p-8">
                {viewingBill && (
                    <div className="max-w-4xl mx-auto border border-gray-200 p-8 rounded-sm text-sm text-slate-800 font-sans">
                        {/* Header */}
                        <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Tax Invoice</h1>
                                <p className="text-muted-foreground mt-2">Original for Recipient</p>
                            </div>
                            <div className="text-right">
                                <h2 className="font-bold text-xl text-slate-900">Unity Hospital</h2>
                                <p className="text-slate-600">123 Health Avenue, Medical District</p>
                                <p className="text-slate-600">Mumbai, Maharashtra - 400001</p>
                                <p className="text-slate-600 mt-1"><strong>GSTIN:</strong> 27AABCU9603R1ZN</p>
                                <p className="text-slate-600"><strong>Email:</strong> billing@unityhospital.com</p>
                            </div>
                        </div>

                        {/* Bill To & Invoice Details */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-2">Billed To</h3>
                                <p className="font-bold text-lg text-slate-900">{viewingBill.patient}</p>
                                {viewingBill.patientAddress && <p className="text-slate-600">{viewingBill.patientAddress}</p>}
                                {viewingBill.patientMobile && <p className="text-slate-600">Mobile: {viewingBill.patientMobile}</p>}
                                <p className="text-slate-600 mt-2"><span className="font-medium">Doctor:</span> {viewingBill.doctorName || "General Physician"}</p>
                            </div>
                            <div className="text-right space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 font-medium">Invoice No:</span>
                                    <span className="font-bold text-slate-900">{viewingBill.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 font-medium">Invoice Date:</span>
                                    <span className="font-bold text-slate-900">{viewingBill.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 font-medium">Payment Mode:</span>
                                    <span className="font-bold text-slate-900">{viewingBill.paymentMode || "Cash"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 font-medium">Status:</span>
                                    <span className={`font-bold uppercase ${viewingBill.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                                        {viewingBill.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Item Table */}
                        <div className="mb-8">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 border-y border-slate-200">
                                        <th className="py-3 px-4 font-bold text-slate-700 uppercase text-xs">Description</th>
                                        <th className="py-3 px-4 font-bold text-slate-700 uppercase text-xs text-right">Rate</th>
                                        <th className="py-3 px-4 font-bold text-slate-700 uppercase text-xs text-right">Qty</th>
                                        <th className="py-3 px-4 font-bold text-slate-700 uppercase text-xs text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 px-4 font-medium text-slate-900">
                                            Medical Services / Consultation
                                            <p className="text-xs text-slate-500 mt-1">General Ward / OPD Charges</p>
                                        </td>
                                        <td className="py-4 px-4 text-right">₹{viewingBill.amount.toFixed(2)}</td>
                                        <td className="py-4 px-4 text-right">1</td>
                                        <td className="py-4 px-4 text-right font-bold">₹{viewingBill.amount.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Totals & Bank Details */}
                        <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-7">
                                <h3 className="font-bold text-slate-900 mb-2">Bank Transfer Details</h3>
                                <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-1">
                                    <p className="flex justify-between max-w-xs"><span className="text-slate-600">Bank Name:</span> <span>HDFC Bank</span></p>
                                    <p className="flex justify-between max-w-xs"><span className="text-slate-600">Account Name:</span> <span>Unity Hospital Trust</span></p>
                                    <p className="flex justify-between max-w-xs"><span className="text-slate-600">Account No:</span> <span>50200012345678</span></p>
                                    <p className="flex justify-between max-w-xs"><span className="text-slate-600">IFSC Code:</span> <span>HDFC0001234</span></p>
                                </div>
                                <div className="mt-6">
                                    <h3 className="font-bold text-slate-900 mb-1">Terms & Conditions</h3>
                                    <ul className="list-disc list-inside text-xs text-slate-500 space-y-1">
                                        <li>Payment is due upon receipt of invoice.</li>
                                        <li>Please quote invoice number in all transactions.</li>
                                        <li>This is a computer generated invoice.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-5 space-y-3">
                                {(() => {
                                    const calc = getPrintCalculations(viewingBill);
                                    return (
                                        <>
                                            <div className="flex justify-between text-slate-600">
                                                <span>Subtotal</span>
                                                <span>₹{calc.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-600">
                                                <span>CGST ({calc.taxRate / 2}%)</span>
                                                <span>₹{calc.cgst.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-600">
                                                <span>SGST ({calc.taxRate / 2}%)</span>
                                                <span>₹{calc.sgst.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount</span>
                                                <span>- ₹{calc.discount.toFixed(2)}</span>
                                            </div>
                                            <div className="h-px bg-slate-200 my-2"></div>
                                            <div className="flex justify-between text-lg font-bold text-slate-900">
                                                <span>Total</span>
                                                <span>₹{calc.total.toFixed(2)}</span>
                                            </div>
                                        </>
                                    );
                                })()}

                                <div className="mt-12 pt-8 text-center">
                                    <p className="font-dancing-script text-2xl text-slate-800 mb-2">Unity Admin</p>
                                    <div className="h-px bg-slate-300 w-32 mx-auto mb-1"></div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Authorized Signatory</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between print:hidden">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Billing</h1>
                    <p className="text-muted-foreground">Manage patient invoices and billing details.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Generate Bill
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Generate New Invoice</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="patient">Patient Name <span className="text-red-500">*</span></Label>
                                <Input id="patient" value={newBill.patient} onChange={(e) => setNewBill({ ...newBill, patient: e.target.value })} placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Patient Mobile</Label>
                                <Input id="mobile" value={newBill.patientMobile} onChange={(e) => setNewBill({ ...newBill, patientMobile: e.target.value })} placeholder="9876543210" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="address">Patient Address</Label>
                                <Input id="address" value={newBill.patientAddress} onChange={(e) => setNewBill({ ...newBill, patientAddress: e.target.value })} placeholder="Full address..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Bill Amount (₹) <span className="text-red-500">*</span></Label>
                                <Input id="amount" type="number" value={newBill.amount} onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })} placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="doctor">Doctor Name</Label>
                                <Input id="doctor" value={newBill.doctorName} onChange={(e) => setNewBill({ ...newBill, doctorName: e.target.value })} placeholder="Dr. Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount (₹)</Label>
                                <Input id="discount" type="number" value={newBill.discount} onChange={(e) => setNewBill({ ...newBill, discount: e.target.value })} placeholder="0" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="taxRate">GST Rate (%)</Label>
                                <Input id="taxRate" type="number" value={newBill.taxRate} onChange={(e) => setNewBill({ ...newBill, taxRate: e.target.value })} placeholder="18" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="paymentMode">Payment Mode</Label>
                                <Select value={newBill.paymentMode} onValueChange={(value) => setNewBill({ ...newBill, paymentMode: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="Card">Card</SelectItem>
                                        <SelectItem value="UPI">UPI</SelectItem>
                                        <SelectItem value="Insurance">Insurance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Payment Status</Label>
                                <Select value={newBill.status} onValueChange={(value) => setNewBill({ ...newBill, status: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Paid">Paid</SelectItem>
                                        <SelectItem value="Unpaid">Unpaid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleGenerateBill} className="w-full">Generate Tax Invoice</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Bill Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Invoice</DialogTitle>
                        </DialogHeader>
                        {editingBill && (
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-patient">Patient Name</Label>
                                    <Input id="edit-patient" value={editingBill.patient} onChange={(e) => setEditingBill({ ...editingBill, patient: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-amount">Amount (₹)</Label>
                                    <Input id="edit-amount" type="number" value={editingBill.amount} onChange={(e) => setEditingBill({ ...editingBill, amount: parseFloat(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-status">Status</Label>
                                    <Select value={editingBill.status} onValueChange={(value) => setEditingBill({ ...editingBill, status: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Paid">Paid</SelectItem>
                                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={handleEditBill} className="w-full">Update Bill</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* View Bill Dialog */}
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Invoice Details</DialogTitle>
                        </DialogHeader>
                        {viewingBill && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Invoice ID</p>
                                        <p className="font-semibold">{viewingBill.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-muted-foreground">Date</p>
                                        <p>{viewingBill.date}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">Patient Name</p>
                                    <p className="text-lg">{viewingBill.patient}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                                    <p className="text-base">{viewingBill.doctorName || "-"}</p>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                                    <p className="text-xl font-bold">₹{viewingBill.amount}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge variant={viewingBill.status === "Paid" ? "default" : "destructive"}>{viewingBill.status}</Badge>
                                </div>
                                <div className="pt-4 border-t flex justify-end">
                                    <Button variant="outline" onClick={() => handlePrintBill(viewingBill)}>
                                        <Printer className="mr-2 h-4 w-4" /> Print Tax Invoice
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="print:hidden">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Invoice List</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search invoice or patient..." className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Bill No</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {billsList.map((bill) => (
                                <TableRow key={bill.id}>
                                    <TableCell className="font-medium">{bill.id}</TableCell>
                                    <TableCell>{bill.patient}</TableCell>
                                    <TableCell>{bill.date}</TableCell>
                                    <TableCell>₹{bill.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={bill.status === "Paid" ? "default" : "destructive"}>{bill.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View" onClick={() => { setViewingBill(bill); setIsViewDialogOpen(true); }}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Print" onClick={() => handlePrintBill(bill)}>
                                                <Printer className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Edit" onClick={() => { setEditingBill(bill); setIsEditDialogOpen(true); }}>
                                                <Pencil className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDeleteBill(bill.id)}>
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

export default Billing;
