export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Users: 100</div>
        <div className="bg-white p-4 shadow rounded">Revenue: ₹5000</div>
        <div className="bg-white p-4 shadow rounded">Orders: 50</div>
      </div>
    </div>
  );
}