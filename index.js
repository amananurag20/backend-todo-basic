const express= require("express");
const { createTodo } = require("./types");

const app= express();

app.use(express.json());  //json-> object


app.get("/todos",(req,res)=>{

})

app.post("/todo",(req,res)=>{
   const createPayload=req.body;
   console.log("createPayload",createPayload);
   const parsedPayload= createTodo.safeParse(createPayload);
   console.log("parsed payload", parsedPayload);

   if(!parsedPayload.success){
     return res.status(411).json({
        msg:"you sent a wrong input"
     })     
   }
   // put in mongodb
   res.json({message:"done"})

})

app.put("/completed", (req,res)=>{
  
})



app.listen(5000,()=>{
    console.log("server is listening on port :5000");
})