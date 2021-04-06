const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://newUser:formapp1234@mern.y7kro.mongodb.net/friends?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  res.send("Succes");
});

app.get("/read", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`<h1>${result}</h1>`);
    }
  });
});

app.listen(3001, () => {
  console.log("You are connected");
});
