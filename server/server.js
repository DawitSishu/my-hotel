const app = require('express')();
const errorHandler = require('./errorHandler');


const PORT = process.env.PORT || 5000;

app.use(errorHandler);
app.use(require('express').json())

app.use('/api/users', require('./Routes/UserRoutes'))


app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})