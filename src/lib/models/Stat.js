import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    category: { type: String },
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Stat || mongoose.model('Stat', statSchema);