import dotenv from "dotenv"
import express from "express"
import jwt from "jsonwebtoken"
import { authRoutes } from "./routes/jwt.routes.js";

dotenv.config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(authRoutes)
app.get('/', (req, res) => {
    res.send("Hello");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>  {
    console.log(`Server is Listening at ${PORT} `);
})

