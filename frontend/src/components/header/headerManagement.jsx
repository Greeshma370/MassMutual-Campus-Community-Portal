import collegeLogo from "../../images/VCE-LOGO.png";
import { Link } from 'react-router-dom';
import './header.css';

export default function HeaderManagement() {
    return (
        <header>
            <img src={collegeLogo} alt="College Logo" />
            <h1>Community Portal</h1>
            <nav>
                <ul>
                    <li><Link to="/dashboard/management">Home</Link></li>
                    <li><Link to ="/management/jobs">Jobs</Link></li>
                    <li><Link to="/management/applications">Applications</Link></li>
                    <li><Link to="/management/faculty">Faculty</Link></li>
                    <li><Link to="/management/students">Students</Link></li>
                    <li><Link to="/management/all">Management</Link></li>
                    <li><Link to="/management/registerfaculty">Add Faculty</Link></li>
                    <li><Link to="/management/registermanagement">Add Management</Link></li>
                    <li><Link to="/management/profile">Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
}
