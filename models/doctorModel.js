const mongoose =require('mongoose')

const doctorSchema = new mongoose.Schema({
    
        userId: {
          type: String,
        },
    
    firstName:{
        type:String,
        required:[true,"first name is requires"],
    },
    lastname:{
        type:String,
        required:[true,"last name is required"],
    },
    phone:{
        type:String,
        required:[true,"phone no is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,"address is required"],
    },
    specialization:{
        type:String,
        required:[true,"specialization required"],
    },
    experience:{
        type:String,
        required:[true,"experience is required"],
    },
    feePerCunsaltation:{
        type:String,
        required:[true,"fee is required"],
    },

    status:{
        type:String,
        default:'pending'
    },
    timings:{
        type:Object,
        required:[true,"working time required"],
    },
    ratings: [
        {
          userId: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
        },
      ],
    
},
{timestamps:true}

);

const doctorModel = mongoose.model('doctors',doctorSchema)// collection name and pass doctorschema
module.exports =doctorModel;