import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Admin = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    category: "",
    date: "",
    description1: "",
    description2: "",
    mainDescription1: "",
    mainDescription2: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);

  // 🔹 Check if user is signed in, otherwise redirect to signin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/signin");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Fetch Blogs
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else console.error("Invalid API response:", data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // 🔹 Handle Add & Update Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = "/api/blogs";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...formData } : formData),
    });

    if (res.ok) {
      setBlogs(
        editingId
          ? blogs.map((b) => (b.id === editingId ? { id: editingId, ...formData } : b))
          : [...blogs, await res.json()]
      );
      setFormData({
        title: "",
        cover: "",
        category: "",
        date: "",
        description1: "",
        description2: "",
        mainDescription1: "",
        mainDescription2: "",
      });
      setEditingId(null);
    }
  };

  // 🔹 Handle Delete Blog
  const deleteBlog = async (id) => {
    console.log("Attempting to delete blog with ID:", id);

    try {
      const res = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id.toString() }), // Ensure ID is sent as a string
      });

      console.log("Delete request sent, awaiting response...");

      if (!res.ok) {
        const errorResponse = await res.json().catch(() => null);
        console.error("Delete failed:", errorResponse || "Unknown error");
        alert("Error: " + (errorResponse?.error || "Unknown error"));
        return;
      }

      const result = await res.json();
      console.log("Delete successful:", result);

      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Show loading while checking auth state
  }

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut(auth).then(() => router.push("/signin"))}>
        Sign Out
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={formData.cover}
          onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <textarea
          placeholder="Short Description 1"
          value={formData.description1}
          onChange={(e) => setFormData({ ...formData, description1: e.target.value })}
          required
        />
        <textarea
          placeholder="Short Description 2"
          value={formData.description2}
          onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
          required
        />
        <textarea
          placeholder="Main Description 1 (Full Content)"
          value={formData.mainDescription1}
          onChange={(e) => setFormData({ ...formData, mainDescription1: e.target.value })}
          required
        />
        <textarea
          placeholder="Main Description 2 (Full Content)"
          value={formData.mainDescription2}
          onChange={(e) => setFormData({ ...formData, mainDescription2: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update Blog" : "Add Blog"}</button>
      </form>

      <h3>Existing Blogs</h3>
      {blogs.length > 0 ? (
        <div className="blog-list">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-item">
              <h4>{blog.title}</h4>
              <p><strong>Description 1:</strong> {blog.description1}</p>
              <p><strong>Description 2:</strong> {blog.description2}</p>
              <p><strong>Main Content 1:</strong> {blog.mainDescription1}</p>
              <p><strong>Main Content 2:</strong> {blog.mainDescription2}</p>

              <div className="btn-group">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setFormData(blog);
                    setEditingId(blog.id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => {
                  console.log("Delete button clicked for ID:", blog.id);
                  deleteBlog(blog.id);
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Admin;
