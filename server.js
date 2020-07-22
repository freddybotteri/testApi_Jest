const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const { posts } = require('./endPoints');
const { authenticate } = require('./middlewares')
const app = express();
const port = 3000;

app.use(parser.urlencoded({ extended: false }))

app.use(parser.json())

const postHandler = posts({axios})

app.post('/',authenticate,postHandler.post)
app.put('/',authenticate,postHandler.put)

app.listen(port,() => console.log(`Connect port ${port}`))