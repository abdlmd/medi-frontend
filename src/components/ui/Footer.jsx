import Logo from "./Logo";
function Footer() {
  return (
    <footer className="py-12  bg-gray-900 ">
      <div className="flex justify-center flex-col items-center  bg-gray-900">
        <Logo textColor={"text-white"} logoColor={"text-white"} />
        <p className="text-gray-300">
          Connecting healthcare communities for better health outcomes.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
