require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'https://time-consistent-event-scheduler.vercel.app/'
]

app.use(cors({ origin: allowedOrigins }));

const validate = require("./validate-middleware")
const Event = require("./models")

app.post('/event', validate, async (req, res) => {
    try{
        const { eventName, eventTime } = req.body

        const event = await Event.create({
            eventName, eventTime
        })

        res.status(201).json({
            status: "success",
            event
        })

    } catch (err){
        console.log("Error occurred while creating event")
        console.log(err)
    }
})

app.get('/event', async (req, res) => {
    try{
        const events = await Event.find() 
        res.json(events)
    } catch (err) {
        console.log("Error occurred while getting event")
        console.log(err)
    }
})


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Database connected to successfully")
    } catch (error) {
        console.error("Unsuccessful DB connection")
        console.error(error)
        process.exit(1)
    }
}

const PORT = process.env.PORT || 3500

const startServer = async () => {
    await connectDB()
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT} hehe`)
})}

startServer()


