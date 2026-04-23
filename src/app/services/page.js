'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Services() {
    useEffect(() => {
        const initAOS = async () => {
            const AOS = (await import('aos')).default;
            await import('aos/dist/aos.css');
            AOS.init({ duration: 800, once: true });
        };
        initAOS();
    }, []);

    const services = [
        { icon: 'fa-chart-pie', title: 'Strategy and Analytics', description: 'We analyze market data and trends to build the right digital strategy for your brand, delivering measurable performance reports backed by real insights.', features: ['Market Research', 'Competitor Benchmarking', 'Performance Analytics', 'Growth Strategy'] },
        { icon: 'fa-share-alt', title: 'Social Media Management', description: 'We professionally manage your social media accounts with strategic content planning and community engagement to boost brand awareness.', features: ['Content Strategy', 'Community Management', 'Social Analytics', 'Influencer Marketing'] },
        { icon: 'fa-code', title: 'Software and Web Development', description: 'We deliver fast, secure, and modern websites and custom software solutions tailored to your business needs.', features: ['Custom Web Development', 'WordPress and CMS', 'E-commerce Solutions', 'API Integration'] },
        { icon: 'fa-search', title: 'Advertising and SEO', description: 'We run effective advertising campaigns across Google and social media platforms while strengthening your organic reach through SEO.', features: ['Google Ads', 'Social Media Advertising', 'Technical SEO', 'Content SEO'] },
        { icon: 'fa-palette', title: 'Brand Development', description: 'We craft unique logo designs and comprehensive branding strategies that reflect your identity and set you apart in the market.', features: ['Logo Design', 'Brand Identity', 'Brand Guidelines', 'Brand Strategy'] },
        { icon: 'fa-ad', title: 'PPC Campaign Management', description: 'We design and manage PPC campaigns on platforms like Google Ads and Facebook Ads, maximizing your ROI.', features: ['Campaign Strategy', 'Budget Optimization', 'A/B Testing', 'ROI Reporting'] },
        { icon: 'fa-video', title: 'Content Creation', description: 'We produce high-engagement content including blog posts, videos, and graphics designed to amplify your brand voice.', features: ['Blog and Articles', 'Video Production', 'Graphic Design', 'Copywriting'] },
        { icon: 'fa-pencil-ruler', title: 'UI/UX Design', description: 'We design intuitive, user-centered interfaces that enhance the digital experience and drive customer satisfaction.', features: ['User Research', 'Wireframing', 'UI Design', 'Prototyping'] },
    ];

    return (
        <>
            <nav className="floating-nav">
                <div className="nav-inner">
                    <Link href="/" className="nav-logo"><img src="/logo.png" alt="MarketingPark" /></Link>
                    <div className="nav-menu">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/services" className="nav-link active">Services</Link>
                        <Link href="/portfolio" className="nav-link">Portfolio</Link>
                        <Link href="/about" className="nav-link">About</Link>
                        <Link href="/contact" className="nav-cta">Lets Talk</Link>
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
                        <div className="section-label">OUR SERVICES</div>
                        <h1>We are Here To <span className="gradient-text">Power Your Growth</span></h1>
                        <p>From strategy to execution, we offer comprehensive digital marketing solutions tailored to your business needs.</p>
                    </div>
                </div>
            </header>

            <section className="services-detail">
                <div className="container">
                    <div className="services-detail-grid">
                        {services.map((s, i) => (
                            <div className="service-detail-card" key={i} data-aos="fade-up" data-aos-delay={100 + i * 50}>
                                <div className="service-detail-icon"><i className={`fas ${s.icon}`}></i></div>
                                <div className="service-detail-content">
                                    <h3>{s.title}</h3>
                                    <p>{s.description}</p>
                                    <ul className="service-features">
                                        {s.features.map((f, j) => (<li key={j}><i className="fas fa-check"></i> {f}</li>))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="stack-section">
                <div className="container">
                    <div className="stack-grid">
                        <div className="stack-content" data-aos="fade-right">
                            <div className="section-label light">TECH STACK</div>
                            <h2>The Stack That <span className="gradient-text-light">Drives Results</span></h2>
                            <p>Behind every successful campaign is the right technology.</p>
                        </div>
                        <div className="stack-cards" data-aos="fade-left">
                            <div className="stack-card">
                                <div className="stack-icon"><i className="fas fa-bullhorn"></i></div>
                                <div><h4>Advertising</h4><div className="stack-tools">Google Ads, Meta, Analytics</div></div>
                            </div>
                            <div className="stack-card">
                                <div className="stack-icon"><i className="fas fa-paint-brush"></i></div>
                                <div><h4>Design</h4><div className="stack-tools">Figma, Canva, WordPress</div></div>
                            </div>
                            <div className="stack-card">
                                <div className="stack-icon"><i className="fas fa-handshake"></i></div>
                                <div><h4>CRM</h4><div className="stack-tools">HubSpot, Mailchimp</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-bg"><div className="cta-blob"></div></div>
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Ready To Get Started?</h2>
                        <p>Lets discuss how we can help power your business growth.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn-cta"><span>Contact Us</span><i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}