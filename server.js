import express from "express";
import artist from "./routes/artist.js";
import mongoose from "mongoose";
import cors from 'cors';
import album from './routes/album.js';
import track from './routes/track.js';


const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use('/artists', artist);
app.use('/albums',album);
app.use('/tracks',track);


const run = () => {
    mongoose.connect('mongodb://localhost/lastFm',{useNewUrlParser:true});

    app.listen(PORT,() => {
        console.log(`Server started at http://localhost:${PORT} port`);
    })

    process.on("exit",() => {
        mongoose.disconnect();
    })
}

run();