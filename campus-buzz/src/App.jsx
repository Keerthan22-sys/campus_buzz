import { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to Campus Buzz!",
      content: "This is the student bulletin board for RVITM. Share announcements, events, and updates!",
      category: "General",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Add a new post
  const addPost = (newPost) => {
    const post = {
      id: Date.now(), // Simple unique ID
      ...newPost,
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]); // Add to beginning (newest first)
  };

  // Delete a post
  const deletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  // Filter posts based on search and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || post.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = ["All", ...new Set(posts.map((p) => p.category))];

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
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Post Form */}
        <PostForm onSubmit={addPost} />

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
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-3">
          Showing {filteredPosts.length} of {posts.length} posts
          {searchTerm && ` matching "${searchTerm}"`}
          {filterCategory !== "All" && ` in ${filterCategory}`}
        </p>

        {/* Post List */}
        <PostList posts={filteredPosts} onDelete={deletePost} />
      </main>
    </div>
  );
}

export default App;