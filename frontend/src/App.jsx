import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

// Page Imports
import WelcomePage from './pages/WelcomePage.jsx'; 
import StudentDashboard from './pages/StudentDashboard.jsx';

// Component Imports
import RegisterStudent from './components/Registrations/registerStudent.jsx';
import LoginStudent from './components/Registrations/loginStudent.jsx'; 

// A simple component to protect routes
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  // Redirect to the login page if not authenticated
  return isAuthenticated ? children : <Navigate to="/login/student" />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <WelcomePage /> : <Navigate to="/dashboard/student" />} 
        />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/login/student" element={<LoginStudent />} />
        
        {/* Protected Student Dashboard Route */}
        <Route 
          path="/dashboard/student" 
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;