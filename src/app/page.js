'use client';

import { useEffect } from 'react';
import { HeroSection, PartnersBar, WhoWeAre, ProcessSection, ServicesGrid, StackSection, ApproachSection, CTASection, Navbar, Footer } from '@/components';

export default function Home() {
    useEffect(() => {
        const initAOS = async () => {
            const AOS = (await import('aos')).default;
            await import('aos/dist/aos.css');
            AOS.init({ duration: 800, once: true });
        };
        initAOS();
    }, []);

    return (
        <>
            <Navbar />
            <HeroSection />
            <PartnersBar />
            <WhoWeAre />
            <ProcessSection />
            <ServicesGrid />
            <StackSection />
            <ApproachSection />
            <CTASection 
                title="Ready To Grow Your Business?"
                subtitle="Let us start a conversation about your marketing goals."
                primaryBtn={{ text: 'Get In Touch', link: '/contact' }}
                secondaryBtn={{ text: 'View Our Work', link: '/portfolio' }}
            />
            <Footer />
        </>
    );
}