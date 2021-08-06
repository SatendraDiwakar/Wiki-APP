const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true })

const wikiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please mention title']
    },
    content: String
});
const WikiArticles = mongoose.model("Wiki", wikiSchema);

const wikiOne = new WikiArticles({
    title: "API",
    content: "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
})

const wikiTwo = new WikiArticles({
    title: "Bootstrap",
    content: "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
})


const wikiThree = new WikiArticles({
    title: "DOM",
    content: "The Document Object Model is like an API for interacting with our HTML"
})

// app.get('/', (req, res) => {
//     res.send("Hello from REST API");
// });

// app.post('/', (req, res) => {
//     res.send("Post on route \" / \" ");
// })

// WikiArticles.insertMany([wikiOne, wikiTwo, wikiThree], err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Success');
//         mongoose.connection.close();
//     }
// });


// app.listen(3000, () => {
//     console.log('app listen on port 3000');
// })