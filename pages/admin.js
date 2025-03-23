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

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else console.error("Invalid API response:", data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  useEffect(() => {
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
  }, []);

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

  const deleteBlog = async (id) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id.toString() }),
      });

      if (!res.ok) {
        const errorResponse = await res.json().catch(() => null);
        console.error("Delete failed:", errorResponse || "Unknown error");
        alert("Error: " + (errorResponse?.error || "Unknown error"));
        return;
      }

      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const docRef = doc(db, "phoneNumbers", id);
      await updateDoc(docRef, { status: newStatus });

      setPhoneNumbers((prevNumbers) =>
        prevNumbers.map((num) =>
          num.id === id ? { ...num, status: newStatus } : num
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deletePhoneNumber = async (id) => {
    try {
      await deleteDoc(doc(db, "phoneNumbers", id));
      setPhoneNumbers((prevNumbers) => prevNumbers.filter((num) => num.id !== id));
    } catch (error) {
      console.error("Error deleting phone number:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut(auth).then(() => router.push("/signin"))}>
        Sign Out
      </button>

      {/* Blog Management */}
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

      {/* Phone Number Management */}
      <h3>Phone Numbers</h3>
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
    </div>
  );
};

export default Admin;
