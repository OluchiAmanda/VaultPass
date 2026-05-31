//Backend Re-design for VaultPass
//A platform where users can create private notes and manage team access securely


const express= require ('express');
const morgan = require('morgan');

require('dotenv').config();
const app = express();

const connectDB = require(".src/config/db");
const userRoutes = require('./src/routes/user.routes');


//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;


app.get('/',(req,res) =>{
    res.send("Hello World!");
});


app.listen(PORT, ()=>{
    connectDB(); 
 console.log(`Server is running on http://localhost:${PORT}`);
});
