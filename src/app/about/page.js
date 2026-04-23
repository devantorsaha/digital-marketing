'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function About() {
    useEffect(() => {
        const initAOS = async () => {
            const AOS = (await import('aos')).default;
            await import('aos/dist/aos.css');
            AOS.init({ duration: 800, once: true });
        };
        initAOS();
    }, []);

    const team = [
        { initials: 'JD', name: 'John Doe', role: 'CEO and Founder', socials: ['fa-linkedin', 'fa-twitter'] },
        { initials: 'JS', name: 'Jane Smith', role: 'Marketing Director', socials: ['fa-linkedin', 'fa-twitter'] },
        { initials: 'MW', name: 'Mike Wilson', role: 'Lead Developer', socials: ['fa-linkedin', 'fa-github'] },
        { initials: 'SJ', name: 'Sarah Johnson', role: 'Creative Director', socials: ['fa-linkedin', 'fa-dribbble'] },
    ];

    const whyCards = [
        { icon: 'fa-chart-line', title: 'Proven Process', desc: 'We follow a clear, structured approach to every project from strategy to execution.' },
        { icon: 'fa-users', title: 'Dedicated Team', desc: 'Our specialists bring expertise across marketing, design, and development.' },
        { icon: 'fa-file-invoice-dollar', title: 'Transparent Reporting', desc: 'We keep you in the loop with clear, regular performance reports.' },
    ];

    return (
        <>
            <nav className="floating-nav">
                <div className="nav-inner">
                    <Link href="/" className="nav-logo"><img src="/logo.png" alt="MarketingPark" /></Link>
                    <div className="nav-menu">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/services" className="nav-link">Services</Link>
                        <Link href="/portfolio" className="nav-link">Portfolio</Link>
                        <Link href="/about" className="nav-link active">About</Link>
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
                        <div className="section-label">ABOUT US</div>
                        <h1>Built By Marketers.<br /><span className="gradient-text">Driven By Results.</span></h1>
                        <p>Meet the team that is transforming how businesses approach digital marketing.</p>
                    </div>
                </div>
            </header>

            <section className="about-story">
                <div className="container">
                    <div className="about-hero-grid">
                        <div className="about-hero-image" data-aos="fade-right">
                            <div className="about-img-wrapper">
                                <div className="about-img-main"><i className="fas fa-users"></i></div>
                                <div className="about-img-accent"></div>
                            </div>
                        </div>
                        <div className="about-hero-content" data-aos="fade-left">
                            <div className="section-label">WHO WE ARE</div>
                            <h2>Built By Marketers.<br /><span className="gradient-text">Driven By Results.</span></h2>
                            <p className="about-lead">MarketingPark was founded with one goal in mind: to give businesses of all sizes access to the kind of marketing expertise that actually moves the needle.</p>
                            <p>We are a team of strategists, designers, developers, and data lovers and we are obsessed with results.</p>
                            <div className="about-quote">
                                <div className="quote-mark"><i className="fas fa-quote-left"></i></div>
                                <p>We do not do cookie-cutter campaigns. Every strategy we build is rooted in your industry, your audience, and your goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-stats">
                <div className="container">
                    <div className="about-stats-grid">
                        <div className="about-stat-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="about-stat-icon"><i className="fas fa-rocket"></i></div>
                            <span className="about-stat-number">2.1B+</span>
                            <span className="about-stat-label">Impressions</span>
                        </div>
                        <div className="about-stat-item" data-aos="fade-up" data-aos-delay="200">
                            <div className="about-stat-icon"><i className="fas fa-check-circle"></i></div>
                            <span className="about-stat-number">5,648</span>
                            <span className="about-stat-label">Projects</span>
                        </div>
                        <div className="about-stat-item" data-aos="fade-up" data-aos-delay="300">
                            <div className="about-stat-icon"><i className="fas fa-bullhorn"></i></div>
                            <span className="about-stat-number">99K+</span>
                            <span className="about-stat-label">Campaigns</span>
                        </div>
                        <div className="about-stat-item" data-aos="fade-up" data-aos-delay="400">
                            <div className="about-stat-icon"><i className="fas fa-smile"></i></div>
                            <span className="about-stat-number">100%</span>
                            <span className="about-stat-label">Satisfaction</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-choose-section">
                <div className="container">
                    <div className="section-header-center" data-aos="fade-up">
                        <div className="section-label">WHY CHOOSE US</div>
                        <h2>What <span className="gradient-text">Sets Us Apart</span></h2>
                    </div>
                    <div className="why-grid">
                        {whyCards.map((c, i) => (
                            <div className="why-card" key={i} data-aos="fade-up" data-aos-delay={100 + i * 100}>
                                <div className="why-card-accent"></div>
                                <div className="why-card-icon"><i className={`fas ${c.icon}`}></i></div>
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="team-section">
                <div className="container">
                    <div className="section-header-center" data-aos="fade-up">
                        <div className="section-label">MEET THE TEAM</div>
                        <h2>The People Behind <span className="gradient-text">The Success</span></h2>
                    </div>
                    <div className="team-grid">
                        {team.map((m, i) => (
                            <div className="team-card" key={i} data-aos="fade-up" data-aos-delay={100 + i * 50}>
                                <div className="team-card-img">
                                    <div className="team-initials">{m.initials}</div>
                                    <div className="team-card-social">
                                        {m.socials.map((s, j) => (<a href="#" key={j}><i className={`fab ${s}`}></i></a>))}
                                    </div>
                                </div>
                                <div className="team-card-info">
                                    <h4>{m.name}</h4>
                                    <p>{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-bg"><div className="cta-blob"></div></div>
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Want To Work With Us?</h2>
                        <p>Join the brands that trust MarketingPark to drive their growth.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn-cta"><span>Get In Touch</span><i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}