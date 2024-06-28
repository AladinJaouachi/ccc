console.clear();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import todoroutes from "./Routes/todoRoutes.js";

const app = express();

// config
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//

const Port = process.env.Port;
const URL = process.env.URLDB;

// connection db
mongoose
  .connect(URL)
  .then(() => console.log("database connected successfully"))
  .catch(() => console.log("failed connection db"));
//

// Routes
app.use("/api", todoroutes);
//

// server
app.listen(Port, (err) => {
  if (err) throw err;
  console.log(`server is running on http://localhost:${Port}`);
});
//
