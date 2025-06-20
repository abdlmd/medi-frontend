import Header from "../components/ui/Header";

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center text-center">
        <h1 className="font-extrabold text-4xl px-4">
          YOU ARE UNAUTHORIZED TO ACCESS THIS PAGE
        </h1>
      </div>
    </div>
  );
}

export default Unauthorized;
