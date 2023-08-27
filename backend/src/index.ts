import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import router from "./router";

const PORT = 8000;
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router());

const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://srivastavaaryanalc76:L2lxZIEj7Z16ppXV@cluster0.3gdjlph.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

server.listen(PORT, () => console.log("Server started on PORT " + PORT));
