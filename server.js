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


// WikiArticles.insertMany([wikiOne, wikiTwo, wikiThree], err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Success');
//         mongoose.connection.close();
//     }
// });


// chained route handling in docs
// if we have different http request for same route
// then we can use this chained route handling
app.route('/articles')
    .get((req, res) => {
        // getting all articles
        WikiArticles.find((err, articles) => {
            if (err) {
                res.send(err);
            } else {
                res.send(
                    // articles
                    `<pre>${articles}</pre>`
                );
            }
        })
    })
    .post((req, res) => {
        // posting new article
        const newArticle = new WikiArticles({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(err => {
            if (err) {
                res.send(err);
            } else {
                res.send('Successfully posted');
            }
        });
    })
    .delete((req, res) => {
        // deleting all articles
        WikiArticles.delete(err => {
            if (err) {
                res.send(err);
            } else {
                res.send('Successfully deleted all articles');
            }
        });
    });

app.listen(3000, () => {
    console.log('app listen on port 3000');
})