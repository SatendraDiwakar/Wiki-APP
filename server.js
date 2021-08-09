const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.set('views', './views');
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


app.get('/',(req,res)=>{
    res.render('list', {listTitle: 'hello'});
});
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

/*******************Request targeting a specific article*******************/

app.route('/articles/:articleTitle')
.get((req,res)=>{

    // to use route parameters
    // req.params.articleTitle = 'React';
    // to get data which has space in url we need to replace with %20
    // ex - localhost:3000/articles/Context%20API
    // to know more https://www.w3schools.com/tags/ref_urlencode.ASP

    WikiArticles.findOne({title: req.params.articleTitle},(err,foundArticle)=>{
        if (err) {
            res.send("No Articles match");
        } else {
            res.send(foundArticle);
        }
    })
})
.put((req,res)=>{
    // updating whole document 
    // and if no value is there(req.body) then replaced with null
    WikiArticles.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        err=>{
            if (err) {
                res.send(`Cannot change ${req.params.articleTitle}`)
            } else {
                res.send(`Successfully change ${req.params.articleTitle}`)
            }
        }
    )
})
.patch((req,res)=>{
    // updating a property of a document
    // also req.body sends a object what and which fields needed to update
    WikiArticles.updateOne(
        {title:req.params.articleTitle},
        {$set: req.body},
        err=>{
            if (err) {
                res.send(`Cannot change ${req.params.articleTitle}`)
            } else {
                res.send(`Successfully change ${req.params.articleTitle}`)
            }
        }
    )
})
.delete((req,res)=>{
    WikiArticles.deleteOne(
        {title:req.params.articleTitle},
        err=>{
            if (err) {
                res.send(`Cannot delete ${req.params.articleTitle}`)
            } else {
                res.send(`Successfully deleted ${req.params.articleTitle}`)
            }
        }
    )
});

app.listen(3000, () => {
    console.log('app listen on port 3000');
})