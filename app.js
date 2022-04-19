const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoute = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
require('dotenv').config()
var port = process.env.PORT || 4000;
// express app
const app = express();

//CONNECT TO MONGO DB

const dbURI = process.env.DB_URL
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then((result) => app.listen(3000))
    .then((result) => app.listen(port, function() {
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
app.use(express.json());
app.use(cookieParser());


app.get('*', checkUser);
app.get('/', (req, res) => {
    //res.send('<p> Home Page</p>');
    //res.sendFile('./views/index.html',{root:__dirname});
    res.redirect('/blogs');
});
app.get('')

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
});

//blog routes
app.use(authRoute)
app.use('/blogs', blogRoutes);
//app.get('/blogs/create')
//app.use(authRoute)
// 404 page
app.use((req, res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname});
    res.status(404).render('404', { title: "Error 404" });
});
