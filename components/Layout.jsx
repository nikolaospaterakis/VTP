import React from "react"
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main id="ptv-main">
        
        <Outlet />
    </main>
  )
};