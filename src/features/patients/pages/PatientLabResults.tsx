import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Search, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PatientLabResults = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const labReports = [
        {
            id: "LAB-001",
            testName: "Complete Blood Count (CBC)",
            doctor: "Dr. Sarah Wilson",
            date: "2024-03-14",
            status: "Normal",
            category: "Haematology"
        },
        {
            id: "LAB-002",
            testName: "Lipid Profile",
            doctor: "Dr. Sarah Wilson",
            date: "2024-03-14",
            status: "Abnormal",
            category: "Biochemistry"
        },
        {
            id: "LAB-003",
            testName: "Thyroid Function Test",
            doctor: "Dr. John Doe",
            date: "2024-02-20",
            status: "Normal",
            category: "Endocrinology"
        },
        {
            id: "LAB-004",
            testName: "Urine Routine",
            doctor: "Dr. Emily Chen",
            date: "2024-01-05",
            status: "Normal",
            category: "Pathology"
        }
    ];

    const filteredReports = labReports.filter(report =>
        report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Lab Results</h1>
                    <p className="text-muted-foreground">View and download your laboratory test reports.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <CardTitle className="flex items-center gap-2">
                            <FlaskConical className="h-5 w-5 text-purple-500" />
                            Lab Reports List
                        </CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search test or doctor..."
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
                                <TableHead>Test Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Prescribed By</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">
                                        <div>{report.testName}</div>
                                        <div className="text-xs text-muted-foreground">{report.id}</div>
                                    </TableCell>
                                    <TableCell>{report.category}</TableCell>
                                    <TableCell>{report.doctor}</TableCell>
                                    <TableCell>{report.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={report.status === "Normal" ? "outline" : "destructive"}>
                                            {report.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View Report">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" title="Download PDF">
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

export default PatientLabResults;
