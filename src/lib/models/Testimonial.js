import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String },
    quote: { type: String, required: true },
    avatar: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);