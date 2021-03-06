const express = require("express")
const cors = require('cors');

const app = express()

const queries = require('./queries')

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sport web app\n")
});

// create table
queries.createTableIfNotExists();

app.get('/hello',(req, res) => {
    res.send("Hello from sport project\n");
    console.log("hello");
  });

// Mapping operations to endpoints
app.get('/sport', queries.getSport);
app.get('/sport/:id', queries.getSportById);
app.post('/sport', queries.createSport);
app.delete('/sport/:id', queries.deleteSport);
app.put('/sport/:id', queries.updateSport);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
