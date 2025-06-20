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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Heart, Pill } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";
function DoctorPage() {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [volunteeredRequests, setVolunteeredRequests] = useState([]);
  const [requestReload, setRequestReload] = useState(false);
  function handleSubmit(id) {
    fetch(`http://localhost:8000/confirm_consult_request/${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // use `Token` if you're using DRF token auth
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRequestReload((prev) => !prev);
      })

      .catch((err) => console.error(err));
  }
  useEffect(() => {
    fetch("http://localhost:8000/get_pending_requests/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // use `Token` if you're using DRF token auth
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPendingRequests(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
    fetch("http://localhost:8000/get_my_volunteered_consult_requests/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // use `Token` if you're using DRF token auth
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVolunteeredRequests(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [requestReload]);
  return (
    <div>
      <Header />
      <div className="mt-10 ml-8">
        <h1 className="font-bold text-3xl">Doctor Dashboard</h1>
        <p className="text-slate-500">
          Help patients by accepting aid requests and providing consultations.
        </p>
      </div>
      <div className="flex flex-row ml-32 mt-8 gap-10">
        <Card className="w-[500px] h-28 ml-8 ">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Pending Requests</CardTitle>
            <Clock className="relative -top-2 h-5 w-5    text-slate-400" />
          </CardHeader>
          <CardContent className="font-bold text-2xl -mt-4">
            {pendingRequests.length}
          </CardContent>
        </Card>
        <Card className="w-[500px] h-28 ml-8 ">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Active Cases</CardTitle>
            <Heart className="relative -top-2 h-5 w-5    text-red-600" />
          </CardHeader>
          <CardContent className="font-bold text-2xl -mt-4">
            {volunteeredRequests.length}
          </CardContent>
        </Card>
        <Card className="w-[500px] h-28 ml-8 ">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Check Pharmacies</CardTitle>
            <Pill className="relative -top-2 h-5 w-5    text-purple-600" />
          </CardHeader>

          <Button
            onClick={() => navigate("/pharmacy")}
            variant="default"
            className="ml-5 -mt-4 h-6"
          >
            Open
          </Button>
        </Card>
      </div>
      <div className="mt-10 flex flex-row gap-8">
        <Card className="w-[900px] ml-10">
          <CardHeader>
            <CardTitle className="text-2xl">
              Pending Consultation Requests
            </CardTitle>
            <CardDescription className="text-slate-500">
              Patients seeking medical consultations and professional advice
            </CardDescription>

            {pendingRequests.map((p) => (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle>
                      Patient: {p.patient.first_name} {p.patient.last_name}
                    </CardTitle>
                    <CardDescription className="-mt-1">
                      {new Date(p.created_at).toLocaleDateString("en-CA")}
                    </CardDescription>
                  </div>
                  <CardDescription className="font-semibold text-bl">
                    {p.title}
                  </CardDescription>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end -mr-2">
                  <Button onClick={() => handleSubmit(p.id)}>
                    Accept & Help
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardHeader>
        </Card>

        <Card className="w-[900px]">
          <CardHeader className="text-2xl mb-6">
            <CardTitle>My Consultations</CardTitle>
            <CardDescription className="text-slate-500">
              Ongoing and completed patient consultations
            </CardDescription>
            <div className="flex flex-col ">
              {volunteeredRequests.map((v) => (
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex flex-row justify-between">
                      <CardTitle>
                        Patient: {v.patient.first_name} {v.patient.last_name}
                      </CardTitle>
                      <CardDescription className="-mt-1">
                        {new Date(v.created_at).toLocaleDateString("en-CA")}
                      </CardDescription>
                    </div>
                    <CardDescription className="font-semibold text-bl">
                      {v.title}
                    </CardDescription>
                    <CardDescription>{v.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end -mr-2"></CardFooter>
                </Card>
              ))}
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default DoctorPage;
