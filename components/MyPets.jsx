import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";
import MyPetsList from "./MyPetsList.jsx";

export default function MyPets(){

    return (
        <section className="content">
            <MyPetsList/>
        </section>
    )
}