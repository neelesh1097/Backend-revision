import express from "express";
import router from './route.js'



const app = express();

app.use(express.json());

app.get('/' , (req,res) => {
    res.send("the work of art")
})

app.use('/user', router) 

app.post('/login' , (req,res) => {
    try {
        const {name, email} = req.body;
        
        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Both name and email are required'
            });
        }
        
        res.json({
            message: `user ${name} with ${email} created successfully`
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.put('/admins/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                error: "Missing fields",
                message: "Both name and email are required"
            });
        }

        // SUCCESS RESPONSE
        return res.status(200).json({
            message: `user ${userId} updated to ${name} with ${email}`
        });

    } catch (error) {
        return res.status(500).json({
            error: "Server error",
            message: error.message || "Something went wrong"
        });
    }
});


app.delete('/admins/:id' , (req, res) => {
       const userid  = req.params.id 
       res.json({
        message:`user with ID ${userid} deleted sucessfully`
       })
    })


    app.get('/things/:name/:id' , (req,res)=>{
        const{name ,id} = req.params
        res.json({
                 id,
                 name
        })
    })





app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});