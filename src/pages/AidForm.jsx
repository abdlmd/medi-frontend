import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "../components/ui/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import useAuthStore from "@/authStore";
import Unauthorized from "./Unauthorized";
import { useState } from "react";
function AidForm() {
  const { user, token } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/create_aid_request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- ADD THIS
      },
      body: JSON.stringify({ title, description, types: type }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Submitted successfully:", data))
      .catch((err) => console.error("Error:", err));
  }

  return user?.role === "patient" ? (
    <div>
      <Header />
      <div className="flex ml-[660px] gap-2 mt-10 flex-col justify-center mx-auto">
        <h1 className="font-bold text-3xl ">Request Medical Aid</h1>
        <p className="text-slate-400 max-w-[600px]">
          Submit a request for financial assistance with medical expenses. Our
          volunteers will review and respond to help you.
        </p>
      </div>
      <div className="mt-10">
        <Alert className="max-w-[600px] mt-4 items-center justify-center  mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="">
            Please provide as much detail as possible to help volunteers
            understand your situation and provide appropriate assistance.
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex justify-center w-[600px] mt-6 mx-auto">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle className="text-2xl">Aid Request Details</CardTitle>
            <CardDescription>
              Fill out the form below to submit your aid request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Need medicines.."
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="description">Description</Label>
                  </div>
                  <textarea
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain your situation in detail..."
                    className="h-48 p-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <Label htmlFor="category">Type</Label>
                  <Select onValueChange={(value) => setType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="What type of aid you require?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FOOD">Food</SelectItem>
                      <SelectItem value="TRANSPORT">Transport</SelectItem>
                      <SelectItem value="MEDICINE">Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ) : (
    <Unauthorized />
  );
}

export default AidForm;
