import React from "react"
import { Link } from "react-router"

export default function LogIn() {
    return (
        <section id="page-LogIn">
            <div>
              <form>
                  <label>
                      Email
                  </label>
                  <input name="email" type="email" placeholder="awesome@gmail.com" />
                  <label>
                      Password
                  </label>
                  <input name="password" type="password" placeholder="********" />
                  <button type="button" >Log In</button>
              </form>
              <h3>You don't have account yet? <Link className="link-ref" to="/SignUp">click here</Link></h3>
            </div>
        </section>
      );
}