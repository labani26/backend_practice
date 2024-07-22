const express = require("express");
const app = express(); //call express function
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");

app.use(express.json());  //Pass the req body to json

 app.use("/users", userRouter);
 app.use("/note", noteRouter);

 //Middleware function
app.use((req, res, next)=> {
    console.log("HTTP Method - " + req.method + " - URL" + req.url);
    next();
});

app.get("/",(req, res) => {         //req = will come, res = we will give
    res.send("hello")
});

mongoose.connect("mongodb+srv://admin:admin@learning.zkyd2we.mongodb.net/?retryWrites=true&w=majority&appName=Learning")
.then(() => {

    app.listen(5000, () => {
        console.log("server started on port 5000");
    });

}).catch((error)=> {
   console.log(error);
})

