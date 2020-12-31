import express, { Application } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import auth from "./routes/auth.js";

const app: Application = express();

// Set up dotenv
dotenv.config();

// Set up database
mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db: mongoose.Connection = mongoose.connection;
db.on("error", (err): void => console.error(err));
db.once("open", (): void => console.log("Database running"));

// Middleware
app.use(express.json());

// Routes
app.use("/", auth);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
