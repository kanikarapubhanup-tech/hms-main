import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Search, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PatientPrescriptions = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const prescriptions = [
        {
            id: "RX-2024-001",
            doctor: "Dr. Sarah Wilson",
            date: "2024-03-15",
            medications: ["Amoxicillin 500mg", "Paracetamol 650mg"],
            status: "Active"
        },
        {
            id: "RX-2024-002",
            doctor: "Dr. John Doe",
            date: "2024-02-28",
            medications: ["Lisinopril 10mg"],
            status: "Completed"
        },
        {
            id: "RX-2024-003",
            doctor: "Dr. Emily Chen",
            date: "2024-01-10",
            medications: ["Ibuprofen 400mg", "Cetirizine 10mg"],
            status: "Completed"
        },
    ];

    const filteredPrescriptions = prescriptions.filter(rx =>
        rx.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rx.medications.some(med => med.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">My Prescriptions</h1>
                    <p className="text-muted-foreground">View and download your medical prescriptions.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <CardTitle className="flex items-center gap-2">
                            <Pill className="h-5 w-5 text-primary" />
                            Prescription History
                        </CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search doctor or medicine..."
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
                                <TableHead>Rx ID</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Medicines</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPrescriptions.map((rx) => (
                                <TableRow key={rx.id}>
                                    <TableCell className="font-medium">{rx.id}</TableCell>
                                    <TableCell>{rx.doctor}</TableCell>
                                    <TableCell>{rx.date}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {rx.medications.map((med, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {med}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={rx.status === "Active" ? "default" : "secondary"}>
                                            {rx.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View Details">
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

export default PatientPrescriptions;
