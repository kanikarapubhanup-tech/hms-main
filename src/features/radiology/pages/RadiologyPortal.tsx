
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RadiologyCategories from "../components/RadiologyCategories";
import RadiologyTests from "../components/RadiologyTests";

const RadiologyPortal = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Radiology Portal</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage radiology tests and categories.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="tests" className="w-full">
                <TabsList>
                    <TabsTrigger value="categories">Radiology Categories</TabsTrigger>
                    <TabsTrigger value="tests">Radiology Tests</TabsTrigger>
                </TabsList>
                <TabsContent value="categories" className="mt-6">
                    <RadiologyCategories />
                </TabsContent>
                <TabsContent value="tests" className="mt-6">
                    <RadiologyTests />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default RadiologyPortal;
