import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Pill, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";
import RegisterPage from "@/pages/RegisterPage";
function SignUpCards() {
  return (
    <section className="flex flex-row  justify-center">
      <div className="px-10 ">
        <Card className="max-h-50 max-w-80 hover:shadow-2xl">
          <CardHeader className="text-center">
            <Users className="text-blue-600 h-12 w-12 mx-auto mb-4 " />
            <CardTitle className="text-2xl font-sans font-bold">
              Patient
            </CardTitle>
            <CardDescription>
              Get instant access to healthcare services, request aid, and
              consult with doctors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Request medical aid</li>
              <li>• Consult with doctors</li>
              <li>• Find nearby pharmacies</li>
              <li>• Instant account activation</li>
            </ul>
          </CardContent>
          <Link to={"/register"}>
            <CardFooter className="justify-center">
              <Button>Register as Patient</Button>
            </CardFooter>
          </Link>
        </Card>
      </div>
      <div className="px-10 ">
        <Card className="max-h-50 max-w-80 hover:shadow-2xl">
          <CardHeader className="text-center">
            <Heart className="text-red-600 h-12 w-12 mx-auto mb-4 " />
            <CardTitle className="text-2xl font-sans font-bold">
              Volunteer
            </CardTitle>
            <CardDescription>
              Help patients by accepting and fulfilling aid requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Accept aid requests</li>
              <li>• Help with medical expenses</li>
              <li>• Support emergency needs</li>
              <li>• Requires approval</li>
            </ul>
          </CardContent>
          <CardFooter className="justify-center">
            <Link to={"/register"}>
              <Button variant="outline">Apply as Volunteer</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="px-10 ">
        <Card className="max-h-50 max-w-80 hover:shadow-2xl">
          <CardHeader className="text-center">
            <Stethoscope className="text-green-600 h-12 w-12 mx-auto mb-4 " />
            <CardTitle className="text-2xl font-sans font-bold">
              Doctor
            </CardTitle>
            <CardDescription>
              Provide medical consultations and professional healthcare advice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Provide medical consultations</li>
              <li>• Offer professional advice</li>
              <li>• Help diagnose conditions</li>
              <li>• Requires approval</li>
            </ul>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline">Apply as Doctor</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="px-10 ">
        <Card className="max-h-50 max-w-80 hover:shadow-2xl">
          <CardHeader className="text-center">
            <Pill className="text-purple-600 h-12 w-12 mx-auto mb-4 " />
            <CardTitle className="text-2xl font-sans font-bold">
              Pharmacy
            </CardTitle>
            <CardDescription>
              List your medicines, manage inventory, and serve the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• List available medicines</li>
              <li>• Manage inventory & pricing</li>
              <li>• Reach more customers</li>
              <li>• Requires approval</li>
            </ul>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline">Apply as Pharmacy</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default SignUpCards;
