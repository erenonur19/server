require('./db/dbConnection')
const express=require('express');

const userRouter=require('./router/userRouter');

const app = express();
var cors = require('cors')

app.use(cors())
// app.all('*', function (req, res, next) {
//     if (!req.get('Origin')) return next();
//     res.set('Access-Control-Allow-Origin', '*');
//     res.set('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
//     res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
//     next();
// });
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/posts',userRouter);



app.get('/',(req,res)=>{
    res.send(`<h1>Homepage</h1>`)
})


app.listen(3000,()=>{
    console.log("Listening to port 3000...");
})