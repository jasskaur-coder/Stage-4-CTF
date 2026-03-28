import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      // Decode full base64 token
      const decoded = atob(token);

      // Format: username:role:secret
      const parts = decoded.split(":");

      if (parts.length < 2) {
        throw new Error("Invalid token structure");
      }

      setUser({
        username: parts[0],
        role: parts[1],
      });

    } catch (err) {
      console.log("Invalid token format");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <h1>Dashboard</h1>

      <div className="card">
        <p>Welcome back, {user.username}.</p>
        <p>Role: {user.role}</p>
      </div>
    </Layout>
  );
}