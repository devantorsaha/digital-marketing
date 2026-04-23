'use client';

import Link from 'next/link';

export default function CTASection({ title, subtitle, primaryBtn, secondaryBtn }) {
    return (
        <section className="cta-section">
            <div className="cta-bg">
                <div className="cta-blob"></div>
            </div>
            <div className="container">
                <div className="cta-content" data-aos="zoom-in">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    <div className="cta-actions">
                        <Link href={primaryBtn.link} className="btn-cta">
                            <span>{primaryBtn.text}</span>
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                        {secondaryBtn && (
                            <Link href={secondaryBtn.link} className="btn-cta-outline">
                                {secondaryBtn.text}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}