import express from "express";

const app = express();

app.use(express.json());

app.get('/' , (req,res) => {
    res.send("the work of art")
})
app.get("/user/:username" , (req,res) => {
    const username =req.params.username;
    res.send(`welcome ${username}`)
})

app.get("/search" , (req,res) => {
    const keyword =req.query.keyword;
    res.send(`welcome ${keyword}`)
})
app.listen(5000);
