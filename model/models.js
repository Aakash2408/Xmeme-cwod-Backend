const mongoose = require('mongoose')
// mongoose.connect("mongodb://127.0.0.1:27017/name", {useNewUrlParser: true, useUnifiedTopology: true});
require('mongoose-type-url')
const autoIncrement = require('mongoose-auto-increment')
// const DB = process.env.NODE_ENV=='production' ? process.env.DB : require('../keys.json').DB
// const connection = mongoose.createConnection(DB, {
//     useNewUrlParser: true
// })
//  mongoose.connect("mongodb://127.0.0.1:27017/name", {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
//     console.log("connected to db")
// })
mongoose.connect("mongodb+srv://aakash2408:sangwan24@cluster0.2fvzl.mongodb.net/xmeme?retryWrites=true&w=majority",{ useNewUrlParser: true }).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})




//   mongoose.connection.on('error', (err) => {
//     console.error(`Mongoose connection error: ${err}`);
//     process.exit(1);
//   });
// try {
//     mongoose.connect( "mongodb+srv://aakash2408:Baapuji@024@cluster0.cd2zn.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, () =>
//     console.log("connected"));    
//     }catch (error) { 
//     console.log(error);    
//     }
var connection= mongoose.connection
autoIncrement.initialize(connection)

const memeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caption : {
        type: String,
        required: true
    },
    url : {
        
        type : mongoose.SchemaTypes.Url,
        required: true
    },
    id : {
        type: Number
    }
})
// const mememaker = mongoose.model("mememaker",memeSchema)

memeSchema.plugin(autoIncrement.plugin, { model: 'Meme', field: 'id' })
module.exports = connection.model('Meme', memeSchema)