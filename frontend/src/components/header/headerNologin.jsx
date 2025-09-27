import collegeLogo from "../../images/VCE-LOGO.png";
import './header.css';

export default function HeaderGuest() {
    return (
        <header>
            <img src={collegeLogo} alt="College Logo" />
            <h1>Community Portal</h1>
        </header>
    );
}
