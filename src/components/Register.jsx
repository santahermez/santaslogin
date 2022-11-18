import React from 'react'
import { useState } from 'react'

export default function Register() { 

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const firstnameChanged    = e => setFirstname(e.target.value)
    const lastnameChanged    = e => setLastname(e.target.value)
    const emailChanged        = e => setEmail(e.target.value)
    const passwordChanged     = e => setPassword(e.target.value)
     
async function onSubmit (e) {
    e.preventDefault()

   try {
    const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password })
   })
   const data = await res.json()
   console.log(res.status)
   console.log(data)
   setMessage(data.message)

   } catch (error) {
    console.log(error)
   }
}
  return (
    <div>
      <a href="http://localhost:3000/">Home</a>
        <h1>Register</h1>
        <form onSubmit={onSubmit}> 
        <label htmlFor="name">Firstname</label>
        <input 
        type="text" 
        name='firstname'
        required= {true}
        value={firstname}
        onChange={firstnameChanged}
        />
        <label htmlFor="name">Lastname</label>
        <input 
        type="text" 
        name='lastname'
        required= {true}
        value={lastname}
        onChange={lastnameChanged}
        />
        <label htmlFor="email">Email</label>
        <input
        type="email"
        name='email'
        required= {true}
        value={email}
        onChange={emailChanged}
        />
        <label htmlFor="password">Password</label>
        <input
        type="password"
        name='password'
        required= {true}
        value={password}
        onChange={passwordChanged}
        />
        <button
        type='submit'
        >submit</button>
        </form>
        <h1>{message}</h1>
        <a href="http://localhost:3000/login">Redan medlem?</a>
    </div>
  )
}