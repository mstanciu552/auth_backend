import express, { Application } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import connectMongo, { MongoStoreFactory } from "connect-mongo";
import passport from "passport";

import auth from "./routes/auth.js";
import oauthRoutes from "./routes/oauth.js";
import { passportConfig } from "./passport.js";

const app: Application = express();
const MongoStore: MongoStoreFactory = connectMongo(session);

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

// Passport config
passportConfig(passport);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", auth);
app.use("/auth", oauthRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
