'use client';

import Link from 'next/link';

export default function ServiceCard({ icon, title, description, features, href }) {
    return (
        <div className="service-detail-card" data-aos="fade-up">
            <div className="service-detail-icon">
                <i className={`fas ${icon}`}></i>
            </div>
            <div className="service-detail-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <ul className="service-features">
                    {features.map((feature, i) => (
                        <li key={i}><i className="fas fa-check"></i> {feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}