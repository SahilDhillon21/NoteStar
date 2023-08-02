import "dotenv/config";
import express from "express";
// app is basically our server
const app = express();

// React uses port 3000 by default so setting this port to 5000 allows us to run both simultaneously.
// Also we need to mention port for hosting

// Setting an endpoint for an http get request
app.get("/", (req, res) => {
    res.send("-> First endpoint")
});

export default app;