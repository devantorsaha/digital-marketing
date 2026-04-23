'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Contact() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', service: '', message: '' });

    useEffect(() => {
        const initAOS = async () => {
            const AOS = (await import('aos')).default;
            await import('aos/dist/aos.css');
            AOS.init({ duration: 800, once: true });
        };
        initAOS();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); console.log('Form:', formData); };

    return (
        <>
            <nav className="floating-nav">
                <div className="nav-inner">
                    <Link href="/" className="nav-logo"><img src="/logo.png" alt="MarketingPark" /></Link>
                    <div className="nav-menu">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/services" className="nav-link">Services</Link>
                        <Link href="/portfolio" className="nav-link">Portfolio</Link>
                        <Link href="/about" className="nav-link">About</Link>
                        <Link href="/contact" className="nav-cta active">Lets Talk</Link>
                    </div>
                </div>
            </nav>

            <header className="page-hero">
                <div className="hero-bg-elements">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                </div>
                <div className="container">
                    <div className="page-hero-content" data-aos="fade-up">
                        <div className="section-label">CONTACT US</div>
                        <h1>Lets Start A <span className="gradient-text">Conversation</span></h1>
                        <p>We would love to hear about your project and how we can help power your growth.</p>
                    </div>
                </div>
            </header>

            <section className="contact-page">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info" data-aos="fade-right">
                            <h2>Get In Touch</h2>
                            <p>Ready to transform your marketing? Fill out the form or reach out directly - we are here to help you grow.</p>
                            <div className="contact-methods">
                                <div className="contact-method-card">
                                    <div className="method-icon"><i className="fas fa-envelope"></i></div>
                                    <div><h4>Email Us</h4><span>hello@marketingpark.com</span></div>
                                </div>
                                <div className="contact-method-card">
                                    <div className="method-icon"><i className="fas fa-phone"></i></div>
                                    <div><h4>Call Us</h4><span>+1 (555) 123-4567</span></div>
                                </div>
                                <div className="contact-method-card">
                                    <div className="method-icon"><i className="fas fa-location-dot"></i></div>
                                    <div><h4>Visit Us</h4><span>Your City, Country</span></div>
                                </div>
                            </div>
                            <div className="contact-social">
                                <h4>Follow Us</h4>
                                <div className="footer-social">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper" data-aos="fade-left">
                            <form className="modern-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <input name="company" value={formData.company} onChange={handleChange} placeholder="Your Company" />
                                </div>
                                <div className="form-group">
                                    <label>Service Interested In</label>
                                    <input name="service" value={formData.service} onChange={handleChange} placeholder="e.g., Social Media" />
                                </div>
                                <div className="form-group">
                                    <label>Your Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." required></textarea>
                                </div>
                                <button type="submit" className="btn-submit"><span>Send Message</span><i className="fas fa-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}