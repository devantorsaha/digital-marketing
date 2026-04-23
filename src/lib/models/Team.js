import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    initials: { type: String, required: true, maxlength: 2 },
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    socialLinks: {
        linkedin: String,
        twitter: String,
        github: String,
        dribbble: String
    },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Team || mongoose.model('Team', teamSchema);