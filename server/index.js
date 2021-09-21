const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/', function(req, res) {
    const readFile = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/)
    res.send({readFile})
})
app.listen(5000, () => console.log('app listen on port 5000'))