export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">Dashboard</h1>
      <button className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}