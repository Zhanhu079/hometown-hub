import {
  IoHomeOutline,
  IoHome,
  IoGridOutline,
  IoGrid,
  IoCreateOutline,
  IoCreate,
  IoSettingsOutline,
  IoSettings,
  IoPersonOutline,
  IoPerson,
  IoLogOutOutline,
  IoMegaphoneOutline,
  IoMegaphone,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get current route

  // Define active and inactive styles
  const activeStyle = "text-mainOrange"; // For active routes
  const inactiveStyle = "text-inactiveGray"; // For inactive routes

  return (
    <div className="fixed top-0 left-0 h-[100vh] flex flex-col justify-between bg-gray-900 p-5">
      {/* Top Icons */}
      <div className="flex flex-col gap-5">
        <Link to={"/"} className="relative flex items-center group">
          {location.pathname === "/" ? (
            <IoHome size={30} className={activeStyle} />
          ) : (
            <IoHomeOutline size={30} className={inactiveStyle} />
          )}
          <span className="absolute left-full ml-2 p-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Home
          </span>
        </Link>

        <Link to={"/categories"} className="relative flex items-center group">
          {location.pathname === "/categories" ? (
            <IoGrid size={30} className={activeStyle} />
          ) : (
            <IoGridOutline size={30} className={inactiveStyle} />
          )}
          <span className="absolute left-full ml-2 p-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Categories
          </span>
        </Link>

        <Link to={"/create"} className="relative flex items-center group">
          {location.pathname === "/create" ? (
            <IoCreate size={30} className={activeStyle} />
          ) : (
            <IoCreateOutline size={30} className={inactiveStyle} />
          )}
          <span className="absolute left-full ml-2 p-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Create
          </span>
        </Link>

        <Link to={"/new_announcement"} className="relative flex items-center group">
          {location.pathname === "/new_announcement" ? (
            <IoMegaphone size={30} className={activeStyle} />
          ) : (
            <IoMegaphoneOutline size={30} className={inactiveStyle} />
          )}
          <span className="absolute left-full ml-2 p-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            New Announcement
          </span>
        </Link>

        <Link to={"/settings"} className="relative flex items-center group">
          {location.pathname === "/settings" ? (
            <IoSettings size={30} className={activeStyle} />
          ) : (
            <IoSettingsOutline size={30} className={inactiveStyle} />
          )}
          <span className="absolute left-full ml-2 p-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Settings
          </span>
        </Link>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-5">
        <Link to={"/profile"} className="relative flex items-center group">
          {location.pathname === "/profile" ? (
            <IoPerson size={30} className={activeStyle} />
          ) : (
            <IoPersonOutline size={30} className={inactiveStyle} />
          )}
          <span className="absolute left-full ml-2 p-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Profile
          </span>
        </Link>
        <IoLogOutOutline size={30} className={inactiveStyle} />
      </div>
    </div>
  );
};

export default Navbar;
