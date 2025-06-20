import { Heart, Pill, Stethoscope, Users } from "lucide-react";
function Features() {
  return (
    <div className="flex flex-row mx-64">
      <div className="font-sans flex justify-center flex-col text-center  max-w-64 mx-auto">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Aid System</h1>
        <p className="text-gray-600">
          Patients can request aid and volunteers can respond to help those in
          need.
        </p>
      </div>
      <div className="font-sans flex justify-center flex-col text-center  max-w-64 mx-auto">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Consultations</h1>
        <p className="text-gray-600">
          Connect with qualified doctors for medical consultations and advice.
        </p>
      </div>
      <div className="font-sans flex justify-center flex-col text-center max-w-64 mx-auto">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Pill className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Pharmacy Network</h1>
        <p className="text-gray-600">
          Find medicines with real-time pricing and availability information.
        </p>
      </div>
    </div>
  );
}

export default Features;
