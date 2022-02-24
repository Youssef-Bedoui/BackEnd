const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const userRouter = require("./routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/dist"));

app.use("/users", userRouter);


mongoose.connect("mongodb+srv://Youssef:1234@cluster0.7keeg.mongodb.net/CRUD_Express?retryWrites=true&w=majority",{
	useNewUrlParser: true,
}).then((connection)=>{console.log("Connected Successfully")})





app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
