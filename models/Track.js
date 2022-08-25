import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const TrackScheme = new Scheme({
    trackName:{
        type:String,
        required:true
    },
    albumName:{
        type:Scheme.Types.ObjectId,
        ref:"Album",
        required:true
    },
    duration:{
        type:String,
        required:true
    }
})

const Track = mongoose.model('Track',TrackScheme);

export default Track;