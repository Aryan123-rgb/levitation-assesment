import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';

const PORT = 8000
const app = express();
app.use(cors({
    credentials:true,
}));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',router())

const server = http.createServer(app);

const MONGO_URL = 'mongodb://127.0.0.1:27017/typescipt-1'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

server.listen(PORT,()=>console.log('Server started on PORT ' + PORT))
