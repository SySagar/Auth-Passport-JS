const mongoose = require('mongoose');
require('dotenv').config()


const connectMongoose = ()=>{

    mongoose
    .connect(process.env.MONGODB_URL)
    .then((e)=>console.log('connected to mongodb'))
    .catch((e)=>console.log(e));

};
const userSchema = new mongoose.Schema({
    name : {type :String ,
        required: true},

    userName: {
              type: String ,
              required: true
              },
    password: String
});

const user_model = mongoose.model('User',userSchema);

module.exports ={user_model,connectMongoose}