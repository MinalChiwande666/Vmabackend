import express from 'express'
import gallery from '../Model/Gallery.js'

const routergal = express.Router()


routergal.post('/galleries',async(req,res)=>{
    const gal = new gallery({
        gallery_img:req.body.gallery_img
    })
    const savegal = await gal.save()
    if(savegal)
    {
        res.status(200).send(savegal)
    }
})

export default routergal;