const axios = require('axios');
const express = require('express');
const f = require('fetch');
const ejs = require('ejs');
const app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");
app.set('port', 3000);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const { MongoClient } = require('mongodb');
const uri: string = "mongodb+srv://dachig:incorrect99!@cluster0.dyauo8e.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });
import { count } from "console";
import { ObjectId } from "mongodb";

let dateYearNow = new Date().getFullYear();

function getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
}

const api_url = "https://zenquotes.io/api/quotes/";
app.get('/', async (req: any, res: any) => {

        const response = await fetch(api_url);
        var data = await response.json();
        let quote1 = data[getRandomInt(data.length)];   
        let quote2 = data[getRandomInt(data.length)];    

        res.render("index", { dateYearNow, quote1, quote2 });
});
interface Book {
    _id: ObjectId,
    title: string,
    author: string,
    published: string,
    pages: number,
    image: string,
    review: string,
    tier: string
}

app.get('/books', async (req: any, res: any) => {
    try {
        await client.connect();
        let books = await client.db('MyJourney').collection('books').find({}).toArray();

        //await client.db('MyJourney').collection('books').insertOne({title: "Mans Search For Meaning", 
        //author:"Viktor E. Frankl & Simon Vance", published: "2021",
        //pages : 240, image:"https://media.s-bol.com/JY5ym4lEGvPo/wjA1x9z/533x840.jpg",
        //review:"TBD",tier:"TBD"});

        res.render('books', { books, dateYearNow })
    } catch (e) {
        console.error(e)
    } finally {
        await client.close();
    }

});
app.get('/books/:index', async (req: any, res: any) => {
    try {
        await client.connect();

        let index: string = req.params.index;

        let specificBook = await client.db('MyJourney').collection('books').findOne({ title: index });
        res.render("specific_book", { specificBook, index, dateYearNow })

    } catch (e) {
        console.error(e)
    } finally {
        await client.close();
    }
});

app.get('/personal_projects',(req:any,res:any)=>{
    res.render('personal_projects',{dateYearNow});
});

app.get('/real_life',(req:any,res:any)=>{
    res.render('real_life',{dateYearNow});
});

app.get('/cars',(req:any,res:any)=>{
    res.render('cars',{dateYearNow});
});

app.listen(app.get("port"), async () => {
    console.log(`The application has started on: http://localhost:${app.get("port")}`);
});