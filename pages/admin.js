import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const Admin = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
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

  // ✅ Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/signin");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  // ✅ Fetch Blogs
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
      })
      .catch(console.error);
  }, []);

  // ✅ Fetch Phone Numbers (after user login)
  useEffect(() => {
    if (!user) return;

    async function fetchNumbers() {
      try {
        const querySnapshot = await getDocs(collection(db, "phoneNumbers"));
        const numbers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhoneNumbers(numbers);
      } catch (error) {
        console.error("Error fetching numbers:", error);
      }
    }

    fetchNumbers();
  }, [user]);

  // ✅ Add or Update Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch("/api/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...formData } : formData),
      });

      if (!res.ok) throw new Error("Failed to save blog");
      const newBlog = await res.json();

      setBlogs((prev) =>
        editingId
          ? prev.map((b) => (b.id === editingId ? { id: editingId, ...formData } : b))
          : [...prev, newBlog]
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
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Delete Blog
  const deleteBlog = async (id) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Update Phone Number Status
  const updateStatus = async (id, newStatus) => {
    try {
      const docRef = doc(db, "phoneNumbers", id);
      await updateDoc(docRef, { status: newStatus });
      setPhoneNumbers((prev) =>
        prev.map((num) => (num.id === id ? { ...num, status: newStatus } : num))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Delete Phone Number
  const deletePhoneNumber = async (id) => {
    try {
      await deleteDoc(doc(db, "phoneNumbers", id));
      setPhoneNumbers((prev) => prev.filter((num) => num.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="admin-container" style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut(auth).then(() => router.push("/signin"))}>
        Sign Out
      </button>

      <hr />
      <h3>📰 Manage Blogs</h3>
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
          placeholder="Main Description 1"
          value={formData.mainDescription1}
          onChange={(e) => setFormData({ ...formData, mainDescription1: e.target.value })}
          required
        />
        <textarea
          placeholder="Main Description 2"
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
                <button onClick={() => { setFormData(blog); setEditingId(blog.id); }}>
                  Edit
                </button>
                <button onClick={() => deleteBlog(blog.id)} style={{ color: "red" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available</p>
      )}

      <hr />
      <h3>📞 Manage Phone Numbers</h3>
      {phoneNumbers.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {phoneNumbers.map(({ id, number, status }) => (
              <tr key={id}>
                <td>{number}</td>
                <td>{status}</td>
                <td>
                  <button onClick={() => updateStatus(id, "approved")}>Approve</button>
                  <button onClick={() => updateStatus(id, "rejected")}>Reject</button>
                  <button onClick={() => deletePhoneNumber(id)} style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No phone numbers found.</p>
      )}
    </div>
  );
};

export default Admin;
