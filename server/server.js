const app = require('express')();
const errorHandler = require('./Middlewares/ErrorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./config/ConnectDB');
const cors = require('cors');


app.use(cors());


const PORT = process.env.PORT || 5000;


connectDB();
app.use(require('express').json())

app.use('/api/users', require('./Routes/UserRoutes'));

app.use('/api/rooms',require("./Routes/RoomRoutes")); 
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})