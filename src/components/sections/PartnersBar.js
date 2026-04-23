'use client';

export default function PartnersBar() {
    const partners = [
        { icon: 'fa-google', name: 'Google' },
        { icon: 'fa-facebook', name: 'Facebook' },
        { icon: 'fa-hubspot', name: 'HubSpot' },
        { icon: 'fa-wordpress', name: 'WordPress' },
        { icon: 'fa-figma', name: 'Figma' },
        { icon: 'fa-shopify', name: 'Shopify' },
    ];

    return (
        <section className="partners">
            <div className="container">
                <p className="partners-label">Trusted by leading brands</p>
                <div className="partners-track">
                    {partners.map((partner, i) => (
                        <div key={i} className="partner-logo" title={partner.name}>
                            <i className={`fab ${partner.icon}`}></i>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}