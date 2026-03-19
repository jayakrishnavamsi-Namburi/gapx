

import { Routes, Route, Navigate } from "react-router-dom";

/* ---------- AUTH ---------- */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChangePassword from "./pages/profile/ChangePassword";


/* ---------- DASHBOARD ---------- */
import Dashboard from "./pages/dashboard/Dashboard";

/* ---------- ROADMAP ---------- */
import CreateRoadmap from "./pages/roadmap/CreateRoadmap";
import MyRoadmaps from "./pages/roadmap/MyRoadmaps";
import RoadmapView from "./pages/roadmap/RoadmapView";
import ProjectInsightsView from "./pages/roadmap/ProjectInsightsView.jsx"; // ✅ Moved up

/* ---------- RESUME ---------- */
import CreateResume from "./pages/resume/CreateResume";
import MyResumes from "./pages/resume/MyResumes";
import ResumeView from "./pages/resume/ResumeView";
import ResumeEdit from "./pages/resume/ResumeEditor.jsx";

/* ---------- PROJECTS ---------- */
import ProjectSuggestions from "./pages/projects/ProjectSuggestions.jsx";

import QuizPage from "./pages/QuizPage";
import QuizHistory from "./pages/QuizHistory";
import DoubtSolver from "./pages/DoubtSolver";

import CalendarTasks from "./pages/tasks/CalendarTasks";

/* ---------- COMMON ---------- */
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotFound from "./pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      {/* ---------- DEFAULT ---------- */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      


      {/* ---------- DASHBOARD ---------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>

<Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <CalendarTasks />
    </ProtectedRoute>
  }
/>



      {/* ---------- ROADMAP ---------- */}
      <Route
        path="/roadmap/create"
        element={
          <ProtectedRoute>
            <CreateRoadmap />
          </ProtectedRoute>
        }
      />

      <Route
        path="/roadmaps"
        element={
          <ProtectedRoute>
            <MyRoadmaps />
          </ProtectedRoute>
        }
      />

      <Route path="/roadmap/:id" element={
        <ProtectedRoute>
          <RoadmapView />
          </ProtectedRoute>} />

        <Route
        path="/resume/view/:id"
        element={
          <ProtectedRoute>
            <ResumeView />
          </ProtectedRoute>
        }
      />
      
      <Route
  path="/resume/edit/:id"
  element={
    <ProtectedRoute>
      <ResumeEdit />
    </ProtectedRoute>
  }
/>

      {/* ✅ FIXED: Added ProtectedRoute */}
      <Route
        path="/roadmap/:id/insights"
        element={
          <ProtectedRoute>
            <ProjectInsightsView />
          </ProtectedRoute>
        }
      />

      {/* ---------- RESUME ---------- */}
      <Route
        path="/resume/create"
        element={
          <ProtectedRoute>
            <CreateResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resumes"
        element={
          <ProtectedRoute>
            <MyResumes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume/:id"
        element={
          <ProtectedRoute>
            <ResumeView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/suggestions"
        element={
          <ProtectedRoute>
            <ProjectSuggestions />
          </ProtectedRoute>
        }
      />

      <Route
  path="/quiz/:roadmapId"
  element={
    <ProtectedRoute>
      <QuizPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/quizzes"
  element={
    <ProtectedRoute>
      <QuizHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/doubt-solver"
  element={
    <ProtectedRoute>
      <DoubtSolver />
    </ProtectedRoute>
  }
/>




      {/* ---------- 404 ---------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
