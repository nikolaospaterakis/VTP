import supabase from "../config/supabaseClient.js"
import { useNavigate  } from "react-router"
import React from "react"
import { Link } from "react-router"
import { UserAuth } from "../context/AuthContext.jsx"

export default function LogIn() {

    
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const { session, signInUser, signOut } = UserAuth();

    function handleChange(event){
        const {value} = event.target
        event.target.name === "username" ? setUsername(value) : (
            event.target.name === "email" ? setEmail(value) : setPassword(value)
        )
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        try {
            const result = await signInUser(email, password)

            if(result.success) {
                navigate("/Welcome")
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <section id="page-LogIn">
            <div>
              <form>
                  <label>
                      Email
                  </label>
                  <input name="email" type="email" placeholder="awesome@gmail.com" onChange={handleChange}/>
                  <label>
                      Password
                  </label>
                  <input name="password" type="password" placeholder="********" onChange={handleChange}/>
                  <button type="button" onClick={handleSubmit}>Log In</button>
              </form>
              <h3>You don't have account yet? <Link className="link-ref" to="/SignUp">click here</Link></h3>
            </div>
        </section>
      );
}