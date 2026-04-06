import { useState } from "react";

const CATEGORIES = ["General", "Events", "Academic", "Placement", "Sports", "Tech", "Lost & Found"];

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content!");
      return;
    }

    // Call the parent's addPost function
    onSubmit({ title: title.trim(), content: content.trim(), category });

    // Reset form
    setTitle("");
    setContent("");
    setCategory("General");
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition"
      >
        <span className="font-medium text-gray-700">
          {isOpen ? "✍️ Create new post" : "➕ Create new post"}
        </span>
        <span className="text-gray-400 text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* Collapsible form */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-400 text-right">
              {content.length}/500
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Post
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setTitle("");
                setContent("");
              }}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PostForm;