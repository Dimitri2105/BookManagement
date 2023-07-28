const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./Database/database')
const bookRoutes = require('./Routes/bookRoutes')


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use(cors())
app.use(bookRoutes)


sequelize
.sync()
.then( result =>{
    app.listen(3000 , () =>{
        console.log('Server listening on port 3000')
    })

})