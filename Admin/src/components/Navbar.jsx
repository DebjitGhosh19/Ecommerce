import { assets } from "../assets/admin_assets/assets.js";
const Navbar = ({ setIsLoggedIn }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-linear-to-b from-slate-900 to-slate-800">
      <img src={assets.logo} alt="Logo" className="w-[max(10%,80px)] bg-amber-50 p-2 rounded-xl" />
      <button
        onClick={() => {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
        }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-2 sm:px-7 cursor-pointer rounded-full text-[8px] sm:text-[16px] transition hover:bg-white/10"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
