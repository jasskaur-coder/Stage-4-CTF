import { useState } from "react";
import Layout from "../components/Layout";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("⚠ Feedback cannot be empty");
      return;
    }

    // For now just simulate submission
    setStatus("✅ Feedback submitted successfully!");
    setMessage("");
  };

  return (
    <Layout>
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
          💬 Submit Feedback
        </h1>

        <div style={{
          background: "#111",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,255,204,0.15)"
        }}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your feedback..."
              style={{
                width: "100%",
                height: "120px",
                background: "#0b0b0b",
                border: "1px solid #222",
                color: "white",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                resize: "none"
              }}
            />

            <button
              type="submit"
              style={{
                background: "#00ffcc",
                border: "none",
                padding: "12px 20px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Submit Feedback
            </button>
          </form>

          {status && (
            <p style={{ marginTop: "15px", color: "#00ffcc" }}>
              {status}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}