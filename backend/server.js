require("dotenv").config();
const app =require("./src/app");
const connectTodb = require("./src/db/db")
connectTodb()

  app.listen(3000,()=>{
    console.log("serevr is running");
    
  })