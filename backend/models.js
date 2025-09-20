const mongoose = require("mongoose")

const eventSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
            trim: true
        }, 
        eventTime: {
            type: Date,
            required: [true, 'event time is required']
        }
    }, {
        timestamps: true
    }
)

const model = mongoose.model('Event', eventSchema)
module.exports = model