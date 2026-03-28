import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  console.log("debug: profile fields might be client-controlled");

  return (
    <Layout>
      <div>
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
          👤 User Profile
        </h1>

        <div
          style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            maxWidth: "500px",
            boxShadow: "0 0 15px rgba(0,255,204,0.2)",
          }}
        >
          {/* 🔹 AVATAR */}
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <img
              src={
                storedUser?.avatar ||
                "https://via.placeholder.com/100"
              }
              alt="avatar"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #00ffcc",
              }}
            />
          </div>

          {/* 🔹 CORE DETAILS (UNCHANGED) */}
          <p><strong>Username:</strong> {storedUser?.username}</p>
          <p><strong>Role:</strong> {storedUser?.role}</p>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Last Login:</strong> Just now</p>

          <hr style={{ margin: "20px 0", borderColor: "#333" }} />

          {/* 🔹 EDIT BUTTON */}
          <button
            onClick={() => navigate("/edit-profile")}
            style={{
              padding: "10px",
              width: "100%",
              background: "#ffcc00",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </button>

          <p style={{ marginTop: "10px", color: "#888", fontSize: "12px" }}>
            Manage username and avatar
          </p>
        </div>
      </div>
    </Layout>
  );
}