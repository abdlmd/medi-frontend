import useAuthStore from "@/authStore";
import Header from "../components/ui/Header";
import { Button } from "@/components/ui/button";
import Unauthorized from "./Unauthorized";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, MessageCircle, Pill, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientPage() {
  const { user, token } = useAuthStore();
  const [aidRequest, setAidRequest] = useState([]);
  const [consultationRequests, setConsultationRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/get_my_posted_request/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // use `Token` if you're using DRF token auth
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAidRequest(data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/get_my_consult_requests", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // use `Token` if you're using DRF token auth
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConsultationRequests(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {user?.role === "patient" ? (
        <div>
          <Header />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-800 px-12 py-2">
              Patient Dashboard
            </h1>
            <h4 className="text-gray-500 px-12 ">
              Welcome back! Manage your healthcare needs.
            </h4>
            <div className=" flex flex-row px-28">
              <Card className="ml-10 mt-10">
                <CardHeader>
                  <Heart className="h-12 w-12 text-red-500 mx-auto mb-2" />
                  <CardTitle className="mx-auto text-2xl">
                    Request Aid
                  </CardTitle>
                  <CardDescription className="mx-auto">
                    Get help with medical expenses or emergency needs
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center ">
                  <Button
                    className="px-40"
                    onClick={() => navigate("/aid-form")}
                  >
                    <Plus />
                    New Aid Request
                  </Button>
                </CardFooter>
              </Card>
              <Card className="ml-10 mt-10">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <CardTitle className="mx-auto text-2xl">
                    Consultation
                  </CardTitle>
                  <CardDescription className="mx-auto">
                    Connect with volunteer doctors for medical advice
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center ">
                  <Button
                    className="px-40"
                    onClick={() => navigate("/consult-form")}
                  >
                    <Plus />
                    New Consultation
                  </Button>
                </CardFooter>
              </Card>
              <Card className="ml-10 mt-10">
                <CardHeader>
                  <Pill className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                  <CardTitle className="mx-auto text-2xl">
                    Find Pharmacy
                  </CardTitle>
                  <CardDescription className="mx-auto">
                    Search for medicines and compare prices
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center ">
                  <Button className="px-40" variant="outline">
                    Search Medicines
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <Card className="mt-10 mx-3">
            <CardHeader>
              <CardTitle className="text-2xl">Your Active Requests</CardTitle>
              <CardDescription className="">
                Track your aid requests and consultations
              </CardDescription>
              <h1 className=" text-xl font-semibold ">Aid Requests</h1>
            </CardHeader>
            {aidRequest.map((request) => (
              <CardFooter className="flex justify-center ">
                <Card className="w-[2000px] h-[100px]">
                  <div className="flex flex-row gap-2 pt-2 pl-4">
                    <Badge
                      variant={
                        request.fulfilled_status ? "accepted" : "secondary"
                      }
                    >
                      {request.fulfilled_status ? "Accepted" : "Pending"}
                    </Badge>
                  </div>
                  <div className="pl-4 flex flex-col">
                    <h1 className="font-bold text-xl">{request.title}</h1>
                    <h5 className="text-slate-500">{request.description}</h5>
                    <div className="flex justify-end -mt-8 mr-4">
                      <h3>
                        {new Date(request.created_at).toLocaleDateString(
                          "en-CA"
                        )}
                      </h3>
                    </div>
                  </div>
                </Card>
              </CardFooter>
            ))}
            <h1 className="text-xl font-semibold ml-6">
              Consultation Requests
            </h1>
            {consultationRequests.map((request) => (
              <CardFooter className="flex justify-center ">
                <Card className="w-[2000px] h-[100px]">
                  <div className="flex flex-row gap-2 pt-2 pl-4">
                    <Badge
                      variant={
                        request.status === "PENDING" ? "secondary" : "accepted"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="pl-4 flex flex-col">
                    <h1 className="font-bold text-xl">{request.symptoms}</h1>
                    <h5 className="text-slate-500">{request.description}</h5>
                    <div className="flex justify-end -mt-8 mr-4">
                      <h3>
                        {new Date(request.created_at).toLocaleDateString(
                          "en-CA"
                        )}
                      </h3>
                    </div>
                  </div>
                </Card>
              </CardFooter>
            ))}
          </Card>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default PatientPage;
