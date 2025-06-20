import { SearchSlash } from "lucide-react";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
function ErrorPage() {
  return (
    <div>
      <Header />
      <div className="flex justify-center flex-col items-center gap-10 mb-[200px] pt-40 ">
        <SearchSlash className="h-20 w-20 mt-20" />
        <div className="text-4xl font-extrabold ">
          <h1 className="pl-48 pb-10">ERROR 404</h1>
          <h1 className="pl-7">NO SUCH PAGE FOUND ❌❌❌</h1>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ErrorPage;
