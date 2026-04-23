import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Testimonial from '@/lib/models/Testimonial.js';

export async function GET() {
    try {
        await connectDB();
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ testimonials });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const testimonial = await Testimonial.create(data);
        return NextResponse.json({ testimonial }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}