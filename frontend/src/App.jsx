import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcomePage'; // Your new entry page
import RegisterStudent from './components/Registrations/registerStudent';
import RegisterFaculty from './components/Registrations/registerFaculty';
import RegisterManagement from './components/Registrations/registerManagement';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        {/* The WelcomePage is now your main entry point */}
        <Route path="/" element={<WelcomePage />} />

        {/* You can use a single dynamic route for registration */}
        {/* We will create a dynamic RegisterPage in the next step */}
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/faculty" element={<RegisterFaculty />} />
        <Route path="/register/management" element={<RegisterManagement />} />
        
        {/* Add your login and other routes here */}
        {/* <Route path="/login/:role" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;