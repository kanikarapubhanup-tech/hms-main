
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
import { Search, Eye, Printer, Download, FileText } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock Data
const initialBills = [
    { id: 1, billNo: "BILL-1001", date: "2024-10-26", patient: "John Doe", doctor: "Dr. Smith", mode: "Cash", net: 150, status: "Paid" },
    { id: 2, billNo: "BILL-1002", date: "2024-10-26", patient: "Jane Smith", doctor: "Dr. Jones", mode: "Card", net: 500, status: "Unpaid" },
    { id: 3, billNo: "BILL-1003", date: "2024-10-25", patient: "Bob Brown", doctor: "Dr. Smith", mode: "Online", net: 200, status: "Paid" },
];

const MedicineBills = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [bills, setBills] = useState(initialBills);

    const filteredBills = bills.filter((bill) =>
        bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.patient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Bill or Patient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="rounded-md border shadow-sm bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bill No</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Doctor Name</TableHead>
                            <TableHead>Payment Mode</TableHead>
                            <TableHead>Net Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBills.length > 0 ? (
                            filteredBills.map((bill) => (
                                <TableRow key={bill.id}>
                                    <TableCell className="font-medium">{bill.billNo}</TableCell>
                                    <TableCell>{bill.date}</TableCell>
                                    <TableCell>{bill.patient}</TableCell>
                                    <TableCell>{bill.doctor}</TableCell>
                                    <TableCell>{bill.mode}</TableCell>
                                    <TableCell>₹{bill.net}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={bill.status === "Paid" ? "default" : "destructive"}
                                        >
                                            {bill.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" title="View">
                                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Pharmacy Bill Details</DialogTitle>
                                                        <DialogDescription>
                                                            Bill Number: {bill.billNo}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                                            <div><Label className="text-muted-foreground">Patient:</Label> <p>{bill.patient}</p></div>
                                                            <div><Label className="text-muted-foreground">Doctor:</Label> <p>{bill.doctor}</p></div>
                                                            <div><Label className="text-muted-foreground">Date:</Label> <p>{bill.date}</p></div>
                                                            <div><Label className="text-muted-foreground">Mode:</Label> <p>{bill.mode}</p></div>
                                                            <div className="col-span-2 border-t pt-2 mt-2">
                                                                <div className="flex justify-between font-bold text-lg">
                                                                    <span>Total Net:</span>
                                                                    <span>₹{bill.net}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground bg-muted/30">
                                                            Bill Preview Placeholder
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="ghost" size="icon" title="Print">
                                                <Printer className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Download">
                                                <Download className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center h-24">
                                    No bills found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MedicineBills;
