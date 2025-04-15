import React from "react"
import { Link } from "react-router"

export default function Hello() {
  return (
      <div className="footer">
        <Link className="login" to="/LogIn">Log In</Link> 
        <Link className="signup" to="/SignUp">Sign Up </Link>
      </div>
  );
}