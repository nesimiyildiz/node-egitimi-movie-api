const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect("mongodb+srv://tayfun:511683@movieapp.bvazi.mongodb.net/movie-api?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
    mongoose.connection.on('open',()=>{
        console.log("Mongodb connected")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("Mongodb connected : ",err)
    })
    mongoose.Promise=global.Promise;

}
