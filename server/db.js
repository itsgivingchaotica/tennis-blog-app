import express from "express";
import { db } from "./db.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), function (req,res){
    const file = req.file; 
    res.status(200).json(file.filename);
})

app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.get("/", (req,res) => {
    let sql = "SELECT * FROM users";
    db.query(sql, (err,results) => {
        res.send(results);
    })
})

// var connection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "Pianolitguy8!",
//     database: "blog",
//     port: "3306"
// })

// connection.query('CREATE TABLE tabletest(id INT (255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, thing VARCHAR(45) NOT NULL)', (err,rows) => {
//     if (err){
        
//     } else {
//         console.log("DATA SENT")
//         console.log(rows)
//     }
// })

app.get("/test", (req,res)=>{
    res.json("It works!")
})

app.listen(8800,()=>{
    console.log("Connected!")
})