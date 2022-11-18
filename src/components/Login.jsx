import { useState } from "react"

export default function () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailChanged        = e => setEmail(e.target.value)
    const passwordChanged     = e => setPassword(e.target.value)

    async function onSubmit(e){
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8080/login', {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h1>Login</h1>
<form>

<label htmlFor="email">Email</label>
        <input
        required={true}
        type="email"
        name='email'
        value={email}
        onChange={emailChanged}
        />
        <label htmlFor="password">Password</label>
        <input
        required={true}
        type="password"
        name='password'
        value={password}
        onChange={passwordChanged}
        />
        <button type='submit'>login</button>

</form>

    </div>
  )
}
