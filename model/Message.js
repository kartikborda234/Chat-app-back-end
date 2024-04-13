const mongoose = require('mongoose');

const msgSchema =new mongoose.Schema({
    messageContent: {
        type: String,
        required: true,
    },
    msgBy: {
        type: String,
        required: true,
    },
    msgTo: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Message',msgSchema)