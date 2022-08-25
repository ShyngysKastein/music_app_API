import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const AlbumScheme = new Scheme({
    albumName:{
        type:String,
        required:true
    },
    artistName:{
        type:Scheme.Types.ObjectId,
        ref:"Artist",
        required:true
    },
    yearOfIssue:{
        type:Number,
        required:true
    },
    coverImage:String
})

const Album = mongoose.model('Album',AlbumScheme);

export default Album;