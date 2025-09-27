import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import RegisterStudent from './components/Registrations/registerStudent';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;