import express from 'express';
import { nanoid } from 'nanoid';
import multer from 'multer';
import config from '../config.js';
import * as path from 'path';
import Artist from '../models/Artist.js';

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,config.uploadPath);
    },
    filename:(req,file,cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

const router = express.Router();

router.get('/',async (req,res) => {
    try{
        const artist = await Artist.find();
        res.send(artist);
    }catch(e){
        res.sendStatus(500);
    }
})

router.post('/', upload.single('image'),async(req,res) => {
    const body = {...req.body};
    if(req.file){
        body.image = req.file.filename;
    }
    const artist = new Artist(body);
    try{
        await artist.save();
        res.send(artist);
    }catch(e){
        res.sendStatus(500);
    }
})

export default router;