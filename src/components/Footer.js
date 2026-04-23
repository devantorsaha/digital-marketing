'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo-text">Marketing<span>Park</span></div>
                        <p>The Team That Turns Your Marketing Into Measurable Growth</p>
                        <div className="footer-social">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="footer-links-group">
                        <h4>Quick Links</h4>
                        <nav>
                            <Link href="/">Home</Link>
                            <Link href="/services">Services</Link>
                            <Link href="/portfolio">Portfolio</Link>
                            <Link href="/about">About</Link>
                            <Link href="/contact">Contact</Link>
                        </nav>
                    </div>
                    <div className="footer-links-group">
                        <h4>Services</h4>
                        <nav>
                            <Link href="/services">Strategy and Analytics</Link>
                            <Link href="/services">Social Media</Link>
                            <Link href="/services">Web Development</Link>
                            <Link href="/services">Advertising and SEO</Link>
                        </nav>
                    </div>
                    <div className="footer-contact">
                        <h4>Get In Touch</h4>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <span>hello@marketingpark.com</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-location-dot"></i>
                            <span>Your City, Country</span>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 MarketingPark. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}