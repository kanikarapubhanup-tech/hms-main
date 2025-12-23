import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    Plus,
    CreditCard,
    Download,
    Eye,
    Trash2,
    Edit,
    MoreHorizontal,
    Printer
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const SmartCardPortal = () => {
    const [activeTab, setActiveTab] = useState("templates");
    const [searchTerm, setSearchTerm] = useState("");

    // Mock Data for Templates
    const templates = [
        { id: 1, name: "Gold Premium", color: "#FFD700", email: "gold@hospital.com", phone: "+1 234 567 890", dob: "Yes", bg: "Yes", address: "Yes", uniqueId: "TMP-001" },
        { id: 2, name: "Silver Standard", color: "#C0C0C0", email: "silver@hospital.com", phone: "+1 987 654 321", dob: "Yes", bg: "No", address: "No", uniqueId: "TMP-002" },
        { id: 3, name: "Basic Blue", color: "#0000FF", email: "blue@hospital.com", phone: "+1 555 123 456", dob: "No", bg: "No", address: "No", uniqueId: "TMP-003" },
    ];

    // Mock Data for Generated Cards
    const generatedCards = [
        { id: 101, patientName: "John Doe", uniqueId: "PID-2024-001", template: "Gold Premium", status: "Active" },
        { id: 102, patientName: "Sarah Smith", uniqueId: "PID-2024-056", template: "Silver Standard", status: "Active" },
        { id: 103, patientName: "Michael Brown", uniqueId: "PID-2024-089", template: "Basic Blue", status: "Expired" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Patient Smart Cards</h1>
                <p className="text-muted-foreground">Manage smart card templates and issue cards to patients.</p>
            </div>

            <Tabs defaultValue="templates" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="templates">Smart Card Templates</TabsTrigger>
                    <TabsTrigger value="generate">Generate Smart Cards</TabsTrigger>
                </TabsList>

                {/* TEMPLATES TAB */}
                <TabsContent value="templates" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div className="space-y-1">
                                <CardTitle>Templates List</CardTitle>
                                <CardDescription>Manage design templates for patient smart cards.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search templates..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                                    <Plus className="mr-2 h-4 w-4" /> New Template
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead>Template Name</TableHead>
                                            <TableHead>Header Color</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>DOB</TableHead>
                                            <TableHead>Blood Group</TableHead>
                                            <TableHead>Unique ID</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {templates.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="h-24 text-center">
                                                    No data available in table
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            templates.map((template) => (
                                                <TableRow key={template.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <TableCell className="font-medium">{template.name}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="h-4 w-4 rounded-full border shadow-sm"
                                                                style={{ backgroundColor: template.color }}
                                                            />
                                                            <span className="text-xs text-muted-foreground">{template.color}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{template.email}</TableCell>
                                                    <TableCell>{template.phone}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={template.dob === "Yes" ? "outline" : "secondary"}>{template.dob}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={template.bg === "Yes" ? "outline" : "secondary"}>{template.bg}</Badge>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs text-slate-500">{template.uniqueId}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600">
                                                                            <Eye className="h-4 w-4" />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>View</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>

                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-green-600">
                                                                            <Edit className="h-4 w-4" />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>Edit</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>

                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600">
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>Delete</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing <span className="font-medium">{templates.length}</span> of <span className="font-medium">{templates.length}</span> results
                                </p>
                                <Pagination className="w-auto m-0 justify-end">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive>1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* GENERATE TAB */}
                <TabsContent value="generate" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div className="space-y-1">
                                <CardTitle>Generate Smart Cards</CardTitle>
                                <CardDescription>Issue new smart cards for registered patients.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search patient..."
                                        className="pl-8"
                                    />
                                </div>
                                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                                    <CreditCard className="mr-2 h-4 w-4" /> New Patient Smart Card
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead>Patient Name</TableHead>
                                            <TableHead>Patient ID</TableHead>
                                            <TableHead>Template Used</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {generatedCards.map((card) => (
                                            <TableRow key={card.id} className="hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="font-medium">{card.patientName}</TableCell>
                                                <TableCell className="font-mono text-xs text-slate-500">{card.uniqueId}</TableCell>
                                                <TableCell>{card.template}</TableCell>
                                                <TableCell>
                                                    <Badge variant={card.status === "Active" ? "default" : "destructive"}>
                                                        {card.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="outline" size="sm" className="h-8 gap-2">
                                                                        <CreditCard className="h-3 w-3" /> Generate
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Regenerate Card</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>

                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                                        <Download className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Download PDF</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SmartCardPortal;
