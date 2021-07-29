const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose= require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send("Hello from REST API");
});

app.post('/',(req,res)=>{
    res.send("Post on route \" / \" ");
})



app.listen(3000,()=>{
    console.log('app listen on port 3000');
})