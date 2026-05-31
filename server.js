//Backend Re-design for VaultPass
//A platform where users can create private notes and manage team access const express= require ('express');
const morgan = require('morgan');
const errorHandler = require('./src/middleware/errorHandler');

require('dotenv').config();
const app = express();

const connectDB = require(".src/config/db");
const userRoutes = require('./src/routes/user.routes');


//middleware
app.use(express.json());
app.use(morgan('dev'));app.use('/api/users', userRoutes);
app.use('/api/moderator', require('./src/routes/moderator.routes'));
app.use('/api/admin', require('./src/routes/admin.routes'));
app.use(require('./src/middleware/logSuspicious'));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;


app.get('/',(req,res) =>{
    res.send("Hello World!");
});


app.listen(PORT, ()=>{
    connectDB(); 
 console.log(Server is running on http://localhost:${PORT});
});
