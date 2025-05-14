import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"
const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    fs.readdir(`./files`,(err, files) => {
        console.log(files);
        res.render("index", {files: files})
    })
    
})

app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render("show", {filename: req.params.filename, filedata:filedata});
        
    })
    
})

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {})
    res.redirect("/")
})

app.listen(3000)