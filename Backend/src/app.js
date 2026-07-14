import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ApiError } from './utils/ApiErrors.js';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))

// middleware

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import adminRouter from "./routes/admin.routes.js"
import studentRouter from "./routes/student.routes.js"
import teacherRouter from "./routes/teacher.routes.js"


app.use("/admin", adminRouter)
app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});
export {app}