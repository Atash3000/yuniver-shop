
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')
app.use(express.static(path.resolve(__dirname, './front-end/build')))

process.on('uncaughtException',err=>{
  console.log('UncaughtException!!! SHUTTING DOWN💥💥💥....')
   console.log(err.name,err.message)
    process.exit(1);
});


dotenv.config({path:'./config.env'});
const app = require('./app');


const DB = process.env.DATABASE

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true
}).then(()=>console.log('Connected to Mongo DB'));

process.on('unhandledRejection',err=>console.log(err.name,err.message));


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>console.log('Server has started at port',PORT));


process.on('unhandledRejection',err=>{
  console.log('UNHANDLED REJECTION!!! SHUTTING DOWN💥💥💥....')
   console.log(err.name,err.message)
  server.close(()=>{
  process.exit(1);
  });
});

