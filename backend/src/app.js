import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import errorMiddleware from "./middlewares/error.middleware.js"
import routes from "./routes/index.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())


app.use(errorMiddleware)
app.use("/api/v1", routes) // Prefix all routes with /api/v1

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running"
  })
})

export default app;