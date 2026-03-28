import { useEffect } from "react";
import Layout from "../components/Layout";

export default function Admin() {
  useEffect(() => {
    console.log("admin: logs module initializing...");
  }, []);

  return (
    <Layout>
      <div>
        <h1 style={{ fontSize: "28px", marginBottom: "25px" }}>
          🛠 Admin Control Panel
        </h1>

        <div
          style={{
            background: "#111",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "600px",
            boxShadow: "0 0 20px rgba(255,0,0,0.2)"
          }}
        >
          <p style={{ marginBottom: "20px", color: "#aaa" }}>
            Administrative actions and secret controls.
          </p>

          <p style={{ color: "#888", fontSize: "13px" }}>
            System logs service active...
          </p>

          <p style={{ color: "#555", fontSize: "11px", marginTop: "10px" }}>
            Some modules may not be visible in UI.
          </p>
        </div>
      </div>
    </Layout>
  );
}