import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
               <div className="footer-content">
                    <div classNam="footer-section">
                        <h3>Fintech Bank</h3>
                        <p>123 Main Street, City, State 12345</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">About</a></li>
                            <li><a href="/">Contact</a></li>
                        </ul>
                    </div>
                    <div className= "footer-section">
                        <h4>Contact Us</h4>
                        <p>Email: info@fintechbank.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Fintech Bank. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )

}

export default Footer;