import { BedDouble, Activity, Users, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BedStatus from "../components/BedStatus";
import BedAssigns from "../components/BedAssigns";
import BedsList from "../components/BedsList";
import BedTypes from "../components/BedTypes";

const stats = [
    { title: "Total Beds", value: "150", icon: BedDouble, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Available Beds", value: "45", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
    { title: "Occupied Beds", value: "98", icon: Users, color: "text-red-500", bg: "bg-red-50" },
    { title: "Under Maintenance", value: "7", icon: Wrench, color: "text-yellow-500", bg: "bg-yellow-50" },
];

const BedManagement = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">Bed Management Portal</h1>
                <p className="page-subtitle">Manage hospital beds, wards, and patient assignments</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="status" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="status">Bed Status</TabsTrigger>
                    <TabsTrigger value="assigns">Bed Assigns</TabsTrigger>
                    <TabsTrigger value="beds">Beds</TabsTrigger>
                    <TabsTrigger value="types">Bed Types</TabsTrigger>
                </TabsList>
                <TabsContent value="status" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Real-time Bed Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BedStatus />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="assigns" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Bed Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BedAssigns />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="beds" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Beds</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BedsList />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="types" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bed Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BedTypes />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default BedManagement;
