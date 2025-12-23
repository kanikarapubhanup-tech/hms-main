import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useToast } from "@/hooks/use-toast";
import {
  Scan,
  User,
  Clock,
  Package,
  Shield,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface ScanRecord {
  id: string;
  rfidTag: string;
  type: "patient" | "staff" | "asset" | "access";
  name: string;
  action: string;
  timestamp: string;
  status: "success" | "denied" | "pending";
}

const RFIDScanner = () => {
  const { toast } = useToast();
  const [scanInput, setScanInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTag, setNewTag] = useState({
    rfidTag: "",
    type: "",
    name: "",
    department: "",
  });

  const [scanRecords, setScanRecords] = useState<ScanRecord[]>([
    {
      id: "1",
      rfidTag: "RFID-001",
      type: "patient",
      name: "Rahul Sharma",
      action: "Check-in",
      timestamp: "2024-01-15 09:30:00",
      status: "success",
    },
    {
      id: "2",
      rfidTag: "RFID-002",
      type: "staff",
      name: "Dr. Priya Patel",
      action: "Clock-in",
      timestamp: "2024-01-15 08:00:00",
      status: "success",
    },
    {
      id: "3",
      rfidTag: "RFID-003",
      type: "asset",
      name: "Ultrasound Machine #5",
      action: "Location Update",
      timestamp: "2024-01-15 10:15:00",
      status: "success",
    },
    {
      id: "4",
      rfidTag: "RFID-004",
      type: "access",
      name: "Unknown Card",
      action: "ICU Access Attempt",
      timestamp: "2024-01-15 11:00:00",
      status: "denied",
    },
  ]);

  const [registeredTags] = useState([
    { id: "1", rfidTag: "RFID-001", type: "patient", name: "Rahul Sharma", department: "General" },
    { id: "2", rfidTag: "RFID-002", type: "staff", name: "Dr. Priya Patel", department: "Cardiology" },
    { id: "3", rfidTag: "RFID-003", type: "asset", name: "Ultrasound Machine #5", department: "Radiology" },
    { id: "4", rfidTag: "RFID-005", type: "staff", name: "Nurse Anjali", department: "ICU" },
  ]);

  const handleScan = () => {
    if (!scanInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter or scan an RFID tag",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate scan processing
    setTimeout(() => {
      const existingTag = registeredTags.find(t => t.rfidTag === scanInput);
      
      const newRecord: ScanRecord = {
        id: Date.now().toString(),
        rfidTag: scanInput,
        type: existingTag?.type as any || "access",
        name: existingTag?.name || "Unknown Tag",
        action: existingTag ? (existingTag.type === "patient" ? "Check-in" : existingTag.type === "staff" ? "Clock-in" : "Scanned") : "Access Denied",
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
        status: existingTag ? "success" : "denied",
      };

      setScanRecords(prev => [newRecord, ...prev]);
      setScanInput("");
      setIsScanning(false);

      toast({
        title: existingTag ? "Scan Successful" : "Access Denied",
        description: existingTag ? `${existingTag.name} - ${newRecord.action}` : "Unregistered RFID tag",
        variant: existingTag ? "default" : "destructive",
      });
    }, 1000);
  };

  const handleAddTag = () => {
    if (!newTag.rfidTag || !newTag.type || !newTag.name) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tag Registered",
      description: `RFID tag ${newTag.rfidTag} registered for ${newTag.name}`,
    });
    setShowAddDialog(false);
    setNewTag({ rfidTag: "", type: "", name: "", department: "" });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "patient": return <User className="h-4 w-4" />;
      case "staff": return <Clock className="h-4 w-4" />;
      case "asset": return <Package className="h-4 w-4" />;
      case "access": return <Shield className="h-4 w-4" />;
      default: return <Scan className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
      case "denied":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Denied</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      patient: "bg-primary/10 text-primary border-primary/20",
      staff: "bg-success/10 text-success border-success/20",
      asset: "bg-warning/10 text-warning border-warning/20",
      access: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge className={colors[type] || ""}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">RFID Scanner</h1>
        <p className="page-subtitle">Manage patient check-ins, staff attendance, asset tracking, and access control</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Patient Check-ins</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Staff On-Duty</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Package className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tracked Assets</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Access Denied</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="scan">Scanner</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="tags">Registered Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Scan RFID Tag
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter or scan RFID tag..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleScan()}
                    className="text-lg h-12"
                  />
                </div>
                <Button 
                  onClick={handleScan} 
                  disabled={isScanning}
                  className="h-12 px-8"
                >
                  {isScanning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="h-4 w-4 mr-2" />
                      Scan
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <Scan className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground">Place RFID card near the scanner or enter tag ID manually</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scanRecords.slice(0, 5).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.rfidTag}</TableCell>
                      <TableCell>{getTypeBadge(record.type)}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.action}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{record.timestamp}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Scan History</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search records..." className="pl-10 w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scanRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.rfidTag}</TableCell>
                      <TableCell>{getTypeBadge(record.type)}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.action}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{record.timestamp}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Registered RFID Tags</CardTitle>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Register Tag
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Register New RFID Tag</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>RFID Tag ID</Label>
                      <Input
                        placeholder="Enter RFID tag ID"
                        value={newTag.rfidTag}
                        onChange={(e) => setNewTag({ ...newTag, rfidTag: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select value={newTag.type} onValueChange={(v) => setNewTag({ ...newTag, type: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="asset">Asset</SelectItem>
                          <SelectItem value="access">Access Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input
                        placeholder="Enter name"
                        value={newTag.name}
                        onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Input
                        placeholder="Enter department"
                        value={newTag.department}
                        onChange={(e) => setNewTag({ ...newTag, department: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddTag} className="w-full">Register Tag</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registeredTags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell className="font-mono text-sm">{tag.rfidTag}</TableCell>
                      <TableCell>{getTypeBadge(tag.type)}</TableCell>
                      <TableCell>{tag.name}</TableCell>
                      <TableCell>{tag.department}</TableCell>
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

export default RFIDScanner;
