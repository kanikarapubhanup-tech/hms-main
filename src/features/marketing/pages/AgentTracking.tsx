import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Users,
  Clock,
  Navigation,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Timer,
  Route,
  Phone,
  Calendar,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  phone: string;
  status: "online" | "offline" | "busy";
  currentLocation: string;
  lastUpdate: string;
  todayVisits: number;
  totalDistance: string;
}

interface VisitLog {
  id: string;
  agentId: string;
  agentName: string;
  location: string;
  address: string;
  checkInTime: string;
  checkOutTime: string | null;
  duration: string | null;
  notes: string;
  status: "in-progress" | "completed" | "missed";
}

interface CheckIn {
  id: string;
  agentId: string;
  agentName: string;
  location: string;
  timestamp: string;
  type: "check-in" | "check-out";
  coordinates: { lat: number; lng: number };
}

const AgentTracking = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("live");
  const [showCheckInDialog, setShowCheckInDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [agents] = useState<Agent[]>([
    { id: "1", name: "Amit Verma", phone: "+91 98765 11111", status: "online", currentLocation: "Apollo Hospital, Delhi", lastUpdate: "2 mins ago", todayVisits: 4, totalDistance: "23.5 km" },
    { id: "2", name: "Sneha Gupta", phone: "+91 98765 22222", status: "busy", currentLocation: "Max Healthcare, Gurgaon", lastUpdate: "5 mins ago", todayVisits: 3, totalDistance: "18.2 km" },
    { id: "3", name: "Ravi Sharma", phone: "+91 98765 33333", status: "online", currentLocation: "Fortis Hospital, Noida", lastUpdate: "1 min ago", todayVisits: 5, totalDistance: "31.0 km" },
    { id: "4", name: "Priya Singh", phone: "+91 98765 44444", status: "offline", currentLocation: "Last: Medanta, Gurgaon", lastUpdate: "1 hour ago", todayVisits: 2, totalDistance: "12.5 km" },
  ]);

  const [visitLogs] = useState<VisitLog[]>([
    { id: "1", agentId: "1", agentName: "Amit Verma", location: "Apollo Hospital", address: "Sarita Vihar, Delhi", checkInTime: "09:30 AM", checkOutTime: "10:45 AM", duration: "1h 15m", notes: "Met with Dr. Sharma, discussed new product line", status: "completed" },
    { id: "2", agentId: "1", agentName: "Amit Verma", location: "Max Super Specialty", address: "Patparganj, Delhi", checkInTime: "11:15 AM", checkOutTime: "12:00 PM", duration: "45m", notes: "Follow-up visit, collected pending orders", status: "completed" },
    { id: "3", agentId: "2", agentName: "Sneha Gupta", location: "Max Healthcare", address: "Sector 19, Gurgaon", checkInTime: "10:00 AM", checkOutTime: null, duration: null, notes: "Meeting with procurement team", status: "in-progress" },
    { id: "4", agentId: "3", agentName: "Ravi Sharma", location: "Fortis Hospital", address: "Sector 62, Noida", checkInTime: "09:00 AM", checkOutTime: "09:45 AM", duration: "45m", notes: "Product demo completed", status: "completed" },
    { id: "5", agentId: "3", agentName: "Ravi Sharma", location: "Jaypee Hospital", address: "Sector 128, Noida", checkInTime: "10:30 AM", checkOutTime: "11:30 AM", duration: "1h", notes: "Contract renewal discussion", status: "completed" },
  ]);

  const [checkIns] = useState<CheckIn[]>([
    { id: "1", agentId: "1", agentName: "Amit Verma", location: "Apollo Hospital, Delhi", timestamp: "09:30 AM", type: "check-in", coordinates: { lat: 28.5355, lng: 77.2583 } },
    { id: "2", agentId: "1", agentName: "Amit Verma", location: "Apollo Hospital, Delhi", timestamp: "10:45 AM", type: "check-out", coordinates: { lat: 28.5355, lng: 77.2583 } },
    { id: "3", agentId: "2", agentName: "Sneha Gupta", location: "Max Healthcare, Gurgaon", timestamp: "10:00 AM", type: "check-in", coordinates: { lat: 28.4595, lng: 77.0266 } },
    { id: "4", agentId: "3", agentName: "Ravi Sharma", location: "Fortis Hospital, Noida", timestamp: "09:00 AM", type: "check-in", coordinates: { lat: 28.5679, lng: 77.3219 } },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle className="h-3 w-3 mr-1" />Online</Badge>;
      case "busy":
        return <Badge className="bg-warning/10 text-warning border-warning/20"><Timer className="h-3 w-3 mr-1" />Busy</Badge>;
      case "offline":
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Offline</Badge>;
      case "in-progress":
        return <Badge className="bg-primary/10 text-primary border-primary/20"><Timer className="h-3 w-3 mr-1" />In Progress</Badge>;
      case "completed":
        return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.currentLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Marketing Agent Tracking</h1>
        <p className="page-subtitle">Real-time GPS tracking, check-ins, and visit logs for field agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agents Online</p>
                <p className="text-2xl font-bold">{agents.filter(a => a.status !== "offline").length}/{agents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Visits</p>
                <p className="text-2xl font-bold">{agents.reduce((sum, a) => sum + a.todayVisits, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Route className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Distance</p>
                <p className="text-2xl font-bold">{agents.reduce((sum, a) => sum + parseFloat(a.totalDistance), 0).toFixed(1)} km</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-chart-4/10 rounded-lg">
                <Clock className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Visit Time</p>
                <p className="text-2xl font-bold">52 mins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="live">Live Tracking</TabsTrigger>
          <TabsTrigger value="visits">Visit Logs</TabsTrigger>
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Live Map View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                  <div className="text-center z-10">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Map integration ready</p>
                    <p className="text-sm text-muted-foreground mt-1">Connect to view real-time agent locations</p>
                  </div>
                  {/* Agent markers simulation */}
                  <div className="absolute top-20 left-32 flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-success animate-pulse" />
                    <span className="text-xs bg-card px-2 py-1 rounded shadow">Amit V.</span>
                  </div>
                  <div className="absolute top-40 right-40 flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-warning animate-pulse" />
                    <span className="text-xs bg-card px-2 py-1 rounded shadow">Sneha G.</span>
                  </div>
                  <div className="absolute bottom-32 left-52 flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-success animate-pulse" />
                    <span className="text-xs bg-card px-2 py-1 rounded shadow">Ravi S.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Agent Status</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search..." 
                    className="pl-10 w-40"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {agent.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />{agent.phone}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(agent.status)}
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{agent.currentLocation}</p>
                        <p className="text-xs text-muted-foreground">Updated {agent.lastUpdate}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Today: {agent.todayVisits} visits</span>
                      <span className="text-muted-foreground">{agent.totalDistance}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visits" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Visit Logs</CardTitle>
              <div className="flex gap-2">
                <Input type="date" className="w-40" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Agents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    {agents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.agentName}</TableCell>
                      <TableCell>
                        <div>
                          <p>{log.location}</p>
                          <p className="text-xs text-muted-foreground">{log.address}</p>
                        </div>
                      </TableCell>
                      <TableCell>{log.checkInTime}</TableCell>
                      <TableCell>{log.checkOutTime || "-"}</TableCell>
                      <TableCell>{log.duration || "-"}</TableCell>
                      <TableCell className="max-w-xs truncate">{log.notes}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkins" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Check-in History</CardTitle>
              <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
                <DialogTrigger asChild>
                  <Button><Plus className="h-4 w-4 mr-2" />Manual Check-in</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manual Check-in</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Agent</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select agent" /></SelectTrigger>
                        <SelectContent>
                          {agents.map(agent => (
                            <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input placeholder="Enter location name" />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="check-in">Check-in</SelectItem>
                          <SelectItem value="check-out">Check-out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Notes</Label>
                      <Textarea placeholder="Optional notes" />
                    </div>
                    <Button className="w-full" onClick={() => {
                      toast({ title: "Check-in Recorded", description: "Manual check-in has been saved." });
                      setShowCheckInDialog(false);
                    }}>Save Check-in</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Coordinates</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checkIns.map((checkIn) => (
                    <TableRow key={checkIn.id}>
                      <TableCell className="font-medium">{checkIn.agentName}</TableCell>
                      <TableCell>{checkIn.location}</TableCell>
                      <TableCell>
                        <Badge className={checkIn.type === "check-in" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                          {checkIn.type === "check-in" ? "Check-in" : "Check-out"}
                        </Badge>
                      </TableCell>
                      <TableCell>{checkIn.timestamp}</TableCell>
                      <TableCell className="text-muted-foreground text-sm font-mono">
                        {checkIn.coordinates.lat.toFixed(4)}, {checkIn.coordinates.lng.toFixed(4)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentTracking;
