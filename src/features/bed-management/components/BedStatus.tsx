import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const bedStatuses = [
    { id: "B101", number: "101", type: "General", ward: "Male Ward", status: "Occupied", lastUpdated: "10 mins ago" },
    { id: "B102", number: "102", type: "General", ward: "Male Ward", status: "Available", lastUpdated: "1 hour ago" },
    { id: "B201", number: "201", type: "ICU", ward: "ICU", status: "Occupied", lastUpdated: "2 mins ago" },
    { id: "B202", number: "202", type: "ICU", ward: "ICU", status: "Reserved", lastUpdated: "30 mins ago" },
    { id: "B301", number: "301", type: "Private", ward: "Private Ward", status: "Cleaning", lastUpdated: "5 mins ago" },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Available": return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
        case "Occupied": return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";
        case "Reserved": return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
        case "Cleaning": return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100";
        default: return "";
    }
};

const BedStatus = () => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Bed ID</TableHead>
                        <TableHead>Bed Number</TableHead>
                        <TableHead>Bed Type</TableHead>
                        <TableHead>Ward/Room</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bedStatuses.map((bed) => (
                        <TableRow key={bed.id}>
                            <TableCell className="font-medium">{bed.id}</TableCell>
                            <TableCell>{bed.number}</TableCell>
                            <TableCell>{bed.type}</TableCell>
                            <TableCell>{bed.ward}</TableCell>
                            <TableCell>
                                <Badge className={getStatusColor(bed.status)} variant="outline">
                                    {bed.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{bed.lastUpdated}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BedStatus;
