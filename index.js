require('./db/dbConnection')
const express=require('express');
const dotenv=require('dotenv')

const userRouter=require('./router/userRouter');
const loginRouter=require('./router/loginRouter')
const profileRouter=require('./router/profileRouter')
dotenv.config();

const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())
app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.header('Access-Control-Expose-Headers', 'token')
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/posts',userRouter);
app.use('/auth',loginRouter);
app.use('/profile',profileRouter);



app.get('/',(req,res)=>{
    res.send(`<h1>Homepage</h1>`)
})


app.listen(3000,()=>{
    console.log("Listening to port 3000...");
})