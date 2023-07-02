const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const formRoute = require("./routes/formRoute");

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Connected to db...");
}).catch((err) =>{
    console.log("Error connecting to the db...");
})

app.use("/api/saveData",formRoute);

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})