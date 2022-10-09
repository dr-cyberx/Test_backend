const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log(req.params)
    res.send('Hello world')
})

app.listen(4000, () => {
    console.log('The server is up at http://localhost:4000');
})