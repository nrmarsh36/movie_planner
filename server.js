var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "movie_planner_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


//ROUTES SECTION//

//UI route
//render ui
app.get('/', (req, res) => {
    connection.query('SELECT * FROM movies', (err, data) => {
        res.render('index', { movies: data })
    })
})

//API ROUTES//

//GET
//POST
app.post('/api/movies', (req, res) => {
    const newMovieText = req.body.newMovieText
    //insert into database
    connection.query('INSERT INTO movies (movie) VALUES (?)', [newMovieText], (err, response) => {
        if (err) throw err
    //redirect to home route
    res.status(200).send()
    })
})
//PUT
//DELETE


app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  