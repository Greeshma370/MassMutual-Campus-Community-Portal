import collegeLogo from "../../images/VCE-LOGO.png";
import './header.css';

export default function HeaderFaculty() {
    return (
        <header>
            <img src={collegeLogo} alt="College Logo" />
            <h1>Community Portal</h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Jobs</li>
                    <li><Link to = "/faculty/jobs">Jobs</Link></li>
                    <li>Students</li>
                    <li>Profile</li>
                </ul>
            </nav>
        </header>
    );
}
