const app = require('express')();

const PORT = process.env.PORT || 5000;


app.get('/',(req, res)=>{
    res.json({hi:"hi"})
})


app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})