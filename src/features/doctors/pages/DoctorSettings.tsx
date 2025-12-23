import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, User, Lock, Save } from "lucide-react";

const DoctorSettings = () => {
    const { toast } = useToast();

    // Availability State
    const [availability, setAvailability] = useState({
        acceptingPatients: true,
        emergencyOnCall: false,
        startTime: "09:00",
        endTime: "17:00"
    });

    // Profile State
    const [profile, setProfile] = useState({
        specialization: "General Medicine",
        licenseNumber: "MD-2024-123",
        consultationFee: "500",
        bio: "Experienced general practitioner with over 10 years of service."
    });

    // Password State
    const [passwordState, setPasswordState] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

    const handleSaveAvailability = () => {
        toast({
            title: "Success",
            description: "Availability settings updated successfully.",
        });
    };

    const handleUpdateProfile = () => {
        toast({
            title: "Success",
            description: "Profile updated successfully.",
        });
    };

    const handleChangePassword = () => {
        if (passwordState.newPassword !== passwordState.confirmPassword) {
            toast({
                title: "Error",
                description: "New passwords do not match.",
                variant: "destructive",
            });
            return;
        }
        if (passwordState.newPassword.length < 6) {
            toast({
                title: "Error",
                description: "Password must be at least 6 characters.",
                variant: "destructive",
            });
            return;
        }

        setIsPasswordDialogOpen(false);
        setPasswordState({ currentPassword: "", newPassword: "", confirmPassword: "" });
        toast({
            title: "Success",
            description: "Password changed successfully.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="page-header">
                <h1 className="page-title">Doctor Settings</h1>
                <p className="page-subtitle">Manage availability, profile, and account preferences</p>
            </div>

            <Tabs defaultValue="availability" className="w-full">
                <TabsList>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="availability" className="mt-6 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule & Availability</CardTitle>
                            <CardDescription>Set your working hours and consultation availability.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Accepting New Patients</Label>
                                    <p className="text-sm text-muted-foreground">Enable to appear in patient search results.</p>
                                </div>
                                <Switch
                                    checked={availability.acceptingPatients}
                                    onCheckedChange={(checked) => setAvailability({ ...availability, acceptingPatients: checked })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Emergency On-Call</Label>
                                    <p className="text-sm text-muted-foreground">Receive notifications for emergency cases.</p>
                                </div>
                                <Switch
                                    checked={availability.emergencyOnCall}
                                    onCheckedChange={(checked) => setAvailability({ ...availability, emergencyOnCall: checked })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div className="space-y-2">
                                    <Label>Start Time</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="time"
                                            className="pl-8"
                                            value={availability.startTime}
                                            onChange={(e) => setAvailability({ ...availability, startTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>End Time</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="time"
                                            className="pl-8"
                                            value={availability.endTime}
                                            onChange={(e) => setAvailability({ ...availability, endTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button onClick={handleSaveAvailability} className="w-full sm:w-auto">
                                <Save className="mr-2 h-4 w-4" /> Save Schedule
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="profile" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Professional Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Specialization</Label>
                                    <Input
                                        value={profile.specialization}
                                        onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>License Number</Label>
                                    <Input
                                        value={profile.licenseNumber}
                                        onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Consultation Fee (₹)</Label>
                                    <Input
                                        type="number"
                                        value={profile.consultationFee}
                                        onChange={(e) => setProfile({ ...profile, consultationFee: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label>Bio</Label>
                                    <Input
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button onClick={handleUpdateProfile}>
                                <Save className="mr-2 h-4 w-4" /> Update Profile
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="font-medium">Password</p>
                                    <p className="text-sm text-muted-foreground">Update your password regularly for security.</p>
                                </div>
                                <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <Lock className="mr-2 h-4 w-4" /> Change Password
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Change Password</DialogTitle>
                                            <DialogDescription>
                                                Enter your current password and a new strong password.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-2">
                                            <div className="space-y-2">
                                                <Label>Current Password</Label>
                                                <Input
                                                    type="password"
                                                    value={passwordState.currentPassword}
                                                    onChange={(e) => setPasswordState({ ...passwordState, currentPassword: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>New Password</Label>
                                                <Input
                                                    type="password"
                                                    value={passwordState.newPassword}
                                                    onChange={(e) => setPasswordState({ ...passwordState, newPassword: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Confirm New Password</Label>
                                                <Input
                                                    type="password"
                                                    value={passwordState.confirmPassword}
                                                    onChange={(e) => setPasswordState({ ...passwordState, confirmPassword: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>Cancel</Button>
                                            <Button onClick={handleChangePassword}>Update Password</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DoctorSettings;
