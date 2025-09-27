import collegeLogo from "../../images/VCE-LOGO.png";
import './header.css';

export default function HeaderManagement() {
    return (
        <header>
            <img src={collegeLogo} alt="College Logo" />
            <h1>Community Portal</h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Jobs</li>
                    <li>Faculty</li>
                    <li>Students</li>
                    <li>Management</li>
                    <li>Add Faculty</li>
                    <li>Add Management</li>
                    <li>Profile</li>
                </ul>
            </nav>
        </header>
    );
}
