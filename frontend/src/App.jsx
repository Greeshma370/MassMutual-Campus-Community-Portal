import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Page Imports
import WelcomePage from './pages/WelcomePage';
import StudentDashboard from './pages/StudentDashboard';

// Component Imports
import RegisterStudent from './components/Registrations/registerStudent';
import LoginStudent from './components/Registrations/loginStudent'; 
// ... other component imports

// A simple component to protect routes
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <WelcomePage /> : <Navigate to="/dashboard/student" />} />
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
        
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;