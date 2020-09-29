const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const tasklist = require('./route/api/tasklist')

app.use('/api/tasklist', tasklist)

// Handle production
if(process.env.NODE_ENV === 'production'){
      app.use(express.static(__dirname + '/public/'));

      // Handle SPA
      app.get(/.*/,(req,res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 8000;
app.listen(port ,() => console.log(`Sever started on port ${port}`))