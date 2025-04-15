import React from "react"
import { Link } from "react-router"
import { useNavigate  } from "react-router"
import { UserAuth } from "../context/AuthContext.jsx"

export default function LogIn() {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const { session, signUpNewUser, signOut } = UserAuth();


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
            const result = await signUpNewUser(email, password, username)

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
    <section id="page-SignUp">
        <form>
            <label>
                Username
            </label>
            <input name="username" type="text" placeholder="themostproductiveever" onChange={handleChange} />
            <label>
                Email
            </label>
            <input name="email" type="email" placeholder="awesome@gmail.com" onChange={handleChange}/>
            <label>
                Password
            </label>
            <input name="password" type="password" placeholder="********" onChange={handleChange}/>
            <button type="button" onClick={handleSubmit}>Sign Up</button>
        </form>
        <h3>Already have an account? <Link className="link-ref" to="/LogIn">click here</Link></h3>
    </section>
  )

}