import { useEffect, useState } from "react";
import { getProjectInsightsApi } from "../../api/projectInsightApi";
import LoadingSpinner from "../../components/common/LoadingSpinner"; // ✅ Fixed 

const ProjectInsights = ({ domain, salaryRange, companyType }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProjectInsightsApi({
          domain,
          salaryRange,
        });
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error("Failed to load project insights:", err);
        setError("Failed to load project insights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (domain && salaryRange) {
      loadProjects();
    }
  }, [domain, salaryRange]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!projects.length) {
    return <EmptyState domain={domain} />;
  }

  return (
    <div className="projects-container">
      {/* HEADER */}
      <div className="projects-header">
        <h2 className="projects-title">🚀 Recommended Industry Projects</h2>
        <div className="projects-meta">
          <span className="domain-badge">{domain}</span>
          <span className="salary-badge">{salaryRange}</span>
          {companyType && <span className="company-badge">{companyType}</span>}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>

      <style>{`
        /* CONTAINER */
        .projects-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* HEADER */
        .projects-header {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .projects-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .projects-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 1rem 0;
          position: relative;
          z-index: 1;
        }

        .projects-meta {
          display: flex;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .domain-badge, .salary-badge, .company-badge {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #f1f5f9;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* GRID */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
        }

        /* PROJECT CARD */
        .project-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(226, 232, 240, 0.5);
          transition: all 0.3s ease;
          height: 100%;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(226, 232, 240, 0.5);
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
        }

        .project-icon {
          font-size: 2rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        p {
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: #475569;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .project-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 2px solid rgba(226, 232, 240, 0.5);
        }

        .content-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .content-list li {
          color: #64748b;
          padding: 0.75rem 0;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.5;
        }

        .content-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #6366f1;
          font-weight: 700;
        }

        /* STATES */
        .loading-container,
        .error-container,
        .empty-container {
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          background: #f8fafc;
          border-radius: 20px;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .project-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

// ✅ ProjectCard Component
const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="card-header">
      <h3 className="project-title">{project.title}</h3>
      <div className="project-icon">🚀</div>
    </div>

    <div className="project-overview">
      <h4>📋 Project Overview</h4>
      <p>{project.projectOverview}</p>
    </div>

    <div className="project-tech">
      <h4>💻 Tech Stack</h4>
      <div className="tech-tags">
        {project.techStack.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </div>
    </div>

    <div className="project-recruiter">
      <h4>✅ Why Recruiters Like This</h4>
      <p>{project.whyRecruitersLikeIt}</p>
    </div>

    <div className="project-content">
      <div className="content-section">
        <h4>📊 PPT Content</h4>
        <ul className="content-list">
          {project.pptContent.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="content-section">
        <h4>📝 Report Writing Points</h4>
        <ul className="content-list">
          {project.reportPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// // ✅ LoadingSpinner
// const LoadingSpinner = () => (
//   <div className="loading-container">
//     <div className="spinner" />
//     <p>Loading project recommendations...</p>
//   </div>
// );

// ✅ ErrorState
const ErrorState = ({ message }) => (
  <div className="error-container">
    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
    <p style={{ color: '#ef4444', fontSize: '1.2rem' }}>{message}</p>
  </div>
);

// ✅ EmptyState
const EmptyState = ({ domain }) => (
  <div className="empty-container">
    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
    <h3 style={{ color: '#64748b' }}>No projects found</h3>
    <p style={{ color: '#94a3b8' }}>
      No project recommendations available for {domain} at this time.
    </p>
  </div>
);

export default ProjectInsights;







