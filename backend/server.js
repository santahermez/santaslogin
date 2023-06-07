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
.catch((error) => console.log(error))

app.post('/register', async (req,res) =>{
   try {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password

    console.log(firstname, lastname, email, password)
    
    const oldUserEmail = await User.findOne({ email });                             
        
         if (oldUserEmail ) {                                                   
              res.status(409).send({ message: "Användaren finns redan" });   
              return  
         }


    const user = await User.create({
        firstname,
        lastname,
        email,
        password
    })
         res.status(200).send({user})
         return


} catch (error){
   res.status(400).send({ error: error})
return
}
})

app.post('/login', async (req,res) =>{
    try {
        const email = req.body.email
        const password = req.body.password
        const user =  await User.findOne({email})
        if (!user) {
            console.log("user not found")
            res.status(404).send({message: "user not found"})
            return
        }
        const vali = await password === user.password
        if (!vali) {
            console.log("wrong password")
            res.status(404).send({message: "wrong password"})
            return
        }
        if (user && vali) {
            console.log("login succesfull")
            res.status(200).send({message: "login succesfull"})
            return
        }

    } catch (error) {
        res.send({message: error})
           return
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