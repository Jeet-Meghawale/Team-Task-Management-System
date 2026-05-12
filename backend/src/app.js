import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running"
  })
})

export default app;