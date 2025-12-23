import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Activity,
    BedDouble,
    Pill,
    FlaskConical,
    Scan,
    Droplet,
    CreditCard,
    Users,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ReportsPortal = () => {
    // Mock Data for Reports
    const reportSummaries = [
        {
            title: "OPD Reports",
            icon: Activity,
            color: "text-blue-500",
            stats: [
                { label: "Total Patients", value: "1,245", trend: "+12%", trendUp: true },
                { label: "New Registrations", value: "450", trend: "+5%", trendUp: true },
            ],
            metrics: "320 avg/day"
        },
        {
            title: "IPD Reports",
            icon: BedDouble,
            color: "text-green-500",
            stats: [
                { label: "Admissions", value: "85", trend: "-2%", trendUp: false },
                { label: "Discharges", value: "72", trend: "+8%", trendUp: true },
            ],
            metrics: "92% Occupancy"
        },
        {
            title: "Pharmacy",
            icon: Pill,
            color: "text-purple-500",
            stats: [
                { label: "Total Sales", value: "₹4.2L", trend: "+15%", trendUp: true },
                { label: "Medicines Expiring", value: "12", trend: "Alert", trendUp: false },
            ],
            metrics: "1,500 Prescriptions"
        },
        {
            title: "Pathology",
            icon: FlaskConical,
            color: "text-orange-500",
            stats: [
                { label: "Tests Performed", value: "850", trend: "+6%", trendUp: true },
                { label: "Pending Reports", value: "24", trend: "Normal", trendUp: true },
            ],
            metrics: "98% TAT"
        },
        {
            title: "Radiology",
            icon: Scan,
            color: "text-indigo-500",
            stats: [
                { label: "X-Rays", value: "120", trend: "+2%", trendUp: true },
                { label: "MRI/CT", value: "45", trend: "-5%", trendUp: false },
            ],
            metrics: "15 avg/day"
        },
        {
            title: "Blood Bank",
            icon: Droplet,
            color: "text-red-500",
            stats: [
                { label: "Units Available", value: "124", trend: "Stable", trendUp: true },
                { label: "Units Issued", value: "35", trend: "+10%", trendUp: true },
            ],
            metrics: "A+ Critical"
        },
        {
            title: "Finance",
            icon: CreditCard,
            color: "text-yellow-600",
            stats: [
                { label: "Income", value: "₹12.5L", trend: "+8%", trendUp: true },
                { label: "Expense", value: "₹8.2L", trend: "+3%", trendUp: false },
            ],
            metrics: "Net: +₹4.3L"
        },
        {
            title: "Human Resources",
            icon: Users,
            color: "text-teal-500",
            stats: [
                { label: "Active Staff", value: "150", trend: "Stable", trendUp: true },
                { label: "On Leave", value: "8", trend: "2% Rate", trendUp: true },
            ],
            metrics: "Payroll Due: 25th"
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Comprehensive insights across all hospital departments.</p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="this_month">
                        <SelectTrigger className="w-[180px]">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="this_week">This Week</SelectItem>
                            <SelectItem value="this_month">This Month</SelectItem>
                            <SelectItem value="last_month">Last Month</SelectItem>
                            <SelectItem value="this_year">This Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export All
                    </Button>
                </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {reportSummaries.map((report, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: report.color.replace('text-', 'bg-') }}> {/* Fallback approximate color logic or use specific class if needed, keeping simple for now */}
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-semibold">{report.title}</CardTitle>
                            <report.icon className={`h-5 w-5 ${report.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="mt-2 space-y-4">
                                {report.stats.map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{stat.label}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold font-mono">{stat.value}</span>
                                            <Badge variant={stat.trendUp ? "outline" : "secondary"} className={`text-[10px] h-5 px-1 ${stat.trendUp ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                                                {stat.trendUp ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                                                {stat.trend}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-2 border-t text-xs text-muted-foreground flex justify-between items-center">
                                    <span>Primary Metric:</span>
                                    <span className="font-medium text-foreground">{report.metrics}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions or Recent Generated Reports */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-lg">Recently Generated Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {[
                            { name: "Monthly Financial Audit - March 2024", width: "2.4 MB", date: "Just now", type: "PDF" },
                            { name: "Weekly OPD Statistics", width: "1.1 MB", date: "2 hours ago", type: "Excel" },
                            { name: "Inventory Stock Level Report", width: "850 KB", date: "Yesterday", type: "CSV" }
                        ].map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xs">
                                        {file.type}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{file.width} • {file.date}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Download</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReportsPortal;
