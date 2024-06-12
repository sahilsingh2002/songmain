const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const clientID = process.env.CLIENT_ID;

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // or '*' to allow all origins
    optionsSuccessStatus: 200,
    credentials:true
}));

app.use(express.json());


const port = 8000;
app.get('/message',(req,res)=>{
    res.send({message:"server started at" + port});
})
app.use('/',authRoutes);
app.listen(port,()=>{
    console.log("app running at ",port);
})
