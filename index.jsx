import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout.jsx"
import Hello from "./components/Hello.jsx"
import LogIn from "./components/LogIn.jsx"
import SignUp from "./components/SignUp.jsx"
import Welcome from "./components/Welcome.jsx";
import MyPets from "./components/MyPets.jsx"
import { AuthContextProvider} from "./context/AuthContext.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewPet from "./components/NewPet.jsx";

const client = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={ <Layout />}>
              <Route index element={<Hello />} />
              <Route path="Login" element={<LogIn />} />
              <Route path="Signup" element={<SignUp />} />
            </Route>
            <Route path="Welcome" element={<Welcome />}>
              <Route index element={<MyPets />} />
              <Route path="Newpet" element={<NewPet />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)