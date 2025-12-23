
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicineCategories from "../components/MedicineCategories";
import MedicineBrands from "../components/MedicineBrands";
import MedicinesList from "../components/MedicinesList";
import PurchaseMedicines from "../components/PurchaseMedicines";
import UsedMedicines from "../components/UsedMedicines";
import MedicineBills from "../components/MedicineBills";

const PharmacyPortal = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pharmacy (Medicines)</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage medicines, brands, stock, purchases, and billing.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="medicines" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="brands">Brands</TabsTrigger>
                    <TabsTrigger value="medicines">Medicines</TabsTrigger>
                    <TabsTrigger value="purchase">Purchase</TabsTrigger>
                    <TabsTrigger value="used">Used</TabsTrigger>
                    <TabsTrigger value="bills">Bills</TabsTrigger>
                </TabsList>
                <TabsContent value="categories" className="mt-6">
                    <MedicineCategories />
                </TabsContent>
                <TabsContent value="brands" className="mt-6">
                    <MedicineBrands />
                </TabsContent>
                <TabsContent value="medicines" className="mt-6">
                    <MedicinesList />
                </TabsContent>
                <TabsContent value="purchase" className="mt-6">
                    <PurchaseMedicines />
                </TabsContent>
                <TabsContent value="used" className="mt-6">
                    <UsedMedicines />
                </TabsContent>
                <TabsContent value="bills" className="mt-6">
                    <MedicineBills />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PharmacyPortal;
