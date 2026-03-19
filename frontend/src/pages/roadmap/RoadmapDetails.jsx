import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleRoadmapApi,
  updateProgressApi,
} from "../../api/roadmapApi";
import Navbar from "../../components/common/Navbar";
import RoadmapProgress from "../../components/roadmap/RoadmapProgress";
import TopicCheckbox from "../../components/roadmap/TopicCheckbox";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import "./checkbox.css";
const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      const res = await getSingleRoadmapApi(id);
      setRoadmap(res.data.roadmap);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = async (topicId, completed) => {
    try {
      const res = await updateProgressApi(id, {
        topicId,
        completed,
      });

      setRoadmap((prev) => ({
        ...prev,
        progress: res.data.progress,
        completedTopicsList: res.data.completedTopicsList,
      }));
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!roadmap) {
    return <div>Roadmap not found</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: 20, maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#000080', fontFamily: "'MS Sans Serif', sans-serif" }}>
          {roadmap.plan.title}
        </h2>
        <p style={{ color: '#000080', fontFamily: "'MS Sans Serif', sans-serif", fontSize: '14px' }}>
          {roadmap.plan.summary}
        </p>

        {/* Overall Progress */}
        <div style={{ margin: '20px 0' }}>
          <RoadmapProgress
            completed={roadmap.progress.completedTopics}
            total={roadmap.progress.totalTopics}
          />
        </div>

        {/* Weeks */}
        {roadmap.plan.weeks.map((week, wIndex) => (
          <div 
            key={week.weekNumber} 
            style={{ 
              marginTop: 30, 
              padding: '15px',
              border: '2px outset #c0c0c0',
              background: '#f0f0f0'
            }}
          >
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#000080',
              fontFamily: "'MS Sans Serif', sans-serif",
              fontSize: '18px'
            }}>
              Week {week.weekNumber}: {week.focus}
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {week.topics.map((topic, tIndex) => {
                const topicId = `${week.weekNumber}-${tIndex}`;
                const completed = roadmap.completedTopicsList.includes(topicId);

                return (
                  <li key={topicId} style={{ margin: '8px 0' }}>
                    <TopicCheckbox
                      topic={topic}
                      completed={completed}
                      onToggle={(checked) => toggleTopic(topicId, checked)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoadmapDetail;
