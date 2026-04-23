'use client';

import Link from 'next/link';

export default function PageHero({ label, title, subtitle }) {
    return (
        <header className="page-hero">
            <div className="hero-bg-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            <div className="container">
                <div className="page-hero-content" data-aos="fade-up">
                    <div className="section-label">{label}</div>
                    <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
                    <p>{subtitle}</p>
                </div>
            </div>
        </header>
    );
}