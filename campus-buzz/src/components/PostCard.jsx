// Category color mapping
const CATEGORY_COLORS = {
  General: "bg-gray-100 text-gray-600",
  Events: "bg-purple-100 text-purple-700",
  Academic: "bg-blue-100 text-blue-700",
  Placement: "bg-green-100 text-green-700",
  Sports: "bg-orange-100 text-orange-700",
  Tech: "bg-cyan-100 text-cyan-700",
  "Lost & Found": "bg-red-100 text-red-700",
};

function PostCard({ post, onDelete }) {
  // Format the timestamp
  const timeAgo = getTimeAgo(post.timestamp);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
      {/* Header: Category badge + Delete button */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-600"
          }`}
        >
          {post.category}
        </span>
        <button
          onClick={() => onDelete(post.id)}
          className="text-gray-400 hover:text-red-500 transition text-sm"
          title="Delete post"
        >
          ✕
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {post.title}
      </h3>

      {/* Content */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {post.content}
      </p>

      {/* Footer: Timestamp */}
      <p className="text-xs text-gray-400 mt-3">
        🕐 {timeAgo}
      </p>
    </div>
  );
}

// Helper function to format time
function getTimeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return then.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default PostCard;