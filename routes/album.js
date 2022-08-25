import express from "express";
import Album from '../models/Album.js';
import { nanoid } from 'nanoid';
import multer from 'multer';
import config from '../config.js';
import * as path from 'path';

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

router.get('/', async(req,res) => {
    if(req.query.artist){
        const artist = await Album.findOne({artistName:req.query.artist});
        return res.send(artist);
    }
    try{
        const album  = await Album.find().populate('artistName');
        res.send(album);
        if(!album){
            res.sendStatus(404);
        }
    }catch(e){
        res.sendStatus(500);
    }
})

router.post('/',upload.single('coverImage'),async(req,res) => {
    const body = {...req.body};
    if(req.file){
        body.image = req.file.filename;
    }
    let album = new Album(body);
    try{
        await album.save();
        res.send(album);
    }catch(e){
        res.sendStatus(500);
    }
})

router.get('/:id',async(req,res) => {
    try{
        const album = await Album.findById(req.params.id);
        if(!album){
            return res.sendStatus(404);
        }
        res.send(album);
    }catch(e){
        res.sendStatus(500);
    }
})

export default router;