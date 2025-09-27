import collegeLogo from "../../images/VCE-LOGO.png";
import './header.css';
import {Link} from "react-router-dom";

export default function HeaderStudent() {
    return (
        <header>
            <img src={collegeLogo} alt="College Logo" />
            <h1>Community Portal</h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Jobs For You</li>
                    <li><Link to = "/student/jobsall">All Jobs</Link></li>
                    <li>Your Applications</li>
                    <li>Profile</li>
                </ul>
            </nav>
        </header>
    );
}
