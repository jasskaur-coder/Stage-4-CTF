import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function EditProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(storedUser?.username || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(storedUser?.avatar || "");
  const [message, setMessage] = useState("");

  // 🔹 HANDLE FILE CHANGE (preview)
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await axios.put(
  "https://stage-4-ctf.onrender.com/api/profile",
  {
    username: username,
    role: storedUser?.role,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ FIXED
    },
  }
);

      const updatedUser = {
        ...res.data.user,
        avatar: preview,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Update failed");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

     const res = await axios.post(
  "https://stage-4-ctf.onrender.com/api/upload",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      setMessage(res.data);
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <Layout>
      <div>
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
          ✏️ Edit Profile
        </h1>

        <div
          style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            maxWidth: "500px",
            boxShadow: "0 0 15px rgba(255,204,0,0.2)",
          }}
        >
          {/* 🔹 AVATAR PREVIEW */}
          <h3>Avatar Preview</h3>
          {preview && (
            <img
              src={preview}
              alt="avatar"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
                objectFit: "cover",
              }}
            />
          )}

          <input
            type="file"
            accept=".png"
            onChange={handleFileChange}
            style={{ marginBottom: "15px", color: "#fff" }}
          />

          <hr style={{ margin: "20px 0", borderColor: "#333" }} />

          {/* 🔹 UPDATE USERNAME */}
          <h3>Update Username</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "8px",
              width: "100%",
              marginBottom: "10px",
              background: "#222",
              color: "#fff",
              border: "1px solid #444",
            }}
          />

          <button
            onClick={handleUpdate}
            style={{
              padding: "10px",
              width: "100%",
              background: "#00ffcc",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Save Profile
          </button>

          <hr style={{ margin: "20px 0", borderColor: "#333" }} />

          {/* 🔹 UPLOAD (CTF FEATURE) */}
          <h3>Upload Avatar (Advanced)</h3>
          <button
            onClick={handleUpload}
            style={{
              padding: "10px",
              width: "100%",
              background: "#ffcc00",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Upload Avatar
          </button>

          {message && (
            <p style={{ marginTop: "10px", color: "#0f0" }}>
              {message}
            </p>
          )}

          <p style={{ marginTop: "10px", color: "#888", fontSize: "12px" }}>
            Only PNG images allowed
          </p>
        </div>
      </div>
    </Layout>
  );
}