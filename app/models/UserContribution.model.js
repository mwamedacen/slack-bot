import mongoose from 'mongoose';

const userContributionSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model('UserContribution', userContributionSchema);
