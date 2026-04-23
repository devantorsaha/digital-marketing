'use client';

import Link from 'next/link';

export default function ServicesGrid() {
    const services = [
        { icon: 'fa-chart-pie', title: 'Strategy and Analytics', desc: 'We analyze market data and trends to build the right digital strategy for your brand.', link: '/services' },
        { icon: 'fa-share-alt', title: 'Social Media Management', desc: 'Strategic content planning and community engagement to boost brand awareness.', link: '/services' },
        { icon: 'fa-code', title: 'Software and Web Development', desc: 'Fast, secure, and modern websites and custom software solutions.', link: '/services' },
        { icon: 'fa-search', title: 'Advertising and SEO', desc: 'Effective campaigns across Google and social media while strengthening organic reach.', link: '/services' },
        { icon: 'fa-palette', title: 'Brand Development', desc: 'Unique logo designs and comprehensive branding strategies that set you apart.', link: '/services' },
        { icon: 'fa-ad', title: 'PPC Campaign Management', desc: 'Smart budget allocation for maximum ROI on Google Ads and Facebook Ads.', link: '/services' },
        { icon: 'fa-video', title: 'Content Creation', desc: 'High-engagement content including blog posts, videos, and graphics.', link: '/services' },
        { icon: 'fa-pencil-ruler', title: 'UI/UX Design', desc: 'Intuitive, user-centered interfaces that enhance digital experience.', link: '/services' },
    ];

    return (
        <section className="services-section">
            <div className="container">
                <div className="section-header-center" data-aos="fade-up">
                    <div className="section-label">OUR SERVICES</div>
                    <h2>We are Here To <span className="gradient-text">Power Your Growth</span></h2>
                </div>
                <div className="services-grid">
                    {services.map((service, i) => (
                        <div key={i} className="service-card" data-aos="fade-up" data-aos-delay={100 + i * 50}>
                            <div className="service-icon"><i className={`fas ${service.icon}`}></i></div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                            <Link href={service.link} className="service-link">
                                Learn More <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}