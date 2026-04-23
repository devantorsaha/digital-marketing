'use client';

import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-bg-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <div className="container">
                <div className="hero-grid">
                    <div className="hero-content" data-aos="fade-right" data-aos-duration="800">
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            Digital Marketing Agency
                        </div>
                        <h1>The Team That Turns Your Marketing Into <span className="gradient-text">Measurable Growth</span></h1>
                        <p className="hero-subtitle">MarketingPark combines data, design, and strategy to create campaigns that perform. From brand identity to paid ads, we handle the full picture.</p>
                        <div className="hero-actions">
                            <Link href="/contact" className="btn-main">
                                <span>Start Your Project</span>
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                            <Link href="/services" className="btn-ghost">
                                <i className="fas fa-play"></i>
                                <span>Our Services</span>
                            </Link>
                        </div>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="stat-num">2.1B+</span>
                                <span className="stat-info">Impressions</span>
                            </div>
                            <div className="hero-stat">
                                <span className="stat-num">5,648</span>
                                <span className="stat-info">Projects</span>
                            </div>
                            <div className="hero-stat">
                                <span className="stat-num">99K+</span>
                                <span className="stat-info">Campaigns</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
                        <div className="hero-card card-1">
                            <i className="fas fa-chart-line"></i>
                            <span>+340%</span>
                        </div>
                        <div className="hero-card card-2">
                            <i className="fas fa-users"></i>
                            <span>50K+ Users</span>
                        </div>
                        <div className="hero-card card-3">
                            <i className="fas fa-rocket"></i>
                            <span>ROI Max</span>
                        </div>
                        <div className="hero-main-visual">
                            <div className="orbit">
                                <div className="orbit-item"></div>
                                <div className="orbit-item"></div>
                                <div className="orbit-item"></div>
                            </div>
                            <div className="center-icon">
                                <i className="fas fa-chart-pie"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}