'use client';

export default function ProcessSection() {
    const steps = [
        { number: '01', title: 'Analyse', subtitle: 'Data-Driven Insights', desc: 'We dig into your market, audience, and competitors to build a foundation that actually works.', icon: 'fa-search' },
        { number: '02', title: 'Plan', subtitle: 'Smart Strategy', desc: 'Every campaign starts with a clear roadmap tailored to your brand and business goals.', icon: 'fa-route' },
        { number: '03', title: 'Grow', subtitle: 'Measurable Growth', desc: 'We track, optimize, and scale so your results keep getting better over time.', icon: 'fa-chart-line' },
    ];

    return (
        <section className="process-section">
            <div className="container">
                <div className="section-header-center" data-aos="fade-up">
                    <div className="section-label">OUR PROCESS</div>
                    <h2>We Turn Your Marketing Goals Into <span className="gradient-text">Measurable Growth</span></h2>
                </div>
                <div className="flowchart">
                    {steps.map((step, i) => (
                        <div key={i} className="flow-wrapper">
                            <div className="flow-step" data-aos="fade-up" data-aos-delay={100 + i * 150}>
                                <div className="flow-icon">
                                    <i className={`fas ${step.icon}`}></i>
                                </div>
                                <div className="flow-content">
                                    <span className="flow-number">{step.number}</span>
                                    <h3>{step.title}</h3>
                                    <p className="flow-subtitle">{step.subtitle}</p>
                                    <p className="flow-desc">{step.desc}</p>
                                </div>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="flow-connector">
                                    <div className="flow-line"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}