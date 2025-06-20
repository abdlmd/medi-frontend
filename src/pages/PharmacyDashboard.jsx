import Header from "../components/ui/Header";
import useAuthStore from "@/authStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, DollarSign, Edit, Package, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Unauthorized from "./Unauthorized";

function PharmacyDashboard() {
  const { user, token } = useAuthStore();
  const [medicines, setMedicines] = useState();
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/get_my_medicines/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // use `Token` if you're using DRF token auth
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMedicines(data);
      });
  }, [reload]);
  function handleSubmit() {
    fetch("http://127.0.0.1:8000/add_medicine/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- ADD THIS
      },
      body: JSON.stringify({ name, manufacturer, category, quantity, price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Submitted successfully:", data);
        setReload((prev) => !prev);
      })
      .catch((err) => console.error("Error:", err));
  }
  const totalQuantity =
    medicines?.reduce((sum, med) => sum + Number(med.quantity), 0) || 0;
  const totalValue =
    medicines?.reduce(
      (sum, med) => sum + Number(med.quantity) * Number(med.price),
      0
    ) || 0;
  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/delete_medicine/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReload((prev) => !prev);
      })
      .catch((err) => console.error(err));
  }
  function handleEdit(id) {
    fetch(`http://127.0.0.1:8000/update_medicine/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity, price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReload((prev) => !prev);
      })
      .catch((err) => console.error(err));
  }

  return user && user?.role === "pharmacy" ? (
    <div>
      <Header />
      <div className="ml-10 mt-10">
        <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
        <p className="text-slate-500">
          Manage your medicine inventory and price{" "}
        </p>
      </div>
      <div className="flex flex-row ml-32 mt-8 gap-10">
        <Card className="w-[500px] h-28 ml-8 ">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Total Medicines</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="font-bold text-2xl -mt-4">
            {medicines?.length}
          </CardContent>
        </Card>
        <Card className="w-[500px] h-28 ml-8 ">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Total Quantity</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="font-bold text-2xl -mt-4">
            {totalQuantity}
          </CardContent>
        </Card>
        <Card className="w-[500px] h-28 ml-8 ">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="font-bold text-2xl -mt-4">
            ${totalValue}
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card className="w-[1800px] ml-10">
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <CardTitle className="text-2xl">Medicine Inventory</CardTitle>
                <CardDescription className="text-slate-500">
                  Manage your available medicines, prices, and quantities
                </CardDescription>
              </div>
              <Dialog>
                <form onSubmit={handleSubmit}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus />
                      Add Medicine
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Medicine</DialogTitle>
                      <DialogDescription>
                        Add medicine with the required details in the form below
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="XYZ"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="manufacturer">Manufacturer</Label>
                        <Input
                          id="manufacturer"
                          placeholder="ABC"
                          value={manufacturer}
                          onChange={(e) => setManufacturer(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="category">Select a category</Label>
                        <Select onValueChange={(value) => setCategory(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ANTIBIOTICS">
                              Antibiotics
                            </SelectItem>
                            <SelectItem value="COUGH_MEDICINE">
                              Cough Medicine
                            </SelectItem>
                            <SelectItem value="PAINKILLER">
                              Painkiller
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="quantity">Enter Quantity</Label>
                        <Input
                          type="number"
                          placeholder="2"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="quantity">Enter Price</Label>
                        <Input
                          type="number"
                          placeholder="2"
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" onClick={handleSubmit}>
                        Add
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
            </div>

            {medicines?.map((m) => (
              <Card className="mb-6 h-[110px]">
                <CardHeader>
                  <div className="flex flex-col ">
                    <div className="flex flex-row justify-between">
                      <CardTitle>
                        {m.name} ({m.manufacturer})
                      </CardTitle>
                      <div className="flex gap-2">
                        <Dialog>
                          <form>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex flex-row gap-2">
                                  <Box className="-mt-1 text-blue-600" />
                                  Quick Price & Quantity Update
                                </DialogTitle>
                                <DialogDescription>
                                  Update the most commonly changed fields
                                </DialogDescription>
                                <div className="grid gap-4">
                                  <div className="grid gap-3 mt-2">
                                    <Label htmlFor="price">
                                      Enter the new Price (old if unchanged!)
                                    </Label>
                                    <Input
                                      id="price"
                                      type="number"
                                      placeholder="$2.05"
                                      value={price}
                                      onChange={(e) =>
                                        setPrice(Number(e.target.value))
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-3">
                                    <Label htmlFor="quantity">
                                      Enter new Quantity
                                    </Label>
                                    <Input
                                      type="number"
                                      id="quantity"
                                      placeholder="25"
                                      value={quantity}
                                      onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                      }
                                    />
                                  </div>
                                </div>
                              </DialogHeader>
                              <DialogFooter>
                                <Button onClick={() => handleEdit(m.id)}>
                                  Edit
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </form>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(m.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="-mt-1">
                      {m.category}
                    </CardDescription>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    <CardDescription className="font-semibold text-bl">
                      ${m.price}
                    </CardDescription>
                    <CardDescription>Qty: {m.quantity}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end -mr-2"></CardFooter>
              </Card>
            ))}
          </CardHeader>
        </Card>
      </div>
    </div>
  ) : (
    <Unauthorized />
  );
}

export default PharmacyDashboard;
