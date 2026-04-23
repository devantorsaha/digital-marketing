'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Portfolio() {
    useEffect(() => {
        const initAOS = async () => {
            const AOS = (await import('aos')).default;
            await import('aos/dist/aos.css');
            AOS.init({ duration: 800, once: true });
        };
        initAOS();
    }, []);

    const projects = [
        { icon: 'fa-store', tag: 'E-Commerce', title: 'RetailMax Growth Campaign', desc: 'Increased online sales by 340% through integrated SEO, PPC, and social media strategy over 6 months.', stats: [{ v: '340%', l: 'Sales Increase' }, { v: '6 Mo', l: 'Duration' }] },
        { icon: 'fa-utensils', tag: 'Restaurant', title: 'Chef Table Brand Launch', desc: 'Complete brand identity and digital presence launch including website, social media, and local SEO.', stats: [{ v: '100%', l: 'Brand Recognition' }, { v: '3 Mo', l: 'Launch Time' }] },
        { icon: 'fa-building', tag: 'Real Estate', title: 'Urban Living Lead Gen', desc: 'Generated 500+ qualified leads monthly through targeted Facebook Ads.', stats: [{ v: '500+', l: 'Leads/Month' }, { v: '-65%', l: 'Cost Per Lead' }] },
        { icon: 'fa-heartbeat', tag: 'Healthcare', title: 'MediCare Patient Acquisition', desc: 'Reduced cost-per-lead by 65% while increasing patient bookings.', stats: [{ v: '65%', l: 'CPL Reduction' }, { v: '2x', l: 'Bookings' }] },
        { icon: 'fa-graduation-cap', tag: 'Education', title: 'LearnTech Online Platform', desc: 'Built and marketed a learning platform that reached 50,000+ students.', stats: [{ v: '50K+', l: 'Students' }, { v: '12 Mo', l: 'Timeframe' }] },
        { icon: 'fa-spa', tag: 'Beauty', title: 'GlowBeauty Social Strategy', desc: 'Grew Instagram following from 2K to 150K with engagement rates 3x average.', stats: [{ v: '150K', l: 'Followers' }, { v: '3x', l: 'Engagement' }] },
    ];

    return (
        <>
            <nav className="floating-nav">
                <div className="nav-inner">
                    <Link href="/" className="nav-logo"><img src="/logo.png" alt="MarketingPark" /></Link>
                    <div className="nav-menu">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/services" className="nav-link">Services</Link>
                        <Link href="/portfolio" className="nav-link active">Portfolio</Link>
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
                        <div className="section-label">OUR PORTFOLIO</div>
                        <h1>See How We Deliver <span className="gradient-text">Measurable Results</span></h1>
                        <p>Explore our latest projects and see how we have helped brands achieve their marketing goals.</p>
                    </div>
                </div>
            </header>

            <section className="portfolio-section">
                <div className="container">
                    <div className="portfolio-grid">
                        {projects.map((p, i) => (
                            <div className="portfolio-card" key={i} data-aos="fade-up" data-aos-delay={100 + i * 50}>
                                <div className="portfolio-image"><i className={`fas ${p.icon}`}></i></div>
                                <div className="portfolio-content">
                                    <span className="portfolio-tag">{p.tag}</span>
                                    <h3>{p.title}</h3>
                                    <p>{p.desc}</p>
                                    <div className="portfolio-stats">
                                        {p.stats.map((s, j) => (<div key={j}><span className="stat">{s.v}</span><span>{s.l}</span></div>))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item" data-aos="fade-up" data-aos-delay="100"><span className="stat-num">2.1B+</span><span className="stat-info">Impressions</span></div>
                        <div className="stat-item" data-aos="fade-up" data-aos-delay="150"><span className="stat-num">5,648</span><span className="stat-info">Projects</span></div>
                        <div className="stat-item" data-aos="fade-up" data-aos-delay="200"><span className="stat-num">99K+</span><span className="stat-info">Campaigns</span></div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-bg"><div className="cta-blob"></div></div>
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Ready To Be Our Next Success Story?</h2>
                        <p>Lets create something amazing together.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn-cta"><span>Start Your Project</span><i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}