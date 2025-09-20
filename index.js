require("dotenv").config()

const express = require("express")

const app = express()
app.use(express.json())

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

app.get('/event', async () => {
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
        process.exit(1)
    }
}

const PORT = process.env.PORT || 3000

await connectDB()
app.listen(3500, () => {
    console.log("Server running on port 3500, hehe")

})
