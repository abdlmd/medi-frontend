import Header from "../components/ui/Header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
import { useState } from "react";
import { toast } from "sonner";
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pfp, setPfp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (password != confirmPassword) {
      toast("Passwords dont match!");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("role", role);
    formData.append("profilePicture", pfp);
    formData.append("password", password);
    fetch("http://127.0.0.1:8000/register_user/", {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Header />
      <div className="flex justify-center pt-20">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Create your account to access MediCare Connect services instantly
            </CardDescription>
            {/*action was here*/}
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center">
                    <Label htmlFor="username">Username</Label>
                  </div>
                  <Input
                    id="username"
                    type="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="first_name">First Name</Label>
                  </div>
                  <Input
                    id="first_name"
                    type="first_name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="last_name">Last Name</Label>
                  </div>
                  <Input
                    id="last_name"
                    type="last_name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="Phone Number">Phone Number</Label>
                  </div>
                  <Input
                    id="Phone Number"
                    type="Phone Number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="Password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="Password">Confirm Password</Label>
                  </div>
                  <Input
                    id="confirm_password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />

                  <div className="flex items-center">
                    <Label htmlFor="pfp">Profile Picture</Label>
                  </div>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPfp(e.target.files[0])}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="role">Enter your Role</Label>
                  </div>
                  <DropdownMenu className="border-black border">
                    <DropdownMenuTrigger>-- Select Role --</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setRole("patient")}>
                        Patient
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRole("volunteer")}>
                        Volunteer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRole("doctor")}>
                        Doctor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRole("pharmacy")}>
                        Pharmacy
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Label className="mt-4 ">Signing up as a {role}</Label>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Signup
            </Button>
            <Link to={"/login"} className="w-full">
              <Button variant="outline" className="w-full">
                Login Instead
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
