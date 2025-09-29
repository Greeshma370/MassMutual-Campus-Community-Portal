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
                    <li><Link to = "/dashboard/student">Home</Link></li>
                    <li><Link to ="/student/jobsforyou">Jobs For You</Link></li>
                    <li><Link to = "/student/jobsall">All Jobs</Link></li>
                    <li><Link to = "/student/applications">Your Applications</Link></li>
                    <li><Link to = "/student/profile">Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
}
