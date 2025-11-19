import express from "express";

const app = express();

app.use(express.json());

app.get('/' , (req,res) => {
    res.send("the work of art")
})

app.listen(5000);