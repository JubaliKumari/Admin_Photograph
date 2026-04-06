import { ThemeToggle } from "../comman";

export default function Navbar() {
  return (
    <div className="bg-white h-20 shadow p-4 flex justify-between border-b border-gray-500 dark:bg-gray-800 text-gray-800 dark:text-white">

      <h1 className="font-bold">Dashboard</h1>
        <ThemeToggle/>
      <button className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}