const express = require("express");

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs' );

// listen for request 
app.listen(3000);


//middleware and static file
app.use(express.static('public'));

app.use((req, res, next) => { 
    console.log('new request made: ');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('In the next MiddleWare');
    next();
});

app.get('/', (req, res)=> {
    //res.send('<p> Home Page</p>');
    //res.sendFile('./views/index.html',{root:__dirname});
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Testing out Middleware in Node Js'},
        {title: 'Using Middleware', snippet: 'Experiment with Middleware'},
        {title: 'New Message', snippet: 'Why are you still in school? '},
    ];
    res.render('index', {title: "Home", blogs});
});

app.get('/about', (req, res)=> {
    //res.send('<p> About Page</p>');
    //res.sendFile('./views/about.html',{root:__dirname});
    res.render('about',  {title: "About"})
});
 
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