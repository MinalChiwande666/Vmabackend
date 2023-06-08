import mongoose from "mongoose";

const galleryschema = mongoose.Schema({
    gallery_img:String
})

const gallery = mongoose.model('gallery',galleryschema)
export default gallery;