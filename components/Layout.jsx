import React from "react"
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main id="ptv-main">
        <section id="welcome">
          <h1>VetThePet</h1>
          <img 
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGRodmo3dmI1cG9ycjV0c2h2MHlyaGE5Y3d3aDBjdWtqaW5ieGR6YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fdLLleAy8MoRhoJw3C/giphy.gif"
              alt="walking dog" 
          />
         
        </section>
        <Outlet />
    </main>
  )
};