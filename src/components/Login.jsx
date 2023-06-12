import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = ({ onFetch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const emailOnChange = (e) => setEmail(e.target.value)
  const passwordOnChange = (e) => setPassword(e.target.value)

  async function onSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      const data = await res.json()

      if (res.status === 200) {
        navigate("/profil")
        onFetch(data.user)
        localStorage.setItem('accessToken', data.token)
        return
      }
      setMessage(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <Link to="/">Hem</Link>
      <h1>Logga in här</h1>
      <form onSubmit={onSubmit}>

        <label htmlFor="email">Email</label>
        <input
          required={true}
          type="email"
          name='email'
          value={email}
          onChange={emailOnChange}
        />
        <label htmlFor="password">Lösenord</label>
        <input
          required={true}
          type="password"
          name='password'
          value={password}
          onChange={passwordOnChange}
        />
        <button type='submit'>Logga in</button>

      </form>
      <h1>{message}</h1>
      <Link to="/register">Inte medlem?</Link>
    </div>
  )
}

export default Login