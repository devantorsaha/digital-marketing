import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Service from '@/lib/models/Service.js';

export async function GET() {
    try {
        await connectDB();
        const services = await Service.find({}).sort({ displayOrder: 1 });
        return NextResponse.json({ services });
    } catch (error) {
        console.error('GET services error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const service = await Service.create(data);
        return NextResponse.json({ service }, { status: 201 });
    } catch (error) {
        console.error('POST service error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}