const express = require('express')
const app = express()
const port = 8000
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pgiio.mongodb.net/cinemaInfo?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("cinemaInfo").collection("cinema");
    console.log("success")
    app.post('/cinemaInfo', (req, res) => {
        const newCinemaInfo = req.body;
        collection.insertOne(newCinemaInfo)
            .then(result => { res.send(result.insertedCount > 0) })
        console.log(req.body);
        console.log(err);
    })
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(process.env.PORT || port)