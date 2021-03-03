const express =require('express')
const connectDB= require('./config/db')
const app=express() 

//connect the db
connectDB();

//initiallizing body parser middleware 
app.use(express.json({extended:false}));





app.get('/',(req,res)=>res.send('API Running'));


app.use('/api/user', require('./routes/api/user'));


app.use('/api/Authentication',require('./routes/api/auth'));

app.use('/api/UserProfile',require('./routes/api/profile'));
//defining routes




const PORT=process.env.PORT|| 5000;

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))