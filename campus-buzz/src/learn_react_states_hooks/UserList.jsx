import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect runs AFTER the component renders
  // The empty dependency array [] means "run only once, when component mounts"
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // ← Empty array = run once on mount

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading users...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">❌ Error: {error}</p>
      </div>
    );
  }

  // Success state
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Users from API ({users.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;

// useEffect(() => {
//   // This code runs...
// }, []);
// //  ^--- this controls WHEN it runs:

// // []            → Run ONCE when component mounts (page load)
// // [count]       → Run when `count` changes
// // [a, b]        → Run when `a` OR `b` changes
// // (no array)    → Run after EVERY render (usually a bug!)