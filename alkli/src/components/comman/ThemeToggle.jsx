
import { useClickOutside } from "@/hooks";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
// icon imports
import { FiSun } from "react-icons/fi";
import { GoMoon } from "react-icons/go";
import { HiOutlineDesktopComputer } from "react-icons/hi";

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme();
  const [themeToggler, setThemeToggler]= useState(false);
  const dropdownRef= useClickOutside(()=> setThemeToggler(false));
  

  return (
    <div 
    ref={dropdownRef}
    onClick={()=> {setThemeToggler(!themeToggler)}}
    className=" relative flex items-center justify-center p-2 rounded-md bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white border border-transparent hover:border hover:border-gray-400  hover:dark:bg-gray-500">

      {
        theme === "light" ? <FiSun className="text-xl " /> :
        theme === "dark" ? <GoMoon className="text-xl "/> :
        <HiOutlineDesktopComputer className="text-xl "/>
      }
      {/* {theme ==="light" && <FiSun/> || theme ==="dark" && <GoMoon/> || theme ==="system" && <HiOutlineDesktopComputer/> } */}

      {themeToggler && <div className=" absolute right-0 top-10 flex flex-col gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border border-gray-400">

        <button
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 px-3 py-1 rounded ${
            theme === "light" ? "bg-white" : ""
          }`}
        >
          <FiSun/> Light
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 px-3 py-1 rounded ${
            theme === "dark" ? "bg-gray-900 text-white" : ""
          }`}
        >
          <GoMoon/> Dark
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 px-3 py-1 rounded ${
            theme === "system" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <HiOutlineDesktopComputer/> <span>System</span>
        </button>
      </div>}
      
    </div>
  );
}