
import { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Eye, RotateCcw, Trash2, Mail, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock Data for History
const initialMailHistory = [
    { id: 1, to: "patient@example.com", subject: "Appointment Confirmation", message: "Your appointment is confirmed for...", profile: "Reception", date: "2024-03-20 10:30 AM" },
    { id: 2, to: "doctor@hospital.com", subject: "Lab Report Urgent", message: "Please review the attached report...", profile: "Lab", date: "2024-03-19 02:15 PM" },
    { id: 3, to: "admin@hospital.com", subject: "Weekly Report", message: "Weekly statistics are ready...", profile: "System", date: "2024-03-18 09:00 AM" },
];

const MailPortal = () => {
    const [activeTab, setActiveTab] = useState("compose");
    const [mailHistory, setMailHistory] = useState(initialMailHistory);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        message: "",
        profile: "general",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSendMail = () => {
        if (!formData.to || !formData.subject || !formData.message) {
            toast({
                title: "Error",
                description: "Recipient, Subject and Message are required.",
                variant: "destructive",
            });
            return;
        }

        const newMail = {
            id: mailHistory.length + 1,
            to: formData.to,
            subject: formData.subject,
            message: formData.message.substring(0, 30) + "...", // truncating for preview
            profile: formData.profile,
            date: new Date().toLocaleString()
        };

        setMailHistory([newMail, ...mailHistory]);

        toast({
            title: "Success",
            description: "Mail sent successfully.",
        });

        // Reset form
        setFormData({
            to: "",
            subject: "",
            message: "",
            profile: "general",
        });

        // Switch to history tab
        setActiveTab("history");
    };

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Mail Portal</h2>
                    <p className="text-muted-foreground">Compose and view sent emails</p>
                </div>
            </div>

            <Tabs value={activeTab} className="flex-1 flex flex-col" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                    <TabsList>
                        <TabsTrigger value="compose">Compose Mail</TabsTrigger>
                        <TabsTrigger value="history">Mail History</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="compose" className="flex-1 flex flex-col data-[state=inactive]:hidden h-full">
                    <Card className="flex-1 border-0 shadow-none bg-transparent">
                        <CardContent className="p-0 h-full">
                            <ResizablePanelGroup direction="horizontal" className="h-[600px] rounded-lg border bg-card">
                                {/* Left Panel: Composer */}
                                <ResizablePanel defaultSize={50} minSize={30}>
                                    <div className="p-6 h-full flex flex-col space-y-4 overflow-y-auto">
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            <Mail className="h-5 w-5" /> Composer
                                        </h3>

                                        <div className="space-y-2">
                                            <Label htmlFor="to">To (Email Address)</Label>
                                            <Select value={formData.to} onValueChange={(val) => handleInputChange("to", val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Recipient" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="patient@example.com">John Doe (patient@example.com)</SelectItem>
                                                    <SelectItem value="doctor@hospital.com">Dr. Smith (doctor@hospital.com)</SelectItem>
                                                    <SelectItem value="staff@hospital.com">Staff (staff@hospital.com)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                placeholder="Enter subject..."
                                                value={formData.subject}
                                                onChange={(e) => handleInputChange("subject", e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="profile">Sender Profile</Label>
                                            <Select value={formData.profile} onValueChange={(val) => handleInputChange("profile", val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Profile" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="general">General Administration</SelectItem>
                                                    <SelectItem value="hr">HR Department</SelectItem>
                                                    <SelectItem value="billing">Billing Department</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2 flex-1 flex flex-col">
                                            <Label htmlFor="message">Message</Label>
                                            {/* Mock Rich Text Toolbar */}
                                            <div className="flex items-center gap-1 p-1 border rounded-t-md bg-muted/50 text-xs">
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 font-bold">B</Button>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 italic">I</Button>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 underline">U</Button>
                                            </div>
                                            <Textarea
                                                id="message"
                                                placeholder="Type your message here..."
                                                className="flex-1 resize-none rounded-t-none min-h-[200px]"
                                                value={formData.message}
                                                onChange={(e) => handleInputChange("message", e.target.value)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-end gap-2 pt-4">
                                            <Button variant="outline" onClick={() => setFormData({ to: "", subject: "", message: "", profile: "general" })}>
                                                <X className="mr-2 h-4 w-4" /> Cancel
                                            </Button>
                                            <Button onClick={handleSendMail}>
                                                <Send className="mr-2 h-4 w-4" /> Send Mail
                                            </Button>
                                        </div>
                                    </div>
                                </ResizablePanel>

                                <ResizableHandle withHandle />

                                {/* Right Panel: Preview */}
                                <ResizablePanel defaultSize={50} minSize={30}>
                                    <div className="p-6 h-full flex flex-col bg-muted/10">
                                        <h3 className="font-semibold text-lg mb-4 text-muted-foreground">Live Preview</h3>
                                        <div className="border rounded-lg bg-white p-6 shadow-sm flex-1 overflow-y-auto">
                                            <div className="border-b pb-4 mb-4 space-y-1">
                                                <p className="text-sm text-muted-foreground">From: <span className="text-foreground font-medium">Hospital Awareness ({formData.profile})</span></p>
                                                <p className="text-sm text-muted-foreground">To: <span className="text-foreground font-medium">{formData.to || "..."}</span></p>
                                                <p className="text-sm text-muted-foreground">Subject: <span className="text-foreground font-medium">{formData.subject || "..."}</span></p>
                                            </div>
                                            <div className="prose prose-sm max-w-none">
                                                {formData.message ? (
                                                    <div className="whitespace-pre-wrap">{formData.message}</div>
                                                ) : (
                                                    <p className="text-muted-foreground italic">Start typing to see preview...</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sent Mail History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>To</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Message Preview</TableHead>
                                        <TableHead>Profile</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mailHistory.map((mail) => (
                                        <TableRow key={mail.id}>
                                            <TableCell>{mail.to}</TableCell>
                                            <TableCell>{mail.subject}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">{mail.message}</TableCell>
                                            <TableCell>{mail.profile}</TableCell>
                                            <TableCell>{mail.date}</TableCell>
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
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MailPortal;
