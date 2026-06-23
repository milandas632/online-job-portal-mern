import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Jobs from './pages/Jobs.jsx';
import JobDetails from './pages/JobDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CandidateDashboard from './pages/CandidateDashboard.jsx';
import RecruiterDashboard from './pages/RecruiterDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute roles={['candidate']} />}><Route path="candidate" element={<CandidateDashboard />} /></Route>
        <Route element={<ProtectedRoute roles={['recruiter']} />}><Route path="recruiter" element={<RecruiterDashboard />} /></Route>
        <Route element={<ProtectedRoute roles={['admin']} />}><Route path="admin" element={<AdminDashboard />} /></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
