const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())
app.listen(PORT, () => console.log(`server listen http://localhost:${PORT}`))

app.post('/solve', (req,res)=>{
    console.log(req.body.numbers)
    console.log(process.env.RAPID_API_KEY)
    const options = {
        method: 'POST',
        url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        },
        data: req.body.numbers
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        //populateValues(response.data, response.data.answer)
        res.json(response.data)
    }).catch(function (error) {
        //console.error(error);
    });
})
