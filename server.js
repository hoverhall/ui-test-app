const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs')

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Function to handle the root path
app.get('/api/v1/', (req, res) => {
    fs.readFile('serverData.json', (err, data) => {
        const serverData = JSON.parse(data)
        let products = req.query.products;

        if (products === 'all') res.send(serverData)
    })
});

app.post('/api/v1/buy', (req, res) => {
    fs.readFile('serverData.json', (err, data) => {
        const serverData = JSON.parse(data)
        let _id = req.query.id
        let _name = req.query.name
        let _number = req.query.number

        console.log(`id: ${_id}, name: ${_name}, phone: ${_number}`)

        serverData.forEach(item => {
            if (item.id === _id) {
                res.setHeader('Content-Type', 'message/delivery-status')
                res.sendStatus(200)
            }
        })
    })
})

let server = app.listen(8081, () => {
    console.log('http://127.0.0.1:8081')
});