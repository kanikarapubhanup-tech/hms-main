import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Activity } from "lucide-react";

const Analytics = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics</h1>
                    <p className="text-muted-foreground">Hospital performance and statistics overview.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-[300px] flex flex-col justify-center items-center text-muted-foreground bg-muted/10 border-dashed">
                    <BarChart className="h-12 w-12 mb-4 opacity-50" />
                    <p>Patient Statistics Chart Placeholder</p>
                </Card>
                <Card className="h-[300px] flex flex-col justify-center items-center text-muted-foreground bg-muted/10 border-dashed">
                    <PieChart className="h-12 w-12 mb-4 opacity-50" />
                    <p>Department Performance Chart Placeholder</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" /> Detailed Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg border hover:bg-slate-50 cursor-pointer">
                                <h3 className="font-semibold">OPD Report</h3>
                                <p className="text-xs text-muted-foreground">Daily outpatient details</p>
                            </div>
                            <div className="p-4 rounded-lg border hover:bg-slate-50 cursor-pointer">
                                <h3 className="font-semibold">IPD Report</h3>
                                <p className="text-xs text-muted-foreground">Admissions & Discharges</p>
                            </div>
                            <div className="p-4 rounded-lg border hover:bg-slate-50 cursor-pointer">
                                <h3 className="font-semibold">Pharmacy Sales</h3>
                                <p className="text-xs text-muted-foreground">Medicine sales report</p>
                            </div>
                            <div className="p-4 rounded-lg border hover:bg-slate-50 cursor-pointer">
                                <h3 className="font-semibold">Payroll</h3>
                                <p className="text-xs text-muted-foreground">Staff salary reports</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
