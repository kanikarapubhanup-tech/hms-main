import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppointmentFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    doctorFilter: string;
    onDoctorFilterChange: (value: string) => void;
    doctors: { name: string; department: string }[];
}

const AppointmentFilters = ({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    doctorFilter,
    onDoctorFilterChange,
    doctors
}: AppointmentFiltersProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 border rounded-lg bg-card/50">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search by patient..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="w-full md:w-[200px]">
                <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-full md:w-[250px]">
                <Select value={doctorFilter} onValueChange={onDoctorFilterChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Doctors</SelectItem>
                        {doctors.map((doc) => (
                            <SelectItem key={doc.name} value={doc.name}>
                                {doc.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default AppointmentFilters;
