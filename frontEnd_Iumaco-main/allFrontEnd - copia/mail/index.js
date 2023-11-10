const express = require('express');
const app = express();
let cors = require('cors');
const bodyparser = require('body-parser')

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(require('./routes/correoRoutes'));

app.listen('3000',()=>{
    console.log('ejecutacion exitosa');
})

/*
1 npm i express
2 npm i nodemon
3 npm i cors
4 npm i nodemailer
5 npm i body-parser
*/