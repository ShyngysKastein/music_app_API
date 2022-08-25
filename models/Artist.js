import mongoose from "mongoose";

const ArtistScheme = new mongoose.Schema({
    artistName:{
        type:String,
        required:true
    },
    image:String,
    information:String
})

const Artist = mongoose.model('Artist',ArtistScheme);

export default Artist;