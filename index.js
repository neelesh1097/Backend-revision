import express from "express";
import router from './route.js'



const app = express();

app.use(express.json());

app.get('/' , (req,res) => {
    res.send("the work of art")
})

app.use('/user', router) 



app.listen(5000);