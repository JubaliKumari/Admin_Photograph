export default function UserList() {
  const users = [
    { id: 1, name: "Shoaib" },
    { id: 2, name: "Ali" },
  ];

  return (
    <div>
      <h1 className="text-xl mb-4">Users</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center border">
              <td>{u.id}</td>
              <td>{u.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}