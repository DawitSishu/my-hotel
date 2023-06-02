const app = require('express')();
const errorHandler = require('./Middlewares/ErrorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./config/ConnectDB');
const userAuthChecker = require('./Middlewares/userAuthChecker');


const PORT = process.env.PORT || 5000;


app.use(require('express').json())

app.use('/api/users', require('./Routes/UserRoutes'));

app.use('/api/rooms',userAuthChecker,require("./Routes/RoomRoutes")); 
app.use(errorHandler);
connectDB();


app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})