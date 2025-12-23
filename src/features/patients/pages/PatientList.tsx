import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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

const initialPatients = [
  { id: "P001", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 234-567-8901", age: 32, gender: "Female", bloodGroup: "A+", lastVisit: "2024-01-15", status: "Active", country: "India", state: "Telangana", district: "Hyderabad", mandal: "Amberpet", pincode: "500013" },
  { id: "P002", name: "Michael Brown", email: "m.brown@email.com", phone: "+1 234-567-8902", age: 45, gender: "Male", bloodGroup: "B+", lastVisit: "2024-01-14", status: "Active", country: "India", state: "Maharashtra", district: "Mumbai", mandal: "Andheri", pincode: "400053" },
  { id: "P003", name: "Emily Davis", email: "emily.d@email.com", phone: "+1 234-567-8903", age: 28, gender: "Female", bloodGroup: "O-", lastVisit: "2024-01-12", status: "Inactive", country: "USA", state: "California", district: "Los Angeles", mandal: "Hollywood", pincode: "90028" },
  { id: "P004", name: "James Wilson", email: "james.w@email.com", phone: "+1 234-567-8904", age: 55, gender: "Male", bloodGroup: "AB+", lastVisit: "2024-01-10", status: "Active", country: "Canada", state: "Ontario", district: "Toronto", mandal: "Toronto Central", pincode: "M5H 2N2" },
  { id: "P005", name: "Lisa Anderson", email: "lisa.a@email.com", phone: "+1 234-567-8905", age: 38, gender: "Female", bloodGroup: "A-", lastVisit: "2024-01-08", status: "Active", country: "Australia", state: "New South Wales", district: "Sydney", mandal: "Sydney West", pincode: "2000" },
  { id: "P006", name: "Robert Taylor", email: "r.taylor@email.com", phone: "+1 234-567-8906", age: 62, gender: "Male", bloodGroup: "O+", lastVisit: "2024-01-05", status: "Critical", country: "India", state: "Delhi", district: "New Delhi", mandal: "Connaught Place", pincode: "110001" },
];

import { INDIAN_STATES, DISTRICTS, MANDALS } from "@/data/indianAddressData";

const COUNTRIES = ["India", "USA", "UK", "Australia", "Canada"];


interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  lastVisit: string;
  status: string;
  country: string;
  state: string;
  district: string;
  mandal: string;
  pincode: string;
}

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    bloodGroup: "A+",
    status: "Active",
    country: "India",
    state: "",
    district: "",
    mandal: "",
    pincode: ""
  });

  // Handle State Change based on Country (Reset if not India)
  const handleCountryChange = (val: string) => {
    setNewPatient(prev => ({
      ...prev,
      country: val,
      state: val === "India" ? "" : "N/A",
      district: val === "India" ? "" : "N/A",
      mandal: ""
    }));
  };

  const handleStateChange = (val: string) => {
    setNewPatient(prev => ({ ...prev, state: val, district: "", mandal: "" }));
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary";
      case "Critical": return "destructive";
      default: return "secondary";
    }
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const patient = {
      id: `P00${patients.length + 1}`,
      name: newPatient.name,
      email: newPatient.email,
      phone: newPatient.phone,
      age: parseInt(newPatient.age) || 0,
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      lastVisit: new Date().toISOString().split('T')[0],
      status: newPatient.status,
      country: newPatient.country,
      state: newPatient.state,
      district: newPatient.district,
      mandal: newPatient.mandal,
      pincode: newPatient.pincode
    };

    setPatients([patient, ...patients]);
    setIsAddDialogOpen(false);
    setNewPatient({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "Male",
      bloodGroup: "A+",
      status: "Active",
      country: "India",
      state: "",
      district: "",
      mandal: "",
      pincode: ""
    });

    toast({
      title: "Success",
      description: "Patient added successfully.",
    });
  };

  const handleEditPatient = () => {
    if (!editingPatient.name || !editingPatient.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setPatients(patients.map(p => p.id === editingPatient.id ? editingPatient : p));
    setIsEditDialogOpen(false);
    setEditingPatient(null);

    toast({
      title: "Success",
      description: "Patient details updated successfully.",
    });
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Patient record deleted successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">Manage and view all patient records</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Enter the details of the new patient here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    placeholder="30"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Address Details</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={newPatient.country}
                      onValueChange={handleCountryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={newPatient.state}
                      onValueChange={handleStateChange}
                      disabled={newPatient.country !== "India"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={newPatient.country === "India" ? "Select State" : "N/A"} />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select
                      value={newPatient.district}
                      onValueChange={(val) => setNewPatient({ ...newPatient, district: val })}
                      disabled={!newPatient.state || newPatient.country !== "India"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={newPatient.state ? "Select District" : "Select State First"} />
                      </SelectTrigger>
                      <SelectContent>
                        {newPatient.state && DISTRICTS[newPatient.state]?.map(d => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mandal">Mandal</Label>
                    {newPatient.district && MANDALS[newPatient.district] ? (
                      <Select
                        value={newPatient.mandal}
                        onValueChange={(val) => setNewPatient({ ...newPatient, mandal: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Mandal" />
                        </SelectTrigger>
                        <SelectContent>
                          {MANDALS[newPatient.district].map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="mandal"
                        value={newPatient.mandal}
                        onChange={(e) => setNewPatient({ ...newPatient, mandal: e.target.value })}
                        placeholder="Enter Mandal Name"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={newPatient.pincode}
                      onChange={(e) => setNewPatient({ ...newPatient, pincode: e.target.value })}
                      placeholder="500001"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={newPatient.gender}
                    onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={newPatient.bloodGroup}
                    onValueChange={(value) => setNewPatient({ ...newPatient, bloodGroup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddPatient}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Patient Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Edit Patient Details</DialogTitle>
              <DialogDescription>
                Update the information for this patient.
              </DialogDescription>
            </DialogHeader>
            {editingPatient && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name *</Label>
                    <Input
                      id="edit-name"
                      value={editingPatient.name}
                      onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-age">Age</Label>
                    <Input
                      id="edit-age"
                      type="number"
                      value={editingPatient.age}
                      onChange={(e) => setEditingPatient({ ...editingPatient, age: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingPatient.email}
                      onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone *</Label>
                    <Input
                      id="edit-phone"
                      value={editingPatient.phone}
                      onChange={(e) => setEditingPatient({ ...editingPatient, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-2">
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground">Address Details</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-country">Country</Label>
                      <Select
                        value={editingPatient.country}
                        onValueChange={(val) => setEditingPatient({ ...editingPatient, country: val, state: val === "India" ? "" : "N/A", district: val === "India" ? "" : "N/A", mandal: "" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map(c => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-state">State</Label>
                      <Select
                        value={editingPatient.state}
                        onValueChange={(val) => setEditingPatient({ ...editingPatient, state: val, district: "", mandal: "" })}
                        disabled={editingPatient.country !== "India"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={editingPatient.country === "India" ? "Select State" : "N/A"} />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_STATES.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-district">District</Label>
                      <Select
                        value={editingPatient.district}
                        onValueChange={(val) => setEditingPatient({ ...editingPatient, district: val, mandal: "" })}
                        disabled={!editingPatient.state || editingPatient.country !== "India"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={editingPatient.state ? "Select District" : "Select State First"} />
                        </SelectTrigger>
                        <SelectContent>
                          {editingPatient.state && DISTRICTS[editingPatient.state]?.map(d => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-mandal">Mandal</Label>
                      {editingPatient.district && MANDALS[editingPatient.district] ? (
                        <Select
                          value={editingPatient.mandal}
                          onValueChange={(val) => setEditingPatient({ ...editingPatient, mandal: val })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Mandal" />
                          </SelectTrigger>
                          <SelectContent>
                            {MANDALS[editingPatient.district].map(m => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id="edit-mandal"
                          value={editingPatient.mandal}
                          onChange={(e) => setEditingPatient({ ...editingPatient, mandal: e.target.value })}
                          placeholder="Enter Mandal Name"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-pincode">Pincode</Label>
                      <Input
                        id="edit-pincode"
                        value={editingPatient.pincode}
                        onChange={(e) => setEditingPatient({ ...editingPatient, pincode: e.target.value })}
                        placeholder="500001"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-gender">Gender</Label>
                    <Select
                      value={editingPatient.gender}
                      onValueChange={(value) => setEditingPatient({ ...editingPatient, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-bloodGroup">Blood Group</Label>
                    <Select
                      value={editingPatient.bloodGroup}
                      onValueChange={(value) => setEditingPatient({ ...editingPatient, bloodGroup: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" onClick={handleEditPatient}>Update Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {patient.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {patient.district && patient.country === "India"
                        ? `${patient.mandal ? patient.mandal + ', ' : ''}${patient.district}, ${patient.state}${patient.pincode ? ' - ' + patient.pincode : ''}`
                        : `${patient.country}${patient.pincode ? ' - ' + patient.pincode : ''}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.age} yrs / {patient.gender}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.bloodGroup}</Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setEditingPatient(patient); setIsEditDialogOpen(true); }}>
                          Edit Patient
                        </DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePatient(patient.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default PatientList;
