// ---------------------------------------------------------------------------
// Weather Data Model

import mongoose from 'mongoose';
const schema = mongoose.Schema;

const weatherSchema = new schema(
    {
        sensor: {
            type: String,
            required: true,
        },
        temperatur: {
            type: Number,
            required: true,
        },
        humidity: {
            type: Number,
            required: true,
        },
        pressure: {
            type: Number,
            required: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
);

const weatherModel = mongoose.model('Weather_Messurement', weatherSchema);
export { weatherModel };
