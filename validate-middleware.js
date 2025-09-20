const { isValid, parseISO  } = require("date-fns")

export const validate = (req, res, next) => {
    const { eventTime } = req.body

    if (!eventTime){
        return res.status(400).json({error: "Event time is required" })
    }

    if (typeof eventTime !== "string" || !eventTime.endsWith("Z")){
        return res.status(400).json({
            error: "The eventTime must be a UTC ISO string (ends with Z)"
        })
    }

    const parsedDate = parseISO(eventTime)
    if (!isValid(parsedDate)){
        return res.status(400).json({
            error: "Invalid date time format. Please use ISO 8601 format such as 2025-09-20T10:25:00Z"
        })
    }

    next()
}

