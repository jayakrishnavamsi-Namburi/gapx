import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import { getSingleResumeApi } from "../../api/resumeApi";
import axios from "axios";

const ResumeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch existing resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        if (!id) return;

        const res = await getSingleResumeApi(id);

        const data = res.data.resume;

        setForm({
          personal: data.personal || {},
          summary: data.summary || "",
          skills: data.skills?.join(", ") || "",
          role: data.personal?.role || "",
          experience: data.experience || [],
          projects: data.projects || [],
          education: data.education || [],
          certifications: data.certifications?.join(", ") || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load resume");
        navigate("/resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  // 🔥 Handle input change
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePersonalChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // 🔥 UPDATE RESUME (you need backend route)
  const handleUpdate = async () => {
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
        certifications: form.certifications
          .split(",")
          .map((c) => c.trim()),
      };

      await axios.put(
        `http://localhost:5000/api/resume/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Resume updated successfully");

      navigate(`/resume/view/${id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (!form) return <p className="p-6">No data</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Edit Resume</h1>

        {/* PERSONAL */}
        <input
          type="text"
          placeholder="Name"
          value={form.personal.name}
          onChange={(e) =>
            handlePersonalChange("name", e.target.value)
          }
          className="input"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.personal.email}
          onChange={(e) =>
            handlePersonalChange("email", e.target.value)
          }
          className="input"
        />

        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            handleChange("role", e.target.value)
          }
          className="input"
        />

        {/* SUMMARY */}
        <textarea
          placeholder="Summary"
          value={form.summary}
          onChange={(e) =>
            handleChange("summary", e.target.value)
          }
          className="input"
        />

        {/* SKILLS */}
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(e) =>
            handleChange("skills", e.target.value)
          }
          className="input"
        />

        {/* CERTIFICATIONS */}
        <input
          type="text"
          placeholder="Certifications"
          value={form.certifications}
          onChange={(e) =>
            handleChange("certifications", e.target.value)
          }
          className="input"
        />

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="bg-indigo-600 text-white px-6 py-3 rounded"
        >
          Update Resume
        </button>
      </div>
    </>
  );
};

export default ResumeEdit;