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
                    <li>Students</li>
                    <li>Profile</li>
                </ul>
            </nav>
        </header>
    );
}
