const express = require('express')
const app = express()
const port = 8080;
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const User = require('./usermodule.js')
const jwt = require("jsonwebtoken")

app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.DATABAS, () => console.log('Databas'))
.catch((error) => console.log(error))

app.post('/register', async (req,res) => {
    try {
    const { firstname, lastname, email, password } = req.body
  
    if (!(firstname && lastname && email && password)) {
      res.status(400).send({ message: "Alla fält är obligatoriska!" });
      return
    }
  
    const oldUserEmail = await User.findOne({ email })
  
    if (oldUserEmail ) {
      res.status(409).send({ message: "Användaren finns redan" });
      return
    }
  
    const newUser = await User.create({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password
    })
  
    res.status(200).json({ message: 'Registrering lyckades', user: newUser })
    return
    } catch (error) {
      return res.status(400).send({ error: error})
    }
  })

  app.post('/login', async (req,res) =>{
    try {
      const email = req.body.email
      const password = req.body.password
      const user =  await User.findOne({ email })
  
      if (!user) {
        console.log("Fel lösenord eller mail")
        res.status(404).send({message: "Fel lösenord eller email"})
        return
      }
  
      const passwordValidation = await password === user.password
      if (!passwordValidation) {
        console.log("Fel lösenord eller mail")
        res.status(404).send({ message: "Fel lösenord eller email" })
        return
      }
  
      if (user && passwordValidation) {
        const token = jwt.sign({
          email: req.body.email,
          password: req.body.password
        },
        process.env.JWT_SECRET)
  
  
        res.status(200).send({message: "Välkommen", token: token, user: user})
        return
      }
    } catch (error) {
      res.send({message: error})
      return
    }
  })
  
  app.get('/api', (req, res) => {
    User.find()
    .then(data => {
      res.json({users:data.length, data})
    })
    .catch(error => res.json(error));
})

app.listen(port,()=> {
    console.log("listening port 8080")
})