const express = require('express')
const mongoose = require("mongoose")
const reqlineRoute = require("./route/reqlineRoute")
const reverseGeocodeRoute = require("./route/reverseGeocodeRoute")

const port = 3000
const cors = require('cors')

const app = express()
app.use(cors())





require('dotenv').config(); 

app.use(express.json())



app.use('/', reqlineRoute);
app.use('/', reverseGeocodeRoute);



const PORT = process.env.PORT || 3000

const MONGO_URL = process.env.MONGO_URL;



mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("MongoDb is connected successfully")
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})

