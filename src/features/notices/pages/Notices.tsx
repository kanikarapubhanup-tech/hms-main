import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Search, Plus, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";

const initialNotices = [
    { id: 1, title: "Emergency System Maintenance", date: "2024-03-25", postedBy: "Admin", content: "Server maintenance scheduled for..." },
    { id: 2, title: "Annual Staff Meeting", date: "2024-03-28", postedBy: "HR", content: "All staff are required to attend..." },
];

const Notices = () => {
    const [notices, setNotices] = useState(initialNotices);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const [newNotice, setNewNotice] = useState({
        title: "",
        content: "",
        postedBy: "Admin"
    });

    const handleAddNotice = () => {
        if (!newNotice.title || !newNotice.content) {
            toast({
                title: "Error",
                description: "Title and content are required.",
                variant: "destructive",
            });
            return;
        }

        const notice = {
            id: notices.length + 1,
            title: newNotice.title,
            date: new Date().toISOString().split('T')[0],
            postedBy: newNotice.postedBy,
            content: newNotice.content
        };

        setNotices([notice, ...notices]);
        setIsAddDialogOpen(false);
        setNewNotice({
            title: "",
            content: "",
            postedBy: "Admin"
        });

        toast({
            title: "Success",
            description: "Notice posted successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Notices</h1>
                    <p className="text-muted-foreground">Broadcast messages to staff and patients.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Post Notice
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Post New Notice</DialogTitle>
                            <DialogDescription>
                                Create a new notice for the hospital staff or patients.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={newNotice.title}
                                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Maintenance Update"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="postedBy" className="text-right">
                                    Posted By
                                </Label>
                                <Input
                                    id="postedBy"
                                    value={newNotice.postedBy}
                                    onChange={(e) => setNewNotice({ ...newNotice, postedBy: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Admin"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="content" className="text-right">
                                    Content
                                </Label>
                                <Textarea
                                    id="content"
                                    value={newNotice.content}
                                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                                    className="col-span-3"
                                    placeholder="Enter notice details..."
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddNotice}>Post Notice</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6">
                {notices.map((notice) => (
                    <Card key={notice.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <Bell className="h-5 w-5 text-yellow-500" />
                                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                                </div>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {notice.date}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 mb-2">{notice.content}</p>
                            <p className="text-xs text-muted-foreground">Posted by: {notice.postedBy}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Notices;
