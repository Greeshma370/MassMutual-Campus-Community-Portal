import './Footer.css';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <p className="copyright">
                    © {new Date().getFullYear()} Community Portal. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
