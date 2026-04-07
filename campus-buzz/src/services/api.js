// Base URL for our API
const API_URL = "http://localhost:3000/api";

// ── GET all posts ──
export async function fetchPosts(category = "All", search = "") {
  const params = new URLSearchParams();
  if (category && category !== "All") params.append("category", category);
  if (search) params.append("search", search);

  const queryString = params.toString();
  const url = `${API_URL}/posts${queryString ? `?${queryString}` : ""}`;
  // Example URL: http://localhost:3000/api/posts?category=Events&search=party

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data.posts;
}

// ── GET single post ──
export async function fetchPost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error("Post not found");
  }
  return response.json();
}

// ── CREATE a post ──
export async function createPost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",   // Tell the server we're sending JSON
    },
    body: JSON.stringify(postData),          // Convert JS object to JSON string
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.messages?.join(", ") || "Failed to create post");
  }
  return response.json();
}

// ── UPDATE a post ──
export async function updatePost(id, postData) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  return response.json();
}

// ── DELETE a post ──
export async function deletePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
  return response.json();
}