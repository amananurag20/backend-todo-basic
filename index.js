const express = require("express");
const mongoose = require("mongoose");
const { createTodo, updateTodo } = require("./types");
const Todo = require("./model/todoModel");

const app = express();

app.use(express.json()); //json-> object

const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://amananurag20:kvY2XTo6hzlJW8Pw@cluster0.omlfj.mongodb.net/todo"
  );
  console.log("mongodb connected sucessfully");
};

dbConnect();

app.get("/todos", async (req, res) => {
  try {

    const todos = await Todo.find({});
    res.json({ msg: "Todo listed", todos: todos });
  } catch (error) {
    res.json({ msg: "something went wrong" });
  }
});

app.post("/todo", async (req, res) => {
  const createPayload = req.body; //title , description, name:"aman"
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "you sent a wrong input",
    });
  }

  const createdTodo = await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  }); //1 sec

  // put in mongodb
  res.json({ message: "done", todo: createdTodo });
});

app.put("/completed", async(req, res) => {
  const updatePayload = req.body;  //{id:66ff727ccf08fd7e1526ca82}
  const parsedPayload = updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "you sent a wrong input",
    });

    return;
  }

  try{
     await Todo.updateOne({_id:req.body.id},{completed:true});
    //  await Todo.findByIdAndUpdate(req.body.id,{completed:true});
     res.json({msg:"todo completed"});
  } catch(error){
    console.log(error);
    res.status(401).json({msg:"something went wrong"});
  }
  
});

app.listen(5000, () => {
  console.log("server is listening on port :5000");
});
