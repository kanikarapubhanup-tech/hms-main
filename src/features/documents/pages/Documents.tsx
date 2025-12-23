import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Upload, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Documents = () => {
    const docs = [
        { id: 1, title: "Hospital Policies v2.0", type: "PDF", size: "2.5 MB", uploadDate: "2024-01-15", uploadedBy: "Admin" },
        { id: 2, title: "Staff Handbook", type: "PDF", size: "1.2 MB", uploadDate: "2024-02-10", uploadedBy: "HR" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Documents</h1>
                    <p className="text-muted-foreground">Centralized document repository.</p>
                </div>
                <Button>
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Documents</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search documents..." className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Upload Date</TableHead>
                                <TableHead>Uploaded By</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {docs.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-blue-500" />
                                        {d.title}
                                    </TableCell>
                                    <TableCell>{d.type}</TableCell>
                                    <TableCell>{d.size}</TableCell>
                                    <TableCell>{d.uploadDate}</TableCell>
                                    <TableCell>{d.uploadedBy}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
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

export default Documents;
