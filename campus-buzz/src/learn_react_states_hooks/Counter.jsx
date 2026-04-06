import { useState } from "react";

function Counter() {
  // useState returns [currentValue, setterFunction]
  // 0 is the initial value
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Count: {count}
      </h2>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          - Decrease
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          + Increase
        </button>
      </div>

      {/* Show conditional content based on state */}
      {count > 10 && (
        <p className="mt-3 text-orange-600 font-medium">
          Whoa, that's a lot of clicks! 🔥
        </p>
      )}
    </div>
  );
}

export default Counter;