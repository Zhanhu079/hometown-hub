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
  IoSearchOutline,
  IoSearch,
  IoMegaphoneOutline,
  IoMegaphone,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get current route

  // Define active and inactive styles
  const activeStyle = "text-mainOrange";  // For active routes
  const inactiveStyle = "text-inactiveGray"; // For inactive routes

  return (
    <div className="fixed top-0 left-0 h-[100vh] flex flex-col justify-between bg-gray-900 p-5">
      {/* Top Icons */}
      <div className="flex flex-col gap-5">
        <Link to={"/"}>
          {location.pathname === "/" ? (
            <IoHome size={30} className={activeStyle} />
          ) : (
            <IoHomeOutline size={30} className={inactiveStyle} />
          )}
        </Link>

        <Link to={"/search"}>
          {location.pathname === "/search" ? (
            <IoSearch size={30} className={activeStyle} />
          ) : (
            <IoSearchOutline size={30} className={inactiveStyle} />
          )}
        </Link>

        <Link to={"/categories"}>
          {location.pathname === "/categories" ? (
            <IoGrid size={30} className={activeStyle} />
          ) : (
            <IoGridOutline size={30} className={inactiveStyle} />
          )}
        </Link>

        <Link to={"/create"}>
          {location.pathname === "/create" ? (
            <IoCreate size={30} className={activeStyle} />
          ) : (
            <IoCreateOutline size={30} className={inactiveStyle} />
          )}
        </Link>

        <Link to={"/new_announcement"}>
          {location.pathname === "/new_announcement" ? (
            <IoMegaphone size={30} className={activeStyle} />
          ) : (
            <IoMegaphoneOutline size={30} className={inactiveStyle} />
          )}
        </Link>

        <Link to={"/settings"}>
          {location.pathname === "/settings" ? (
            <IoSettings size={30} className={activeStyle} />
          ) : (
            <IoSettingsOutline size={30} className={inactiveStyle} />
          )}
        </Link>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-5">
        <Link to={"/profile"}>
          {location.pathname === "/profile" ? (
            <IoPerson size={30} className={activeStyle} />
          ) : (
            <IoPersonOutline size={30} className={inactiveStyle} />
          )}
        </Link>
        <IoLogOutOutline size={30} className={inactiveStyle} />
      </div>
    </div>
  );
};

export default Navbar;
