import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import {
  getSingleResumeApi,
  downloadResumeApi,
} from "../../api/resumeApi";

const ResumePreview = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const res = await getSingleResumeApi(id);
        setResume(res.data.resume);
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadResumeApi(resume._id);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner-large" />
          <p>Loading your resume...</p>
        </div>
      </>
    );
  }

  if (!resume) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>Resume not found</h2>
          <p>The resume you're looking for doesn't exist.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="resume-preview-container">
        {/* HEADER SECTION */}
        <div className="resume-header">
          <div className="header-content">
            <div className="personal-info">
              <h1 className="resume-name">{resume.personal?.name || resume.name}</h1>
              <div className="contact-info">
                <span className="contact-item">{resume.personal?.email || resume.email}</span>
                {resume.personal?.phone && (
                  <span className="contact-item">{resume.personal.phone}</span>
                )}
                <span className="role-badge">{resume.role}</span>
              </div>
            </div>
            <div className="header-actions">
              <button
                className={`download-btn ${downloading ? 'loading' : ''}`}
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <div className="spinner"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    ⬇️ Download PDF
                  </>
                )}
              </button>
              <button className="print-btn" onClick={() => window.print()}>
                🖨️ Print
              </button>
            </div>
          </div>
        </div>

        {/* RESUME CONTENT */}
        <div className="resume-content">
          {/* SUMMARY */}
          {resume.summary && (
            <section className="resume-section">
              <div className="section-header">
                <h2>Professional Summary</h2>
                <div className="section-line"></div>
              </div>
              <div className="summary-content">
                <p>{resume.summary}</p>
              </div>
            </section>
          )}

          {/* SKILLS */}
          {resume.skills && resume.skills.length > 0 && (
            <section className="resume-section">
              <div className="section-header">
                <h2>Skills</h2>
                <div className="section-line"></div>
              </div>
              <div className="skills-grid">
                {resume.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EXPERIENCE */}
          {resume.experience && resume.experience.length > 0 && (
            <section className="resume-section">
              <div className="section-header">
                <h2>Experience</h2>
                <div className="section-line"></div>
              </div>
              <div className="experience-list">
                {resume.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="exp-header">
                      <h3>{exp.title}</h3>
                      <span className="exp-meta">
                        {exp.company} | {exp.duration}
                      </span>
                    </div>
                    <ul className="exp-bullets">
                      {exp.responsibilities?.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {resume.projects && resume.projects.length > 0 && (
            <section className="resume-section">
              <div className="section-header">
                <h2>Projects</h2>
                <div className="section-line"></div>
              </div>
              <div className="projects-list">
                {resume.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                      <div className="project-tech">
                        {project.techStack?.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <p className="project-desc">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {resume.education && (
            <section className="resume-section">
              <div className="section-header">
                <h2>Education</h2>
                <div className="section-line"></div>
              </div>
              <div className="education-item">
                <h3>{resume.education.degree}</h3>
                <span className="education-meta">
                  {resume.education.university} | {resume.education.year}
                </span>
              </div>
            </section>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="footer-actions">
          <div className="action-buttons">
            <button
              className={`download-btn ${downloading ? 'loading' : ''}`}
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <div className="spinner"></div>
                  Downloading...
                </>
              ) : (
                <>
                  ⬇️ Download PDF
                </>
              )}
            </button>
            <button className="secondary-action" onClick={() => navigate(-1)}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .resume-preview-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
          line-height: 1.6;
        }

        /* HEADER */
        .resume-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(25px);
          border-radius: 24px;
          padding: 2.5rem;
          margin-bottom: 3rem;
          box-shadow: 
            0 30px 60px -15px rgba(0, 0, 0, 0.08),
            0 15px 30px -10px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }

        .personal-info h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 0.5rem 0;
          line-height: 1.1;
        }

        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
        }

        .contact-item {
          color: #64748b;
          font-size: 1.125rem;
          font-weight: 500;
        }

        .role-badge {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-shrink: 0;
        }

        /* RESUME CONTENT */
        .resume-content {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.08),
            0 15px 30px -8px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .resume-section {
          margin-bottom: 3rem;
        }

        .resume-section:last-child {
          margin-bottom: 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          font-size: 1.75rem;
        }

        .section-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6366f1, transparent);
          border-radius: 1px;
        }

        /* SUMMARY */
        .summary-content p {
          font-size: 1.125rem;
          color: #374151;
          line-height: 1.8;
          font-weight: 400;
        }

        /* SKILLS */
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skill-tag {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          color: #6366f1;
          padding: 0.5rem 1.25rem;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 600;
          border: 1px solid rgba(99, 102, 241, 0.2);
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
        }

        /* EXPERIENCE */
        .experience-item {
          margin-bottom: 2.5rem;
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .exp-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .exp-meta {
          color: #64748b;
          font-weight: 600;
          font-size: 1rem;
        }

        .exp-bullets {
          margin: 0;
          padding-left: 1.5rem;
        }

        .exp-bullets li {
          color: #374151;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          position: relative;
        }

        .exp-bullets li::before {
          content: '▸';
          color: #6366f1;
          font-weight: bold;
          position: absolute;
          left: -1.5rem;
        }

        /* PROJECTS */
        .project-item {
          margin-bottom: 2.5rem;
        }

        .project-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .project-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          padding: 0.375rem 0.875rem;
          border-radius: 16px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .project-desc {
          color: #374151;
          font-size: 1rem;
          line-height: 1.7;
          margin: 0;
        }

        /* EDUCATION */
        .education-item h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .education-meta {
          color: #64748b;
          font-weight: 600;
          font-size: 1rem;
        }

        /* BUTTONS */
        .download-btn, .print-btn, .secondary-action {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .download-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        .download-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(16, 185, 129, 0.5);
        }

        .download-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .print-btn, .secondary-action {
          background: #f1f5f9;
          color: #374151;
          border: 2px solid #e2e8f0;
        }

        .print-btn:hover, .secondary-action:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .footer-actions {
          margin-top: 3rem;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }

        /* LOADING & ERROR */
        .loading-container, .error-container {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 3rem 2rem;
        }

        .loading-spinner-large {
          width: 60px;
          height: 60px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.5rem;
        }

        .error-container h2 {
          color: #dc2626;
          margin-bottom: 1rem;
        }

        /* PRINT STYLES */
        @media print {
          .resume-header .header-actions,
          .footer-actions {
            display: none !important;
          }
          
          .resume-preview-container {
            box-shadow: none;
            background: white;
            padding: 0;
          }
          
          .resume-header, .resume-content {
            box-shadow: none;
            border: none;
            background: white;
          }
        }

        /* ANIMATIONS */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
          
          .contact-info {
            justify-content: center;
          }
          
          .resume-content {
            padding: 2rem 1.5rem;
          }
          
          .action-buttons {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ResumePreview;
