const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    blacklistedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Set TTL index to expire documents after 24 hours (86400 seconds)
blacklistTokenSchema.index({ blacklistedAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);