const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// express app
const app = express();

//CONNECT TO MONGO DB
const dbURI = 'mongodb+srv://oluwaseun:Pass_Word_123@cluster0.3bxcv.mongodb.net/node-js-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs' );

//routes

app.use(morgan('dev'));

//middleware and static file
app.use(express.static('public')); 


app.get('/', (req, res)=> {
    //res.send('<p> Home Page</p>');
    //res.sendFile('./views/index.html',{root:__dirname});
   res.redirect('/blogs');
});

app.get('/about', (req, res)=> {
    //res.send('<p> About Page</p>');
    //res.sendFile('./views/about.html',{root:__dirname});
    res.render('about',  {title: "About"})
});
 
//blog 
app.get('/blogs', (req, res) =>{
    Blog.find().sort({ createdAt: -1})
        .then((result) =>{
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) =>{
            console.log(err);
        })
})


app.get('/blogs/create', (req, res) => {
    res.render('create',  {title: "Create a New Blog"});
})

// //redirect
// app.get("/about-us", (req, res) => {
//     res.redirect('/about');
// });

// 404 page
app.use((req, res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname});
    res.status(404).render('404',  {title: "Error 404"});
});