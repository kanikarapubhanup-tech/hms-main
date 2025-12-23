import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FlaskConical, Download, Eye } from "lucide-react";

const results = [
    { id: 1, patient: "Sarah Johnson", test: "CBC", date: "2024-03-20", status: "Critical", doctor: "Dr. Wilson" },
    { id: 2, patient: "Mike Brown", test: "Lipid Profile", date: "2024-03-19", status: "Normal", doctor: "Dr. Smith" },
    { id: 3, patient: "Emily Davis", test: "Blood Sugar", date: "2024-03-18", status: "Normal", doctor: "Dr. Wilson" },
];

const DoctorLabResults = () => {
    return (
        <div className="space-y-6">
            <div className="page-header">
                <h1 className="page-title">Lab Results</h1>
                <p className="page-subtitle">View and analyze patient laboratory reports.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Reports</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search patient..." className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Result Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell className="font-medium">{r.patient}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <FlaskConical className="h-4 w-4 text-muted-foreground" />
                                            {r.test}
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={r.status === "Critical" ? "destructive" : "outline"}>
                                            {r.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
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

export default DoctorLabResults;
