import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Users, Video, Calendar, Plus, Clock, MapPin, MoreVertical, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialMeetings = [
    {
        id: 1,
        title: "Department Huddle",
        date: "2024-03-24",
        startTime: "09:00",
        endTime: "09:30",
        department: "Nursing Staff",
        location: "Conference Room A",
        type: "In-Person",
        status: "Scheduled",
        agenda: "Daily shift handover and updates."
    },
    {
        id: 2,
        title: "Board Review",
        date: "2024-03-25",
        startTime: "14:00",
        endTime: "16:00",
        department: "Administration",
        location: "Zoom",
        type: "Online",
        status: "Scheduled",
        agenda: "Quarterly financial review."
    }
];

const MeetingStatus = () => {
    const [meetings, setMeetings] = useState(initialMeetings);
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [newMeeting, setNewMeeting] = useState({
        title: "",
        date: new Date().toISOString().split('T')[0],
        startTime: "",
        endTime: "",
        department: "",
        location: "",
        type: "In-Person",
        agenda: ""
    });

    const [editingMeeting, setEditingMeeting] = useState<any>(null);

    const handleSchedule = () => {
        if (!newMeeting.title || !newMeeting.startTime || !newMeeting.endTime || !newMeeting.department) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        const meeting = {
            id: meetings.length + 1,
            ...newMeeting,
            status: "Scheduled"
        };

        setMeetings([...meetings, meeting]);
        setIsAddDialogOpen(false);
        setNewMeeting({
            title: "",
            date: new Date().toISOString().split('T')[0],
            startTime: "",
            endTime: "",
            department: "",
            location: "",
            type: "In-Person",
            agenda: ""
        });
        toast({
            title: "Success",
            description: "Meeting scheduled successfully."
        });
    };

    const handleEdit = () => {
        if (!editingMeeting || !editingMeeting.title) return;

        setMeetings(meetings.map(m => m.id === editingMeeting.id ? editingMeeting : m));
        setIsEditDialogOpen(false);
        setEditingMeeting(null);
        toast({
            title: "Success",
            description: "Meeting details updated."
        });
    };

    const handleCancel = (id: number) => {
        setMeetings(meetings.filter(m => m.id !== id));
        toast({
            title: "Success",
            description: "Meeting cancelled successfully."
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Meeting Status</h1>
                    <p className="text-muted-foreground">Internal staff meetings and schedules.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Schedule Meeting
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Schedule New Meeting</DialogTitle>
                            <DialogDescription>Set up a new meeting for staff or departments.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Meeting Title</Label>
                                <Input value={newMeeting.title} onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })} placeholder="e.g. Weekly Sync" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input type="date" value={newMeeting.date} onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Department</Label>
                                    <Input value={newMeeting.department} onChange={(e) => setNewMeeting({ ...newMeeting, department: e.target.value })} placeholder="e.g. Nursing" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Time</Label>
                                    <Input type="time" value={newMeeting.startTime} onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Time</Label>
                                    <Input type="time" value={newMeeting.endTime} onChange={(e) => setNewMeeting({ ...newMeeting, endTime: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select value={newMeeting.type} onValueChange={(val) => setNewMeeting({ ...newMeeting, type: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="In-Person">In-Person</SelectItem>
                                            <SelectItem value="Online">Online</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Location / Link</Label>
                                    <Input value={newMeeting.location} onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })} placeholder="Room or URL" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Agenda</Label>
                                <Textarea value={newMeeting.agenda} onChange={(e) => setNewMeeting({ ...newMeeting, agenda: e.target.value })} placeholder="Meeting topics..." />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSchedule}>Schedule</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Meeting</DialogTitle>
                    </DialogHeader>
                    {editingMeeting && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Meeting Title</Label>
                                <Input value={editingMeeting.title} onChange={(e) => setEditingMeeting({ ...editingMeeting, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input type="date" value={editingMeeting.date} onChange={(e) => setEditingMeeting({ ...editingMeeting, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Department</Label>
                                    <Input value={editingMeeting.department} onChange={(e) => setEditingMeeting({ ...editingMeeting, department: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Time</Label>
                                    <Input type="time" value={editingMeeting.startTime} onChange={(e) => setEditingMeeting({ ...editingMeeting, startTime: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Time</Label>
                                    <Input type="time" value={editingMeeting.endTime} onChange={(e) => setEditingMeeting({ ...editingMeeting, endTime: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select value={editingMeeting.type} onValueChange={(val) => setEditingMeeting({ ...editingMeeting, type: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="In-Person">In-Person</SelectItem>
                                            <SelectItem value="Online">Online</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Location / Link</Label>
                                    <Input value={editingMeeting.location} onChange={(e) => setEditingMeeting({ ...editingMeeting, location: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Agenda</Label>
                                <Textarea value={editingMeeting.agenda} onChange={(e) => setEditingMeeting({ ...editingMeeting, agenda: e.target.value })} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={handleEdit}>Update Meeting</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meetings.map((meeting) => (
                    <Card key={meeting.id} className={`border-l-4 ${meeting.type === 'Online' ? 'border-l-green-500' : 'border-l-blue-500'}`}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{meeting.title}</CardTitle>
                                    <CardDescription>{meeting.department}</CardDescription>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => {
                                            setEditingMeeting(meeting);
                                            setIsEditDialogOpen(true);
                                        }}>
                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleCancel(meeting.id)}>
                                            <Trash className="mr-2 h-4 w-4" /> Cancel
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" /> {meeting.date}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" /> {meeting.startTime} - {meeting.endTime}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                {meeting.type === 'Online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                                {meeting.location}
                            </div>
                            {meeting.agenda && (
                                <div className="pt-2 border-t mt-2">
                                    <strong className="block text-xs uppercase text-slate-500 mb-1">Agenda</strong>
                                    <p className="line-clamp-2">{meeting.agenda}</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Badge variant={meeting.type === 'Online' ? 'secondary' : 'default'} className="w-full justify-center">
                                {meeting.type}
                            </Badge>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MeetingStatus;
