import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Service from '@/lib/models/Service.js';
import Project from '@/lib/models/Project.js';
import Team from '@/lib/models/Team.js';
import Testimonial from '@/lib/models/Testimonial.js';
import Stat from '@/lib/models/Stat.js';
import Admin from '@/lib/models/Admin.js';

const initialServices = [
    { icon: 'fa-chart-pie', title: 'Strategy and Analytics', description: 'We analyze market data and trends to build the right digital strategy for your brand.', features: ['Market Research', 'Competitor Benchmarking', 'Performance Analytics', 'Growth Strategy'], displayOrder: 1 },
    { icon: 'fa-share-alt', title: 'Social Media Management', description: 'Strategic content planning and community engagement to boost brand awareness.', features: ['Content Strategy', 'Community Management', 'Social Analytics', 'Influencer Marketing'], displayOrder: 2 },
    { icon: 'fa-code', title: 'Software and Web Development', description: 'Fast, secure, and modern websites and custom software solutions.', features: ['Custom Web Development', 'WordPress and CMS', 'E-commerce Solutions', 'API Integration'], displayOrder: 3 },
    { icon: 'fa-search', title: 'Advertising and SEO', description: 'Effective campaigns across Google and social media while strengthening organic reach.', features: ['Google Ads Campaigns', 'Social Media Advertising', 'Technical SEO', 'Content SEO'], displayOrder: 4 },
    { icon: 'fa-palette', title: 'Brand Development', description: 'Unique logo designs and comprehensive branding strategies that set you apart.', features: ['Logo Design', 'Brand Identity', 'Brand Guidelines', 'Brand Strategy'], displayOrder: 5 },
    { icon: 'fa-ad', title: 'PPC Campaign Management', description: 'Smart budget allocation for maximum ROI on Google Ads and Facebook Ads.', features: ['Campaign Strategy', 'Budget Optimization', 'A/B Testing', 'ROI Reporting'], displayOrder: 6 },
    { icon: 'fa-video', title: 'Content Creation', description: 'High-engagement content including blog posts, videos, and graphics.', features: ['Blog and Articles', 'Video Production', 'Graphic Design', 'Copywriting'], displayOrder: 7 },
    { icon: 'fa-pencil-ruler', title: 'UI/UX Design', description: 'Intuitive, user-centered interfaces that enhance digital experience.', features: ['User Research', 'Wireframing', 'UI Design', 'Prototyping'], displayOrder: 8 },
];

const initialProjects = [
    { icon: 'fa-store', tag: 'E-Commerce', title: 'RetailMax Growth Campaign', description: 'Increased online sales by 340% through integrated SEO, PPC, and social media strategy.', stats: [{ value: '340%', label: 'Sales Increase' }, { value: '6 Mo', label: 'Duration' }], displayOrder: 1 },
    { icon: 'fa-utensils', tag: 'Restaurant', title: 'Chef Table Brand Launch', description: 'Complete brand identity and digital presence launch including website and social media.', stats: [{ value: '100%', label: 'Brand Recognition' }, { value: '3 Mo', label: 'Launch Time' }], displayOrder: 2 },
    { icon: 'fa-building', tag: 'Real Estate', title: 'Urban Living Lead Gen', description: 'Generated 500+ qualified leads monthly through targeted Facebook Ads.', stats: [{ value: '500+', label: 'Leads/Month' }, { value: '-65%', label: 'Cost Per Lead' }], displayOrder: 3 },
    { icon: 'fa-heartbeat', tag: 'Healthcare', title: 'MediCare Patient Acquisition', description: 'Reduced cost-per-lead by 65% while increasing patient bookings.', stats: [{ value: '65%', label: 'CPL Reduction' }, { value: '2x', label: 'Bookings' }], displayOrder: 4 },
    { icon: 'fa-graduation-cap', tag: 'Education', title: 'LearnTech Online Platform', description: 'Built and marketed a learning platform that reached 50,000+ students.', stats: [{ value: '50K+', label: 'Students' }, { value: '12 Mo', label: 'Timeframe' }], displayOrder: 5 },
    { icon: 'fa-spa', tag: 'Beauty', title: 'GlowBeauty Social Strategy', description: 'Grew Instagram following from 2K to 150K with engagement rates 3x average.', stats: [{ value: '150K', label: 'Followers' }, { value: '3x', label: 'Engagement' }], displayOrder: 6 },
];

const initialTeam = [
    { initials: 'JD', name: 'John Doe', role: 'CEO and Founder', displayOrder: 1, socialLinks: { linkedin: '#', twitter: '#' } },
    { initials: 'JS', name: 'Jane Smith', role: 'Marketing Director', displayOrder: 2, socialLinks: { linkedin: '#', twitter: '#' } },
    { initials: 'MW', name: 'Mike Wilson', role: 'Lead Developer', displayOrder: 3, socialLinks: { linkedin: '#', github: '#' } },
    { initials: 'SJ', name: 'Sarah Johnson', role: 'Creative Director', displayOrder: 4, socialLinks: { linkedin: '#', dribbble: '#' } },
];

const initialStats = [
    { label: '2.1B+', value: '2.1B+', category: 'Impressions', displayOrder: 1 },
    { label: '5,648', value: '5,648', category: 'Projects', displayOrder: 2 },
    { label: '99K+', value: '99K+', category: 'Campaigns', displayOrder: 3 },
    { label: '100%', value: '100%', category: 'Satisfaction', displayOrder: 4 },
];

const initialTestimonials = [
    { name: 'David Chen', role: 'CEO', company: 'RetailMax', quote: 'MarketingPark transformed our online presence. Our sales increased by 340% in just 6 months!' },
    { name: 'Emily Roberts', role: 'Marketing Director', company: 'Urban Living', quote: 'The best investment we made. Our lead generation doubled while costs dropped by 65%.' },
];

export async function POST() {
    try {
        await connectDB();
        
        const results = { admin: false, services: false, projects: false, team: false, stats: false, testimonials: false };
        
        const adminExists = await Admin.findOne({ email: 'admin@marketingpark.com' });
        if (!adminExists) {
            await Admin.create({
                email: 'admin@marketingpark.com',
                password: 'admin123',
                name: 'Admin'
            });
            results.admin = true;
        }
        
        const serviceCount = await Service.countDocuments();
        if (serviceCount === 0) {
            await Service.insertMany(initialServices);
            results.services = true;
        }
        
        const projectCount = await Project.countDocuments();
        if (projectCount === 0) {
            await Project.insertMany(initialProjects);
            results.projects = true;
        }
        
        const teamCount = await Team.countDocuments();
        if (teamCount === 0) {
            await Team.insertMany(initialTeam);
            results.team = true;
        }
        
        const statCount = await Stat.countDocuments();
        if (statCount === 0) {
            await Stat.insertMany(initialStats);
            results.stats = true;
        }
        
        const testimonialCount = await Testimonial.countDocuments();
        if (testimonialCount === 0) {
            await Testimonial.insertMany(initialTestimonials);
            results.testimonials = true;
        }
        
        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        
        return NextResponse.json({
            services: await Service.countDocuments(),
            projects: await Project.countDocuments(),
            team: await Team.countDocuments(),
            stats: await Stat.countDocuments(),
            testimonials: await Testimonial.countDocuments(),
            admin: await Admin.countDocuments()
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get counts' }, { status: 500 });
    }
}