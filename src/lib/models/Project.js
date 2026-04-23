import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    tag: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    stats: [{
        value: String,
        label: String
    }],
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);