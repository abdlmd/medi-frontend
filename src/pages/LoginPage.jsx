import Header from "../components/ui/Header";
import { Link, useNavigate } from "react-router-dom";

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
import { useState } from "react";
import useAuthStore from "@/authStore";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, user } = useAuthStore();
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access);

        fetch("http://127.0.0.1:8000/view_profile/", {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        }).then((res) =>
          res.json().then((user) => {
            setUser(user);
            choosePage(user.role);
          })
        );
      });
  }
  function choosePage(role) {
    if (!user) return;
    if (role === "patient") navigate("/patient");
    else if (role === "pharmacy") navigate("/dashboard/pharmacy");
    else if (role === "volunteer") navigate("/volunteer");
    else if (role === "doctor") navigate("/doctor");
  }
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center pt-20">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
            {/*action was here*/}
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="username"
                    placeholder="johndoe123"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
            <Link to={"/register"} className="w-full">
              <Button variant="outline" className="w-full">
                Create a New Account
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
