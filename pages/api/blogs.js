import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public/data/blogdata.json");

// Read blogs from JSON file
const readBlogs = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error reading blog file:", error);
    return [];
  }
};

// Write blogs to JSON file
const writeBlogs = (blogs) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing blog file:", error);
  }
};

export default function handler(req, res) {
  let blogs = readBlogs();

  if (req.method === "GET") {
    res.status(200).json(blogs);
  } 
  
  else if (req.method === "POST") {
    const { title, cover, category, date, description1, description2, mainDescription1, mainDescription2 } = req.body;
    const newBlog = { 
      id: Date.now().toString(),  // Ensure ID is a string
      title, 
      cover, 
      category, 
      date, 
      description1, 
      description2, 
      mainDescription1, 
      mainDescription2 
    };
    blogs.push(newBlog);
    writeBlogs(blogs);
    res.status(201).json(newBlog);
  } 
  
  else if (req.method === "PUT") {
    const { id, title, cover, category, date, description1, description2, mainDescription1, mainDescription2 } = req.body;
    blogs = blogs.map((blog) =>
      blog.id === id 
        ? { ...blog, title, cover, category, date, description1, description2, mainDescription1, mainDescription2 } 
        : blog
    );
    writeBlogs(blogs);
    res.status(200).json({ message: "Blog updated successfully" });
  } 
  
  else if (req.method === "DELETE") {
    let body = "";

    // Read and parse request body manually
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        try {
            const { id } = JSON.parse(body);

            if (!id) {
                console.error("Error: Missing ID in DELETE request");
                return res.status(400).json({ error: "Blog ID is required for deletion" });
            }

            console.log("Received DELETE request for ID:", id);

            const beforeDelete = blogs.length;
            blogs = blogs.filter((blog) => blog.id !== id.toString());
            const afterDelete = blogs.length;

            if (beforeDelete === afterDelete) {
                console.error("Error: No blog found with ID:", id);
                return res.status(404).json({ error: "Blog not found" });
            }

            writeBlogs(blogs);
            console.log("Blog deleted successfully:", id);

            return res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
            console.error("Error processing DELETE request:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}

  
  else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
