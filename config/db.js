const mongoose= require ('mongoose')


const connectDB = async()=>{ // function having promise to check the database connectivity
    
    try{
     await mongoose.connect(process.env.MONGO_URL)// by await call url in env to connect mongo 
     console.log(`Mongodb connected ${mongoose.connection.host}`) // to get connection message 
    } catch(error){
        console.log(`Mongo db Server having issue ${error}`)
    }

};
module.exports = connectDB;