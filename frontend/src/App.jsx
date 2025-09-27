import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

// Page Imports
import WelcomePage from './pages/WelcomePage.jsx';
import RoleSelectorPage from './pages/RoleSelectorPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import FacultyDashboard from './pages/FacultyDashboard.jsx';
import ManagementDashboard from './pages/ManagementDashboard.jsx';
import StudentJobsAll from './pages/StudentJobsAll.jsx';
import StudentProfile from './pages/StudentProfile.jsx';
import StudentApplications from './pages/StudentApplications.jsx';
import FacultyJobs from './pages/FacultyJobs.jsx';

// Component Imports
import RegisterStudent from './components/Registrations/registerStudent.jsx';
import LoginStudent from './components/Registrations/loginStudent.jsx'; 
import LoginFaculty from './components/Registrations/loginFaculty.jsx'; 
import LoginManagement from './components/Registrations/loginManagement.jsx';

// A component to protect routes
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// A component to handle dashboard redirection
function Dashboard() {
  const { role } = useAuth();
  if (role === 'student') return <Navigate to="/dashboard/student" />;
  if (role === 'faculty') return <Navigate to="/dashboard/faculty" />;
  if (role === 'management') return <Navigate to="/dashboard/management" />;
  // Fallback if role is not set
  return <Navigate to="/" />;
}


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <WelcomePage /> : <Dashboard />} 
        />
        <Route path="/login" element={<RoleSelectorPage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/login/student" element={<LoginStudent />} />
        <Route path="/login/faculty" element={<LoginFaculty />} />
        <Route path="/login/management" element={<LoginManagement />} />
        {/* You will need to create login pages for faculty and management */}
        {/* <Route path="/login/faculty" element={<LoginFaculty />} /> */}
        {/* <Route path="/login/management" element={<LoginManagement />} /> */}
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard/student" 
          element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/student/jobsall" 
          element={<ProtectedRoute><StudentJobsAll/></ProtectedRoute>} 
        />
        <Route 
          path="/student/applications" 
          element={<ProtectedRoute><StudentApplications/></ProtectedRoute>} 
        />
        <Route 
          path="/student/profile" 
          element={<ProtectedRoute><StudentProfile/></ProtectedRoute>} 
        />
        <Route 
          path="/dashboard/faculty" 
          element={<ProtectedRoute><FacultyDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/faculty/jobs" 
          element={<ProtectedRoute><FacultyDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/dashboard/management" 
          element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;