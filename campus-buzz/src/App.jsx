import { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { fetchPosts, createPost, deletePost } from "./services/api";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch posts from API ──
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts(filterCategory, searchTerm);
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load posts on mount AND when filters change
  useEffect(() => {
    loadPosts();
  }, [filterCategory, searchTerm]);

  // ── Add a new post ──
  const handleAddPost = async (newPostData) => {
    try {
      setError(null);
      await createPost(newPostData);
      await loadPosts(); // Refresh the list from the server
    } catch (err) {
      setError(err.message);
      alert("Failed to create post: " + err.message);
    }
  };

  // ── Delete a post ──
  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      setError(null);
      await deletePost(id);
      await loadPosts(); // Refresh the list from the server
    } catch (err) {
      setError(err.message);
      alert("Failed to delete post: " + err.message);
    }
  };

  // Get unique categories for the filter dropdown
  const categories = [
    "All", "General", "Events", "Academic",
    "Placement", "Sports", "Tech", "Lost & Found",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-800">
            📢 Campus Buzz
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            RVITM Student Bulletin Board • {posts.length} posts
            {!loading && <span className="text-green-500 ml-2">● Connected to server</span>}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex justify-between items-center">
            <span className="text-red-600 text-sm">❌ {error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* Post Form */}
        <PostForm onSubmit={handleAddPost} />

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 my-6">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={loadPosts}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-3">
          Showing {posts.length} posts
          {searchTerm && ` matching "${searchTerm}"`}
          {filterCategory !== "All" && ` in ${filterCategory}`}
        </p>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-3 text-gray-500">Loading posts from server...</p>
          </div>
        ) : (
          <PostList posts={posts} onDelete={handleDeletePost} />
        )}
      </main>
    </div>
  );
}

export default App;