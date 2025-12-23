
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, RotateCcw, Trash2, Search, MessageSquare, Plus } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

// Mock Data
const initialSMSData = [
    { id: 1, sendTo: "John Doe (Patient)", phone: "+1 234 567 8900", sentBy: "System", status: "Delivered", date: "2024-03-20 10:30 AM" },
    { id: 2, sendTo: "Dr. Smith (Doctor)", phone: "+1 234 567 8901", sentBy: "Admin", status: "Pending", date: "2024-03-20 11:15 AM" },
    { id: 3, sendTo: "Jane Smith (Staff)", phone: "+1 234 567 8902", sentBy: "Receptionist", status: "Delivered", date: "2024-03-19 09:45 AM" },
    { id: 4, sendTo: "Michael Brown (Patient)", phone: "+1 234 567 8903", sentBy: "System", status: "Failed", date: "2024-03-19 02:20 PM" },
    { id: 5, sendTo: "Sarah Wilson (Doctor)", phone: "+1 234 567 8904", sentBy: "Admin", status: "Delivered", date: "2024-03-18 04:10 PM" },
];

const SMSPortal = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState(initialSMSData);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [newSMS, setNewSMS] = useState({
        sendTo: "",
        phone: "",
        message: "",
    });

    const handleSendSMS = () => {
        if (!newSMS.sendTo || !newSMS.phone || !newSMS.message) {
            toast({
                title: "Error",
                description: "All fields are required.",
                variant: "destructive",
            });
            return;
        }

        const sms = {
            id: data.length + 1,
            sendTo: newSMS.sendTo,
            phone: newSMS.phone,
            sentBy: "Admin", // Assuming current user is Admin
            status: "Delivered", // Mocking success
            date: new Date().toLocaleString(),
        };

        setData([sms, ...data]);
        setIsAddDialogOpen(false);
        setNewSMS({
            sendTo: "",
            phone: "",
            message: "",
        });

        toast({
            title: "Success",
            description: "SMS Sent Successfully.",
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Delivered":
                return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
            case "Pending":
                return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Pending</Badge>;
            case "Failed":
                return <Badge variant="destructive">Failed</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const filteredData = data.filter(
        (item) =>
            item.sendTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">SMS Portal</h2>
                    <p className="text-muted-foreground">Manage and track sent SMS messages</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            New SMS
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Send New SMS</DialogTitle>
                            <DialogDescription>
                                Send a text message to a patient or staff member.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="sendTo" className="text-right">
                                    Send To
                                </Label>
                                <Input
                                    id="sendTo"
                                    value={newSMS.sendTo}
                                    onChange={(e) => setNewSMS({ ...newSMS, sendTo: e.target.value })}
                                    className="col-span-3"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    value={newSMS.phone}
                                    onChange={(e) => setNewSMS({ ...newSMS, phone: e.target.value })}
                                    className="col-span-3"
                                    placeholder="+1 234..."
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="message" className="text-right">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    value={newSMS.message}
                                    onChange={(e) => setNewSMS({ ...newSMS, message: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Type your message..."
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSendSMS}>Send SMS</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-4 rounded-lg border shadow-sm">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or phone..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border bg-card shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Send To</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Sent By</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.sendTo}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.sentBy}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View">
                                                <Eye className="h-4 w-4 text-blue-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Resend">
                                                <RotateCcw className="h-4 w-4 text-orange-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete">
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Mockup */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default SMSPortal;
