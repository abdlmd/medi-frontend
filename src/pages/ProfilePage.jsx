import Header from "../components/ui/Header";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import useAuthStore from "@/authStore";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function ProfilePage() {
  const { user, token } = useAuthStore();
  const [profile, setProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pNo, setPno] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/view_profile/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // use `Token` if you're using DRF token auth
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
      });
  }, [reload]);
  function handleClick() {
    fetch(`http://127.0.0.1:8000/update_user_profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, pNo }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReload((prev) => !prev);
      })
      .catch((err) => console.error(err));
  }
  return (
    <div>
      <Header />
      <div className="mt-14 ">
        <Card className="w-[700px] mx-auto">
          <CardHeader className=" ">
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Manage your personal information and contact details
            </CardDescription>
            <CardContent>
              <div className="grid gap-4 text-xl mt-4 ">
                <div className="grid gap-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <Label className="font-bold">First Name</Label>
                      <p>{profile.first_name}</p>
                    </div>
                    <div className="flex flex-col mr-[75px]">
                      <Label className="font-bold">Last Name</Label>
                      <p>{profile.last_name}</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <Label className="font-bold">Phone Number</Label>
                      <p>{profile.phoneNumber}</p>
                    </div>
                    <div className="flex flex-col">
                      <Label className="font-bold">Email</Label>
                      <p>{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardHeader>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Edit />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <form>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label>First Name</Label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Last Name</Label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Phone Number</Label>
                      <Input
                        value={pNo}
                        onChange={(e) => setPno(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={handleClick}>Save Changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
