import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="border-r border-gray-500 h-screen flex flex-col">
      {/* Header */}
        <h2 className=" flex items-center text-xl font-bold bg-gray-800 text-white px-4 border-b border-gray-500 h-20">Admin</h2>
      <div className="flex-1 overflow-y-auto w-64 bg-gray-800 text-white p-4 no-scrollbar ">
        <ul>
          {/* Dashboard */}
          <li className="mb-2 border-b-2 rounded-md ">
            <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>

          {/* Users with Submenu */}
          <li className="mb-2 border-b-2 rounded-md">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              Image ▾
            </button>

            {openMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <Link
                    to="/imageslider"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Image Slider
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ExploreWork"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Explore Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/AboutMe"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    About Me
                  </Link>
                </li>

                <li>
                  <Link
                    to="/AllEvents"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    AllEvents
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
