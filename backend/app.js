const express = require("express")
const dotenv = require('dotenv')
const cors = require("cors")


dotenv.config()

const app = express() 

//middelware
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("hello from backend")
})

app.listen(5000,()=>{
  console.log("its working")
})