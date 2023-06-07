import React from 'react'
import { Link } from 'react-router-dom'
import "./homepage.css";


export default function HomePage() {
  return (
    <nav>
        <ul>
            <li><Link to="/login">Login</Link> </li>
            <li><Link to="/register">Register</Link> </li>
        </ul>
    </nav>
  )
}
