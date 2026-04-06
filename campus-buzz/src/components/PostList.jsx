import PostCard from "./PostCard";

function PostList({ posts, onDelete }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-2">📭</p>
        <p className="text-gray-500">No posts found.</p>
        <p className="text-gray-400 text-sm">
          Try adjusting your search or create a new post!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PostList;