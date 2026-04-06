import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";
import { Navbar } from "@/components";

// import Sidebar from "../components/ui/Sidebar";
// import Navbar from "../components/ui/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}