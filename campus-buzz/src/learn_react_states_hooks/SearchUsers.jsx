import { useState, useEffect } from "react";

function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Fetch all users once
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
      });
  }, []);

  // Filter when searchTerm changes
  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
  }, [searchTerm, users]); // ← Runs when searchTerm OR users change

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Search users by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-sm text-gray-500 mb-3">
        Showing {filtered.length} of {users.length} users
      </p>

      {filtered.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-lg border border-gray-200 p-3 mb-2"
        >
          <span className="font-medium">{user.name}</span>
          <span className="text-gray-400 ml-2">— {user.email}</span>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center py-4">No users found 🤷</p>
      )}
    </div>
  );
}

export default SearchUsers;