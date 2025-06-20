import Header from "../components/ui/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
function PharmacyPage() {
  const [category, setCategory] = useState("");
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    if (!category) {
      fetch("http://127.0.0.1:8000/get_all_medicines/")
        .then((res) => res.json())
        .then((data) => setMedicines(data))
        .catch((err) => console.error(err));
    } else {
      fetch(`http://127.0.0.1:8000/filter_medicine/${category}/`)
        .then((res) => res.json())
        .then((data) => setMedicines(data))
        .catch((err) => console.error(err));
    }
  }, [category]);
  return (
    <div>
      <Header />
      <div className="ml-8 mt-8">
        <h1 className="text-2xl font-bold">Find Medicines & Pharmacies</h1>
        <p className="text-gray-400">
          Search for medicines and compare prices across different pharmacies.
        </p>
        <div className="mt-4">
          {" "}
          <Card className="w-[1850px] ">
            <CardHeader>
              <CardTitle className="text-2xl">Filter Medicines</CardTitle>
              <CardDescription>
                Filter Medicines based off their categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2"></div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                  </div>
                </div>
              </form>
              <Label className="ml-2">Category</Label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ANTIBIOTICS">Antibiotics</SelectItem>
                  <SelectItem value="COUGH_MEDICINE">Cough Medicine</SelectItem>
                  <SelectItem value="PAINKILLER">Pain Killers</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter className="flex-col  "></CardFooter>
          </Card>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold ml-8 mt-8">Medicines</h1>
      </div>
      <div>
        <Card className="mx-auto mt-6 w-[1850px] ">
          <CardHeader>
            {medicines.map((m) => (
              <Card className="mb-4">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle>
                      {m.name} ({m.quantity}) pcs.
                    </CardTitle>
                    <CardTitle className="text-green-600 text-3xl">
                      ${m.price}
                    </CardTitle>
                  </div>

                  <CardDescription>
                    {m.manufacturer} - {m.pharmacy.username}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </CardHeader>
          {medicines.length === 0 && (
            <div className="flex justify-center mb-10 text-3xl ">
              <CardTitle>NO MEDICINES FOUND IN THIS CATEGORY</CardTitle>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default PharmacyPage;
