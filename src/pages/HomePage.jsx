import Features from "@/components/ui/Features";
import SignUpCards from "@/components/ui/SignUpCards";
import Header from "@/components/ui/Header.jsx";
import Logo from "../components/ui/Logo";
import Footer from "../components/ui/Footer";

function HomePage() {
  return (
    <div className="h-vh bg-slate-100">
      <Header />

      <div className="bg-slate-100 pb-20">
        <div className="mr-4 flex flex-col text-center mt-0 px-4 pt-32 pb-8 font-sans">
          <h1 className="font-bold text-4xl  ">
            Connecting Healthcare Communities
          </h1>
          <h3 className="mt-10 text-slate-500 max-w-[800px] mx-auto text-xl">
            A comprehensive platform connecting patients, volunteer doctors, and
            pharmacies to provide accessible healthcare services and support.
          </h3>
          <div>
            <h2 className="font-bold text-3xl mt-64 mb-6">
              Join Our Community
            </h2>
          </div>
        </div>
        <SignUpCards />
        <h1 className="flex text-center justify-center text-3xl mt-40 font-bold">
          Platform Features
        </h1>
        <Features />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
