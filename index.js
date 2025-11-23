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

    app.use('/welcome', (req, res, next) => {
        console.log(`A new request received at ` + Date.now());
    
        res.on('finish', () => {
            console.log('Response finished');
        });
    
        next();
    });
    
    app.get('/welcome', (req, res) => {
        res.send('Welcome to Express.js');
    });

    
    app.get('/error-test', (req, res) => {
        throw new Error('this is test error');
    });
    
    // Error handling middleware (must be after routes)
    app.use((err, req, res, next) => {
        console.log('Error:', err.message);
        res.status(500).send('Internal server error');
    });
    

    // Catch-all route for 404 - must be last (no path means it matches all routes)
    app.use((req, res) => {
        res.status(404).send('sorry this is a invalid url');
    })


   
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});