import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    FlaskConical,
    Stethoscope,
    CreditCard,
    Activity,
    Calendar,
    Download,
    ChevronRight,
    AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const PatientDashboard = () => {
    // Mock Data
    const medicalDetails = {
        bloodGroup: "O+",
        height: "175 cm",
        weight: "70 kg",
        allergies: "Peanuts, Penicillin",
        chronicConditions: "Hypertension",
    };

    const recentPrescriptions = [
        {
            id: "RX-2024-001",
            date: "2024-03-15",
            doctor: "Dr. Sarah Wilson",
            medications: ["Amoxicillin 500mg", "Paracetamol 650mg"],
            status: "Active"
        },
        {
            id: "RX-2024-002",
            date: "2024-02-28",
            doctor: "Dr. John Doe",
            medications: ["Lisinopril 10mg"],
            status: "Completed"
        }
    ];

    const labReports = [
        {
            id: "LAB-001",
            testName: "Complete Blood Count",
            date: "2024-03-14",
            status: "Normal",
            doctor: "Dr. Sarah Wilson"
        },
        {
            id: "LAB-002",
            testName: "Lipid Profile",
            date: "2024-03-14",
            status: "Attention Required",
            doctor: "Dr. Sarah Wilson"
        }
    ];

    const billings = [
        {
            id: "INV-2024-001",
            date: "2024-03-15",
            description: "General Consultation",
            amount: 150.00,
            status: "Paid"
        },
        {
            id: "INV-2024-002",
            date: "2024-03-14",
            description: "Lab Tests - CBC, Lipid Profile",
            amount: 450.00,
            status: "Pending"
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Health Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, get an overview of your health records.</p>
                </div>
                <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                </Button>
            </div>

            {/* Medical Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blood Group</CardTitle>
                        <Activity className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{medicalDetails.bloodGroup}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Height/Weight</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{medicalDetails.height} / {medicalDetails.weight}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Allergies</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium truncate" title={medicalDetails.allergies}>{medicalDetails.allergies}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conditions</CardTitle>
                        <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium truncate" title={medicalDetails.chronicConditions}>{medicalDetails.chronicConditions}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Prescriptions */}
                <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Recent Prescriptions
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-sm">View All <ChevronRight className="h-4 w-4 ml-1" /></Button>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[250px] pr-4">
                            <div className="space-y-4">
                                {recentPrescriptions.map((rx) => (
                                    <div key={rx.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-primary">{rx.id}</span>
                                                <Badge variant={rx.status === "Active" ? "default" : "secondary"}>{rx.status}</Badge>
                                            </div>
                                            <p className="text-sm text-foreground">{rx.medications.join(", ")}</p>
                                            <p className="text-xs text-muted-foreground">Prescribed by {rx.doctor} on {rx.date}</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                                            <Download className="h-3 w-3 mr-1" /> PDF
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Lab Reports */}
                <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <FlaskConical className="h-5 w-5 text-purple-500" />
                            Lab Details & Reports
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-sm">View All <ChevronRight className="h-4 w-4 ml-1" /></Button>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[250px] pr-4">
                            <div className="space-y-4">
                                {labReports.map((report) => (
                                    <div key={report.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{report.testName}</span>
                                                <Badge variant={report.status === "Normal" ? "outline" : "destructive"}>{report.status}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Ordered by {report.doctor} on {report.date}</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                                            <Download className="h-3 w-3 mr-1" /> View
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Medical Details/History */}
                <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Stethoscope className="h-5 w-5 text-green-500" />
                            Medical Details
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-sm">View All <ChevronRight className="h-4 w-4 ml-1" /></Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 border rounded-lg">
                                <h4 className="font-semibold text-sm mb-1">Previous Diagnosis</h4>
                                <p className="text-sm text-muted-foreground">Mild Bronchitis - Jan 2024</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <h4 className="font-semibold text-sm mb-1">Surgeries</h4>
                                <p className="text-sm text-muted-foreground">Appendectomy - 2018</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <h4 className="font-semibold text-sm mb-1">Next Follow-up</h4>
                                <p className="text-sm text-primary font-medium">March 25, 2024 with Dr. Sarah Wilson</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Billings */}
                <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-yellow-600" />
                            Billings & Payments
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-sm">View All <ChevronRight className="h-4 w-4 ml-1" /></Button>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[250px] pr-4">
                            <div className="space-y-4">
                                {billings.map((bill) => (
                                    <div key={bill.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{bill.description}</span>
                                                <Badge variant={bill.status === "Paid" ? "outline" : "secondary"} className={bill.status === "Paid" ? "text-green-600 border-green-600" : ""}>{bill.status}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Date: {bill.date} | Invoice: {bill.id}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 sm:mt-0">
                                            <span className="font-bold text-foreground">₹{bill.amount}</span>
                                            {bill.status === "Pending" && <Button size="sm">Pay Now</Button>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PatientDashboard;
