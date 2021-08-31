// Importing Third party packages

const express = require('express');
const mongoose = require('mongoose');

// Creating object for express server

const app = express();

// Middleware to convert metadata to json format

app.use(express.json());

// Connecting MongoDatabase using mongoose

mongoose.connect("mongodb://localhost:27017/detail",{useNewUrlParser:true},()=>
{
    console.log("Mongo server connected");
});

// creating schema for database

const studSchema = new mongoose.Schema({
    name:String,
    regno:String
})

// Creating model for database

const studModel = new mongoose.model('students',studSchema);


// Getting All Data

app.get('/getdata',async (req,res)=>{

    let data=await studModel.find();
    console.log(data);
    res.send("Hello");
})

// Get Single data Based on Regno

app.get('/singledata/regno/:regno',async (req,res)=>{

    let regno = req.params.regno;
    let data =await studModel.find({regno:regno});
    res.send(data);
})


// Create New Data

app.post('/createdata',(req,res)=>{
    let stud = req.body;
    let studObj =new studModel(stud);
    studObj.save((err,data)=>{
        if(err==null){
            res.send({message:"Student created"});
        }
    })
})


// Delete record using Id parameter

app.delete('/deletedata/:id',(req,res)=>{
    let id = req.params.id;
    studModel.deleteOne({_id:id},(err,data)=>{
        if(err==null)
        {
            res.send({message:"Student Deleted"});
        }
    })
})

// Getting Data using Id

app.get('/studdata/:id',async (req,res)=>{
    let id=req.params.id;
    let stud = await studModel.findOne({_id:id});
    res.send(stud);
})

// Update Data Using Id 

app.put('/update/:id',(req,res)=>{
    let id = req.params.id;
    let data=req.body;

    studModel.updateOne({_id:id},data,(err,data)=>{
        if(err===null){
            res.send({message:"Updated"});
        }
    })
})


// Creating server

app.listen(8000,()=>
{
    console.log("Server Running");
})
