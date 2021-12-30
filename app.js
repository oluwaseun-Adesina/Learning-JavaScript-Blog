const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogroutes');

// express app
const app = express();

//CONNECT TO MONGO DB
const dbURI = 'mongodb+srv://oluwaseun:Pass_Word_123@cluster0.3bxcv.mongodb.net/node-js-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then((result) => app.listen(3000))
    .then((result) => app.listen(process.env.PORT || 3000, function() {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      }))
    .catch((err) => console.log(err))
// register view engine
app.set('view engine', 'ejs');

//routes
//middleware and static file
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    //res.send('<p> Home Page</p>');
    //res.sendFile('./views/index.html',{root:__dirname});
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
});

//blog routes
app.use('/blogs', blogRoutes);
// 404 page
app.use((req, res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname});
    res.status(404).render('404', { title: "Error 404" });
});