// FIXED ResumePreview.jsx - Working React-PDF
import { useState, useEffect } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Navbar from "../../components/common/Navbar";
import "./ResumePreview.css";

// ✅ FIXED: Proper React-PDF Styles
const styles = StyleSheet.create({
  page: { 
    padding: 50, 
    fontSize: 12,
    lineHeight: 1.4,
    backgroundColor: '#fff'
  },
  header: { 
    marginBottom: 20 
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 5
  },
  contact: { 
    fontSize: 12, 
    color: 'gray' 
  },
  role: { 
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  section: { 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: 'bold',
    marginBottom: 8,
    textDecoration: 'underline'
  },
  content: { 
    fontSize: 12,
    marginBottom: 5 
  },
  expItem: { 
    marginBottom: 12 
  },
  expRole: { 
    fontSize: 12, 
    fontWeight: 'bold',
    marginBottom: 2 
  },
  expDuration: { 
    fontSize: 11, 
    color: '#666',
    marginBottom: 3 
  },
  expDesc: { 
    fontSize: 12 
  },
  projItem: { 
    marginBottom: 12 
  },
  projTitle: { 
    fontSize: 12, 
    fontWeight: 'bold',
    marginBottom: 3 
  },
  projDesc: { 
    fontSize: 12 
  }
});

const ResumePDF = ({ resumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{resumeData.name}</Text>
        <Text style={styles.contact}>
          {resumeData.email} | {resumeData.phone || 'Phone'}
        </Text>
      </View>

      {/* ROLE */}
      <Text style={styles.role}>{resumeData.role}</Text>

      {/* SUMMARY */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUMMARY</Text>
        <Text style={styles.content}>{resumeData.summary}</Text>
      </View>

      {/* SKILLS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <Text style={styles.content}>{resumeData.skills?.join(" • ") || ''}</Text>
      </View>

      {/* EXPERIENCE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {resumeData.experience?.map((exp, i) => (
          <View key={i} style={styles.expItem}>
            <Text style={styles.expRole}>{exp.role} — {exp.company}</Text>
            <Text style={styles.expDuration}>{exp.duration}</Text>
            <Text style={styles.expDesc}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* PROJECTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROJECTS</Text>
        {resumeData.projects?.map((proj, i) => (
          <View key={i} style={styles.projItem}>
            <Text style={styles.projTitle}>
              {proj.title} ({proj.techStack?.join(", ") || ''})
            </Text>
            <Text style={styles.projDesc}>{proj.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function ResumePreview({ resumeId }) {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        const data = await res.json();
        setResumeData(data);
      } catch (err) {
        console.error('Failed to fetch resume:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (resumeId) fetchResume();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="resume-loading">
        <div className="running-man">🏃 Generating your resume...</div>
      </div>
    );
  }

  if (!resumeData) {
    return <div className="no-resume">Resume not found</div>;
  }

  return (
    <div className="resume-preview-page">
      <Navbar />
      
      <div className="resume-preview-container">
        {/* Preview Pane */}
        <div className="preview-pane">
          <PDFDownloadLink 
            document={<ResumePDF resumeData={resumeData} />}
            fileName={`${resumeData.name}-Resume.pdf`}
            className="pdf-preview-link"
          >
            {({ blob, url, loading: pdfLoading }) => (
              <div className="pdf-placeholder">
                <i className="fas fa-file-pdf pdf-icon"></i>
                <p>{pdfLoading ? 'Generating PDF...' : 'Click to Preview & Download'}</p>
              </div>
            )}
          </PDFDownloadLink>
        </div>

        {/* Controls */}
        <div className="controls-pane">
          <div className="resume-header">
            <h1>{resumeData.name}'s Resume</h1>
            <p>Professional PDF ready for download</p>
          </div>

          <div className="download-buttons">
            <PDFDownloadLink 
              document={<ResumePDF resumeData={resumeData} />}
              fileName={`${resumeData.name}-Resume-${new Date().getFullYear()}.pdf`}
              className="download-btn primary"
            >
              {({ blob, url, loading }) => (
                <span>
                  <i className="fas fa-download"></i>
                  {loading ? 'Generating...' : 'Download PDF'}
                </span>
              )}
            </PDFDownloadLink>
            
            <button 
              onClick={() => window.print()} 
              className="download-btn secondary"
            >
              <i className="fas fa-print"></i> Print
            </button>
          </div>

          <div className="resume-stats">
            <div className="stat">
              <span className="stat-number">{resumeData.experience?.length || 0}</span>
              <span>Experience Items</span>
            </div>
            <div className="stat">
              <span className="stat-number">{resumeData.projects?.length || 0}</span>
              <span>Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">{resumeData.skills?.length || 0}</span>
              <span>Skills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
