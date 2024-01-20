const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");

const authRouter = require("./route/authRouter");
const userRouter = require("./route/userRouter");
const postRouter = require("./route/postRouter");

const app = express();
app.use(cors());
dotenv.config();
//MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database NOT connected");
  });

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req , file , cb)=>{
    cb(null, "public/uploads")
  } , 
  filename: (req , file , cb)=>{
    // console.log(req.body);
    cb(null , req.body.fileName);
  }
})

const upload = multer({
  storage
});

app.post("/upload" , upload.single("file") , async(req , res)=>{
  try {
    res.status(200).json("File uploaded!");
  } catch (error) {
    res.status(500).json(error);
  }
})

app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);
app.use("/api/post" , postRouter);


// port connection
app.listen(process.env.PORT, () => console.log("Server is running on port 5000"));
