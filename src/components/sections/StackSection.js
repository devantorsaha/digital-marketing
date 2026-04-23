'use client';

export default function StackSection() {
    const stacks = [
        { icon: 'fa-bullhorn', title: 'Advertising and Analytics', tools: 'Google Ads, Meta, Analytics, SEMrush, Hotjar' },
        { icon: 'fa-paint-brush', title: 'Design and Development', tools: 'Figma, Canva, WordPress' },
        { icon: 'fa-handshake', title: 'CRM and Communication', tools: 'HubSpot, Mailchimp' },
    ];

    return (
        <section className="stack-section">
            <div className="container">
                <div className="stack-grid">
                    <div className="stack-content" data-aos="fade-right">
                        <div className="section-label light">TECH STACK</div>
                        <h2>The Stack That <span className="gradient-text-light">Drives Results</span></h2>
                        <p>Behind every successful campaign is the right technology. We combine the most powerful platforms in the industry to give your brand a real edge.</p>
                    </div>
                    <div className="stack-cards" data-aos="fade-left">
                        {stacks.map((stack, i) => (
                            <div key={i} className="stack-card">
                                <div className="stack-icon"><i className={`fas ${stack.icon}`}></i></div>
                                <div>
                                    <h4>{stack.title}</h4>
                                    <div className="stack-tools">{stack.tools}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}