import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload! - Controller component
    if (name.trim() === "") return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">What's your name?</h2>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {/* Show greeting after submit */}
      {submitted && (
        <p className="mt-4 text-lg text-green-600">
          Hello, <strong>{name}</strong>! Welcome to CodeMERN! 🎉
        </p>
      )}

      {/* Live preview as they type */}
      {name && !submitted && (
        <p className="mt-2 text-sm text-gray-400">
          Typing: {name}
        </p>
      )}
    </div>
  );
}

export default NameForm;