import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <h2>⚡ Stage 4</h2>
        <div className="menu">
          <div onClick={() => navigate("/dashboard")}>Dashboard</div>
          <div onClick={() => navigate("/profile")}>Profile</div>
          <div onClick={() => navigate("/feedback")}>Feedback</div>
          <div onClick={() => navigate("/admin")}>Admin</div>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <button onClick={logout}>Logout</button>
        </div>
        {children}
      </div>
    </div>
  );
}