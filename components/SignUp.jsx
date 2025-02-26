import React from "react"
import { Link } from "react-router"

export default function LogIn() {
    
  return (
    <section id="page-SignUp">
        <form>
            <label>
                Username
            </label>
            <input name="username" type="text" placeholder="themostproductiveever" />
            <label>
                Email
            </label>
            <input name="email" type="email" placeholder="awesome@gmail.com"/>
            <label>
                Password
            </label>
            <input name="password" type="password" placeholder="********" />
            <button type="button" >Sign Up</button>
        </form>
        <h3>Already have an account? <Link className="link-ref" to="/LogIn">click here</Link></h3>
    </section>
  )

}