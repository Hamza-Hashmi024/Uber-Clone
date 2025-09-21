const exprees = require('express')
const app = exprees('');

app.get('/'  , (req , res)=>{
    res.send("hello World")
})

module.export = app