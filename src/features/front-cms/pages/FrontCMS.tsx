import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutTemplate, Image, Menu, FileText, Plus, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const FrontCMS = () => {
    const { toast } = useToast();
    const [isAddPageDialogOpen, setIsAddPageDialogOpen] = useState(false);
    const [pagesList, setPagesList] = useState([
        { id: 1, title: "Home", slug: "home", status: "Published", lastUpdate: "2024-03-20" },
        { id: 2, title: "About Us", slug: "about-us", status: "Published", lastUpdate: "2024-03-19" },
        { id: 3, title: "Contact", slug: "contact", status: "Draft", lastUpdate: "2024-03-18" },
    ]);

    const [newPage, setNewPage] = useState({
        title: "",
        slug: "",
        content: ""
    });

    const handleAddPage = () => {
        if (!newPage.title || !newPage.slug) {
            toast({
                title: "Error",
                description: "Title and Slug are required",
                variant: "destructive"
            });
            return;
        }

        const page = {
            id: pagesList.length + 1,
            title: newPage.title,
            slug: newPage.slug,
            status: "Draft",
            lastUpdate: new Date().toISOString().split('T')[0]
        };

        setPagesList([page, ...pagesList]);
        setIsAddPageDialogOpen(false);
        setNewPage({ title: "", slug: "", content: "" });

        toast({
            title: "Success",
            description: "New page created successfully"
        });
    };

    const cmsSections = [
        { title: "Pages", icon: FileText, count: 12, description: "Manage diverse layout pages" },
        { title: "Menus", icon: Menu, count: 5, description: "Configure navigation menus" },
        { title: "Media Gallery", icon: Image, count: 156, description: "Manage images and videos" },
        { title: "Banners", icon: LayoutTemplate, count: 3, description: "Homepage sliders & banners" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Front CMS</h1>
                    <p className="text-muted-foreground">Content Management System for public website.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cmsSections.map((section) => (
                    <Card key={section.title} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{section.title}</CardTitle>
                            <section.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{section.count}</div>
                            <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Pages</CardTitle>
                        <Dialog open={isAddPageDialogOpen} onOpenChange={setIsAddPageDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add New Page</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Add New Page</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="page-title">Page Title</Label>
                                            <Input id="page-title" value={newPage.title} onChange={(e) => setNewPage({ ...newPage, title: e.target.value })} placeholder="e.g. Services" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="page-slug">Slug</Label>
                                            <Input id="page-slug" value={newPage.slug} onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })} placeholder="e.g. services" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="page-content">Content</Label>
                                        <Textarea id="page-content" value={newPage.content} onChange={(e) => setNewPage({ ...newPage, content: e.target.value })} placeholder="Write page content here..." className="min-h-[200px]" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleAddPage}>Create Page</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Update</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pagesList.map((page) => (
                                    <TableRow key={page.id}>
                                        <TableCell className="font-medium">{page.title}</TableCell>
                                        <TableCell>/{page.slug}</TableCell>
                                        <TableCell>
                                            <Badge variant={page.status === 'Published' ? 'default' : 'secondary'}>{page.status}</Badge>
                                        </TableCell>
                                        <TableCell>{page.lastUpdate}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="text-destructive"><Trash className="h-4 w-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FrontCMS;
