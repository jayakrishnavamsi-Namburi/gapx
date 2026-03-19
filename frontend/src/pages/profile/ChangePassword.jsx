import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");

    try {
      const res = await api.put("/user/change-password", {
        oldPassword,
        newPassword,
      });

      setMsg(res.data.message || "Password changed ✅");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cp-container">
        <form className="cp-card" onSubmit={handleChangePassword}>
          <h2>Change Password 🔒</h2>
          <p className="cp-subtitle">
            Update your password securely.
          </p>

          {msg && <p className="cp-success">{msg}</p>}
          {error && <p className="cp-error">{error}</p>}

          <label className="cp-label">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
            required
            disabled={loading}
            className="cp-input"
          />

          <label className="cp-label">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            disabled={loading}
            className="cp-input"
          />

          <button className="cp-btn" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>

          <button
            type="button"
            className="cp-back"
            onClick={() => navigate("/dashboard")}
            disabled={loading}
          >
            ← Back to Dashboard
          </button>
        </form>
      </div>

      {/* ✅ CSS inside same file */}
      <style>{`
        .cp-container {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc, #eef2ff);
          font-family: Arial, sans-serif;
        }

        .cp-card {
          width: 100%;
          max-width: 420px;
          background: white;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }

        .cp-card h2 {
          margin: 0;
          color: #111827;
          font-size: 22px;
          font-weight: 800;
        }

        .cp-subtitle {
          margin: 6px 0 20px;
          color: #6b7280;
          font-size: 14px;
        }

        .cp-label {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          display: block;
          margin-top: 12px;
          margin-bottom: 6px;
        }

        .cp-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          font-size: 14px;
        }

        .cp-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }

        .cp-btn {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 800;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          transition: 0.2s;
        }

        .cp-btn:hover {
          transform: translateY(-1px);
          opacity: 0.95;
        }

        .cp-back {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          border: none;
          cursor: pointer;
          border-radius: 12px;
          background: #f3f4f6;
          font-weight: 700;
          color: #111827;
        }

        .cp-success {
          background: #dcfce7;
          color: #166534;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          margin-top: 12px;
        }

        .cp-error {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          margin-top: 12px;
        }
      `}</style>
    </>
  );
}
