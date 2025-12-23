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
  Users,
  Calendar,
  DollarSign,
  Star,
  Plus,
  Search,
  Phone,
  Mail,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: "active" | "on-leave" | "inactive";
  joinDate: string;
  salary: number;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "vacation" | "sick" | "personal" | "maternity";
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewDate: string;
  rating: number;
  reviewer: string;
  feedback: string;
  status: "completed" | "pending" | "scheduled";
}

const HRManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("employees");
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [employees] = useState<Employee[]>([
    { id: "1", name: "Dr. Priya Patel", email: "priya@hospital.com", phone: "+91 98765 43210", department: "Cardiology", role: "Senior Doctor", status: "active", joinDate: "2020-03-15", salary: 150000 },
    { id: "2", name: "Dr. Rajesh Kumar", email: "rajesh@hospital.com", phone: "+91 98765 43211", department: "Neurology", role: "Doctor", status: "active", joinDate: "2021-06-01", salary: 120000 },
    { id: "3", name: "Nurse Anjali Singh", email: "anjali@hospital.com", phone: "+91 98765 43212", department: "ICU", role: "Head Nurse", status: "on-leave", joinDate: "2019-01-10", salary: 60000 },
    { id: "4", name: "Admin Vikram Sharma", email: "vikram@hospital.com", phone: "+91 98765 43213", department: "Administration", role: "Admin Manager", status: "active", joinDate: "2018-08-20", salary: 80000 },
    { id: "5", name: "Dr. Meera Reddy", email: "meera@hospital.com", phone: "+91 98765 43214", department: "Pediatrics", role: "Doctor", status: "active", joinDate: "2022-02-28", salary: 110000 },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: "1", employeeId: "3", employeeName: "Nurse Anjali Singh", type: "sick", startDate: "2024-01-15", endDate: "2024-01-17", status: "approved", reason: "Medical treatment required" },
    { id: "2", employeeId: "2", employeeName: "Dr. Rajesh Kumar", type: "vacation", startDate: "2024-01-20", endDate: "2024-01-25", status: "pending", reason: "Family vacation" },
    { id: "3", employeeId: "5", employeeName: "Dr. Meera Reddy", type: "personal", startDate: "2024-01-22", endDate: "2024-01-22", status: "pending", reason: "Personal work" },
  ]);

  const [performanceReviews] = useState<PerformanceReview[]>([
    { id: "1", employeeId: "1", employeeName: "Dr. Priya Patel", reviewDate: "2024-01-10", rating: 5, reviewer: "Dr. Sharma", feedback: "Excellent performance, highly dedicated to patient care.", status: "completed" },
    { id: "2", employeeId: "2", employeeName: "Dr. Rajesh Kumar", reviewDate: "2024-01-12", rating: 4, reviewer: "Dr. Sharma", feedback: "Good work ethic, shows improvement in complex cases.", status: "completed" },
    { id: "3", employeeId: "3", employeeName: "Nurse Anjali Singh", reviewDate: "2024-01-20", rating: 0, reviewer: "Head Matron", feedback: "", status: "scheduled" },
  ]);

  const handleLeaveAction = (leaveId: string, action: "approved" | "rejected") => {
    setLeaveRequests(prev => prev.map(leave => 
      leave.id === leaveId ? { ...leave, status: action } : leave
    ));
    toast({
      title: `Leave ${action === "approved" ? "Approved" : "Rejected"}`,
      description: `The leave request has been ${action}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "on-leave":
        return <Badge className="bg-warning/10 text-warning border-warning/20">On Leave</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "approved":
        return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "completed":
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "scheduled":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "text-warning fill-warning" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    );
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Human Resources Management</h1>
        <p className="page-subtitle">Manage employees, leave requests, payroll, and performance reviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Leaves</p>
                <p className="text-2xl font-bold">{leaveRequests.filter(l => l.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                <p className="text-2xl font-bold">₹{(employees.reduce((sum, e) => sum + e.salary, 0) / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-chart-4/10 rounded-lg">
                <Star className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">{performanceReviews.filter(r => r.status !== "completed").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 max-w-lg">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="leaves">Leaves</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Employee Directory</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search employees..." 
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Dialog open={showAddEmployeeDialog} onOpenChange={setShowAddEmployeeDialog}>
                  <DialogTrigger asChild>
                    <Button><Plus className="h-4 w-4 mr-2" />Add Employee</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Employee</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input placeholder="Enter full name" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" placeholder="Enter email" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Phone</Label>
                          <Input placeholder="Enter phone" />
                        </div>
                        <div>
                          <Label>Department</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cardiology">Cardiology</SelectItem>
                              <SelectItem value="neurology">Neurology</SelectItem>
                              <SelectItem value="pediatrics">Pediatrics</SelectItem>
                              <SelectItem value="icu">ICU</SelectItem>
                              <SelectItem value="administration">Administration</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Role</Label>
                          <Input placeholder="Enter role" />
                        </div>
                        <div>
                          <Label>Salary</Label>
                          <Input type="number" placeholder="Enter salary" />
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => {
                        toast({ title: "Employee Added", description: "New employee has been added successfully." });
                        setShowAddEmployeeDialog(false);
                      }}>Add Employee</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {employee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {employee.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {employee.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {employee.department}
                        </div>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{employee.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Leave Requests</CardTitle>
              <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
                <DialogTrigger asChild>
                  <Button><Plus className="h-4 w-4 mr-2" />New Request</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit Leave Request</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Leave Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="maternity">Maternity/Paternity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <Label>Reason</Label>
                      <Textarea placeholder="Enter reason for leave" />
                    </div>
                    <Button className="w-full" onClick={() => {
                      toast({ title: "Leave Request Submitted", description: "Your leave request has been submitted for approval." });
                      setShowLeaveDialog(false);
                    }}>Submit Request</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">{leave.employeeName}</TableCell>
                      <TableCell className="capitalize">{leave.type}</TableCell>
                      <TableCell>{leave.startDate} to {leave.endDate}</TableCell>
                      <TableCell className="max-w-xs truncate">{leave.reason}</TableCell>
                      <TableCell>{getStatusBadge(leave.status)}</TableCell>
                      <TableCell>
                        {leave.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-success" onClick={() => handleLeaveAction(leave.id, "approved")}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleLeaveAction(leave.id, "rejected")}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => {
                    const deductions = Math.round(employee.salary * 0.15);
                    const netSalary = employee.salary - deductions;
                    return (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>₹{employee.salary.toLocaleString()}</TableCell>
                        <TableCell className="text-destructive">-₹{deductions.toLocaleString()}</TableCell>
                        <TableCell className="font-medium text-success">₹{netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className="bg-success/10 text-success border-success/20">Processed</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Performance Reviews</CardTitle>
              <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
                <DialogTrigger asChild>
                  <Button><Plus className="h-4 w-4 mr-2" />New Review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Performance Review</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Employee</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                        <SelectContent>
                          {employees.map(emp => (
                            <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select rating" /></SelectTrigger>
                        <SelectContent>
                          {[5, 4, 3, 2, 1].map(r => (
                            <SelectItem key={r} value={r.toString()}>{r} Star{r > 1 ? "s" : ""}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Feedback</Label>
                      <Textarea placeholder="Enter performance feedback" />
                    </div>
                    <Button className="w-full" onClick={() => {
                      toast({ title: "Review Created", description: "Performance review has been saved." });
                      setShowReviewDialog(false);
                    }}>Save Review</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Review Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.employeeName}</TableCell>
                      <TableCell>{review.reviewDate}</TableCell>
                      <TableCell>{review.status === "completed" ? renderStars(review.rating) : "-"}</TableCell>
                      <TableCell>{review.reviewer}</TableCell>
                      <TableCell className="max-w-xs truncate">{review.feedback || "-"}</TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
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

export default HRManagement;
