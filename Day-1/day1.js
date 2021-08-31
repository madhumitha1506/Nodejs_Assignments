const express=require('express');

const app = express();
app.use(express.json());

app.get('/get1',(req,res)=>{
    res.send("Get data1");
})
app.get('/get2',(req,res)=>{
    res.send("Get data2");
})
app.get('/get3',(req,res)=>{
    res.send("Get data3");
})

app.post('/post1',(req,res)=>{
    console.log(req.body);
    res.send({message:"Data posted"});
})


app.listen(8000,()=>{
    console.log('Server running');
}) 

