const express = require('express')
const app = express()
const port = 8080;
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const User = require('./usermodule.js') 

app.use(cors())
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.DATABAS, () => console.log('Databas'))

app.post('/register', async (req,res) =>{
   try {
   const user = await User.create({
       firstname: req.body.firstname,
       email: req.body.email,
       password: req.body.password
   })
   res.status(200).send({user})

   const oldUserEmail = await User.findOne({ email });                             
        const oldFirstName = await User.findOne({ firstname });                           
       
        if (oldUserEmail || oldFirstName ) {                                                   
            return res.status(409).send({ message: "Användaren finns redan" });     
        }
        

} catch (error){
   res.status(400).send({ error: error})

}
res.end();
})

app.post('/login', async (req,res) =>{
    const user =  await User.findOne({
            email: req.body.email,
        })
     const password = req.body.password
      if(user.password === password){
       res.status(200).send({message: ok})
    } else {
        return res.json({ status: 'error', user: false})
    }
    
})
app.get('/api', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json( {message: error.message} )
    }
})
app.listen(port,()=> {
    console.log("listening port 8080")
})