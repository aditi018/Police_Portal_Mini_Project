const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDatabase = require('./config/db')
const dotenv = require('dotenv')
const app = express();
app.use(express.json());

dotenv.config({path:'config/config.env'});

const registerRoutes = require("./routes/registerRouter.js")
const loginRoutes = require("./routes/loginRouter.js")
const firRoute = require("./routes/firRouter");


connectDatabase();



const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json(), urlencodedParser)
app.use(cors())



app.use("/signup", registerRoutes)
app.use("/login", loginRoutes)
app.use("/fir",firRoute);


const server = app.listen(process.env.port,()=>{
    console.log(`Backend server is working on https://localhost:${process.env.PORT}`)
})
