import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

import "./register.css";


export default function Register() { 

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const firstnameChanged = (e) => setFirstname(e.target.value)
  const lastnameChanged = (e)=> setLastname(e.target.value)
  const emailChanged = (e) => setEmail(e.target.value)
  const passwordChanged = (e)=> setPassword(e.target.value)

  let navigate = useNavigate()
     
  async function onSubmit(e) {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      })
      const data = await res.json()

      if (res.status === 200) {
        setMessage(data.message)
        // window.location.href = "http://localhost:3000/login"
        navigate("/login")
        return
      }
      setMessage(data.message)


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container'>
      <Link to="/">Hem</Link>
      <h1>Registrera dig</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="name">Namn</label>
        <input
          type="text"
          name='firstname'
          required={true}
          value={firstname}
          onChange={firstnameChanged}
        />
        <label htmlFor="name">Efternamn</label>
        <input
          type="text"
          name='lastname'
          required={true}
          value={lastname}
          onChange={lastnameChanged}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name='email'
          required={true}
          value={email}
          onChange={emailChanged}
        />
        <label htmlFor="password">Lösenord</label>
        <input
          type="password"
          name='password'
          required={true}
          value={password}
          onChange={passwordChanged}
        />
        <button
          type='submit'
        >Registrera</button>
      </form>
      <h1>{message}</h1>
      <Link to="/login">Redan medlem?</Link>
    </div>
  )
}