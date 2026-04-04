import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";
import { Navbar } from "@/components";

// import Sidebar from "../components/ui/Sidebar";
// import Navbar from "../components/ui/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4 bg-gray-100 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}