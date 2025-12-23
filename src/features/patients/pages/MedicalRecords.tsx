import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const records = [
    { id: 1, type: "Discharge Summary", date: "2024-03-15", doctor: "Dr. Sarah Wilson", department: "Cardiology", status: "Finalized" },
    { id: 2, type: "Operative Report", date: "2024-02-10", doctor: "Dr. John Smith", department: "Surgery", status: "Finalized" },
    { id: 3, type: "Consultation Note", date: "2024-01-20", doctor: "Dr. Emily Chen", department: "General Medicine", status: "Draft" },
    { id: 4, type: "X-Ray Report", date: "2023-12-05", doctor: "Radiology Dept", department: "Radiology", status: "Finalized" },
];

const MedicalRecords = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">Medical Records</h1>
                <p className="page-subtitle">View and download your medical history documents</p>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Documents History</CardTitle>
                    <div className="w-64">
                        <Input placeholder="Search documents..." />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Doctor / Dept</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-500" />
                                            {record.type}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {record.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            {record.doctor}
                                        </div>
                                        <span className="text-xs text-muted-foreground ml-4">{record.department}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={record.status === "Finalized" ? "default" : "secondary"}>
                                            {record.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
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

export default MedicalRecords;
