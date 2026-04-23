'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => pathname === path ? 'nav-link active' : 'nav-link';

    return (
        <nav className={`floating-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner">
                <Link href="/" className="nav-logo">
                    <img src="/logo.png" alt="MarketingPark" />
                </Link>
                <div className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
                    <Link href="/" className={isActive('/')}>Home</Link>
                    <Link href="/services" className={isActive('/services')}>Services</Link>
                    <Link href="/portfolio" className={isActive('/portfolio')}>Portfolio</Link>
                    <Link href="/about" className={isActive('/about')}>About</Link>
                    <Link href="/contact" className="nav-cta">Let&apos;s Talk</Link>
                </div>
                <button className="nav-toggle" id="navToggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}