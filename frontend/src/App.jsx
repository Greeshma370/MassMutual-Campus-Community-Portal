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
import FacultyProfile from './pages/FacultyProfile.jsx';
import ManagementJobs from './pages/ManagementJobs.jsx';
import ManagementProfile from './pages/ManagementProfile.jsx';
import RegisterFaculty from './pages/RegisterFaculty.jsx';
import RegisterManagement from './pages/RegisterManagement.jsx';
import ManagementApplications from './pages/ManagementApplications.jsx';
import FacultyApplications from './pages/FacultyApplications.jsx';
import FacultyStudents from './pages/FacultyStudent.jsx';
import ManagementStudents from './pages/ManagementStudent.jsx';
import ManagementFaculty from './pages/ManagementFaculty.jsx';
import ManagementAll from './pages/ManagementAll.jsx';
import JobsApply from './pages/JobsForyou.jsx';

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
          path="/student/jobsforyou" 
          element={<ProtectedRoute><JobsApply/></ProtectedRoute>} 
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
          element={<ProtectedRoute><FacultyJobs /></ProtectedRoute>} 
        />
        <Route 
          path="/faculty/profile" 
          element={<ProtectedRoute><FacultyProfile /></ProtectedRoute>} 
        />
        <Route 
          path="/faculty/applications" 
          element={<ProtectedRoute><FacultyApplications /></ProtectedRoute>} 
        />
        <Route 
          path="/faculty/students" 
          element={<ProtectedRoute><FacultyStudents /></ProtectedRoute>} 
        />
        <Route 
          path="/dashboard/management" 
          element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/management/jobs" 
          element={<ProtectedRoute><ManagementJobs/></ProtectedRoute>} 
        />
        <Route 
          path="/management/registerfaculty" 
          element={<ProtectedRoute><RegisterFaculty/></ProtectedRoute>} 
        />
        <Route 
          path="/management/registermanagement" 
          element={<ProtectedRoute><RegisterManagement/></ProtectedRoute>} 
        />
        <Route 
          path="/management/applications" 
          element={<ProtectedRoute><ManagementApplications/></ProtectedRoute>} 
        />
        <Route 
          path="/management/students" 
          element={<ProtectedRoute><ManagementStudents/></ProtectedRoute>} 
        />
        <Route 
          path="/management/faculty" 
          element={<ProtectedRoute><ManagementFaculty/></ProtectedRoute>} 
        />
        <Route 
          path="/management/all" 
          element={<ProtectedRoute><ManagementAll/></ProtectedRoute>} 
        />
      
        <Route 
          path="/management/profile" 
          element={<ProtectedRoute><ManagementProfile/></ProtectedRoute>} 
        />
        
      </Routes>
    </Router>
  );
}

export default App;