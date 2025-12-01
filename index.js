import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import router from './route.js'

import {connectDB} from './config/db.js';
import {Person} from './models/person.js';

const storage = multer.diskStorage({
    destination: 'uploads/',   // or a callback
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + "_" + file.originalname);
    },
  });
  

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure Multer (in‑memory, no files saved to disk for now)
const upload = multer({storage});

app.use(express.urlencoded({ extended: true }));

app.use(upload.single('image'));

app.use(express.json());

// Configure EJS view engine
app.set('views', 'view');
app.set('view engine', 'ejs');

// Serve static files from /public using an absolute path
app.use(express.static(path.join(__dirname, 'public')));

// Serve images from /images URL prefix
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/' , (req,res) => {
    res.send('hello express')
})


// Example route using Multer for multipart/form-data (no files, only fields)
app.post('/form' , (req,res) => {
    console.log(req.body);
    console.log(req.file);
    res.send('from received')
})

app.get('/view' , (req,res) => {
   const userName ='John doe'
   res.render('index', { title: 'Home', userName })
})

app.post('/person' , async(req,res) => {
    try {
        const {name, age, email} = req.body;

        const newPerson = new Person({
            name,
            age,
            email
        });

        await newPerson.save();

        console.log('Person saved:', newPerson);

        res.status(201).json({
            message: 'Person added successfully',
            person: newPerson
        });
    } catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({
            error: 'Failed to save person',
            message: error.message
        });
    }
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


   
// Connect to database and start server
connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
    });
}).catch((error) => {
    console.error('Failed to start server:', error);
});