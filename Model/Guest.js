import mongoose from "mongoose";

const Guestshema = mongoose.Schema({
    Guesttype:{
        type:String
    },
    type_id:{
        type:Number
    },
    name:{
        type:String
    },
    mobile:{
        type:String
    },
    email:{
        type:String
    },
    birth:{
        type:String
    },
    address:{
        type:String
    },
    business_name:{
     type:String
    },
    gst_number:{
        type:String
    },
    about_company:{
        type:String
    },
    course_pursuing:{
        type:String
    },
    Institute_name:{
        type:String
    },
    events:{
        type:Array
    }

})
const guestreg = mongoose.model('guestregistration',Guestshema);
export default memberreg;