// "use client";
import MobileMenu from "../MobileMenu";
import AdminNavContent from "./AdminNavContent";


const navLinks = [
  { title: "Members", path: "/admin" },
  { title: "Gallery", path: "/admin/gallery" },
  { title: "Events", path: "/admin/events" },
];

const AdminNavbar = () => {
  return (
    <div className="h-16 bg-white w-screen overflow-x-hidden flex flex-col items-center fixed top-0 z-50 shadow-md shadow-gray-200/50">
      <div className="flex justify-center px-5 w-full h-full sm:px-20">
        <div className="max-w-[1280px] grow h-full flex justify-between items-center">
          <div className="text-4xl font-black">Logo.</div>

          <div className="gap-7 hidden lg:flex items-center">
            <AdminNavContent navLinks={navLinks} />
          </div>

          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </div>
  );
};


export default AdminNavbar;