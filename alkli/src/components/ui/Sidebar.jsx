import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [openImageMenu, setOpenImageMenu] = useState(false);
  const [openServiceMenu, setOpenServiceMenu] = useState(false);

  return (
    <div className="border-r border-gray-500 h-screen flex flex-col">
      {/* Header */}
      <h2 className="flex items-center text-xl font-bold bg-gray-800 text-white px-4 border-b border-gray-500 h-20">
        Admin
      </h2>

      <div className="flex-1 overflow-y-auto w-64 bg-gray-800 text-white p-4 no-scrollbar">
        <ul>
          {/* Dashboard */}
          <li className="mb-2 border-b-2 rounded-md">
            <Link
              to="/dashboard"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>

          {/* Image Menu */}
          <li className="mb-2 border-b-2 rounded-md">
            <button
              onClick={() => setOpenImageMenu(!openImageMenu)}
              className="w-full text-left p-2 hover:bg-gray-700 rounded flex justify-between"
            >
              Image <span>{openImageMenu ? "▴" : "▾"}</span>
            </button>

            {openImageMenu && (
              <ul className="ml-4 mt-2">
                <li>
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
                    All Events
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Service Menu */}
          <li className="mb-2 border-b-2 rounded-md">
            <button
              onClick={() => setOpenServiceMenu(!openServiceMenu)}
              className="w-full text-left p-2 hover:bg-gray-700 rounded flex justify-between"
            >
              Service <span>{openServiceMenu ? "▴" : "▾"}</span>
            </button>

            {openServiceMenu && (
              <ul className="ml-4 mt-2">
                <li>
                  <Link
                    to="/products"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Travelling"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Travelling
                  </Link>
                </li>
                <li>
                  <Link
                    to="/LifeStyle"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Life Style
                  </Link>
                </li>

                <li>
                  <Link
                    to="/Corparate"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Corparate
                  </Link>
                </li>

                <li>
                  <Link
                    to="/Portrait"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Portrait
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
