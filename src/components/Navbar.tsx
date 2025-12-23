import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  userName?: string;
  userRole?: string;
}

const Navbar = ({ userName = "John Doe", userRole = "Admin" }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="relative w-96 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients, doctors, appointments..."
            className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <DropdownMenuLabel className="p-4 border-b">Notifications</DropdownMenuLabel>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-4 border-b hover:bg-secondary/30 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">New Patient Registered</p>
                  <p className="text-xs text-muted-foreground mt-1">Sarah Johnson has been admitted to Ward A.</p>
                  <p className="text-[10px] text-muted-foreground mt-2">2 minutes ago</p>
                </div>
                <div className="p-4 border-b hover:bg-secondary/30 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">Lab Result Ready</p>
                  <p className="text-xs text-muted-foreground mt-1">Blood test results for Michael Brown are now available.</p>
                  <p className="text-[10px] text-muted-foreground mt-2">15 minutes ago</p>
                </div>
                <div className="p-4 border-b hover:bg-secondary/30 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">Appointment Reminder</p>
                  <p className="text-xs text-muted-foreground mt-1">Surgery scheduled with Dr. Emily Chen at 2:00 PM.</p>
                  <p className="text-[10px] text-muted-foreground mt-2">1 hour ago</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full text-xs py-3 rounded-none border-t h-auto">View All Notifications</Button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/admin/settings")} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/admin/settings")} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
