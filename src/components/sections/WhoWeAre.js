'use client';

export default function WhoWeAre() {
    const features = [
        { icon: 'fa-chart-line', title: 'Proven Process', desc: 'Clear, structured approach to every project' },
        { icon: 'fa-users', title: 'Dedicated Team', desc: 'Specialists tailored to your brand' },
        { icon: 'fa-file-invoice-dollar', title: 'Transparent Reporting', desc: 'Clear, regular performance reports' },
    ];

    return (
        <section className="who-we-are">
            <div className="container">
                <div className="section-label">WHO WE ARE</div>
                <div className="who-grid">
                    <div className="who-content" data-aos="fade-right">
                        <h2>Built By Marketers.<br /><span className="gradient-text">Driven By Results.</span></h2>
                        <p>MarketingPark was founded with one goal in mind: to give businesses of all sizes access to the kind of marketing expertise that actually moves the needle.</p>
                        <p>We are a team of strategists, designers, developers, and data lovers and we are obsessed with results.</p>
                        <div className="who-highlight">
                            <i className="fas fa-quote-left"></i>
                            <p>We do not do cookie-cutter campaigns. Every strategy we build is rooted in your industry, your audience, and your goals because your brand deserves more than a template.</p>
                        </div>
                    </div>
                    <div className="who-visual" data-aos="fade-left">
                        {features.map((feature, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon"><i className={`fas ${feature.icon}`}></i></div>
                                <h4>{feature.title}</h4>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}