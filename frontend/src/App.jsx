import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

// Page Imports
import WelcomePage from './pages/welcomePage';
import StudentDashboard from './pages/StudentDashboard';

// Component Imports
import RegisterStudent from './components/Registrations/registerStudent';
import LoginStudent from './components/Registrations/loginStudent'; 

// A simple component to protect routes
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
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