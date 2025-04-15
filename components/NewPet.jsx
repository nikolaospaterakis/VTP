import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";

export default function NewPet(){

    const { session } = UserAuth();
    const navigate = useNavigate()

    const [petName, setPetName] = React.useState("")
    const [petAge, setPetAge] = React.useState("")
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [gender, setGender] = React.useState(null)
    const [breed, setBreed] = React.useState(null)

    const createPet = async(petsData, imageFile) => {

        const filePath = `${petsData.name}-${Date.now()}-${imageFile.name}`

        const { error: uploadError} = await supabase.storage
            .from("pets-images")
            .upload(filePath, imageFile)

        if (uploadError) throw new Error(uploadError.message)

        const { data: publicDataUrl} = supabase.storage.from("pets-images").getPublicUrl(filePath)

        const {data, error} = await supabase
        .from("pets")
        .insert({
            ...petsData, 
            pets_image_url: publicDataUrl.publicUrl
        })

        if(error){
            throw new Error(error.message)
        } else {
            return data
        }
    }

    const {mutate, isPending, isError} = useMutation({ mutationFn: async (data) => {
        return createPet(data.petsData, data.imageFile)
    } })
    

    const handleCreatePet = (event) => {
        event.preventDefault()
        if(selectedFile){
            mutate({petsData: {name: petName,age: petAge,gender: gender,breed: breed,owner: session.user.id}, imageFile: selectedFile})
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <section className="content">
            <form id="create-Pet" onSubmit={handleCreatePet}>
                <label>Name</label>
                <input 
                    type="text" 
                    id="pet-Name"
                    required
                    placeholder="Name of your pet"
                    onChange={(event) => setPetName(event.target.value)}
                />
                <label>Age</label>
                <input 
                    type="date" 
                    id="pet-Age"
                    required
                    placeholder="Age of your pet"
                    onChange={(event) => setPetAge(event.target.value)}
                />
                <label>Gender</label>
                <select name="gender" id="gender" onChange={(event) => setGender(event.target.value)}>
                    <option value="">Please choose an option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label>Breed</label>
                <input 
                    type="text" 
                    id="pet-Breed"
                    required
                    placeholder="Type the breed of your pet"
                    onChange={(event) => setBreed(event.target.value)}
                />
                <label>Upload Image</label>
                <input 
                    type="file" 
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit">{isPending ? "Creating..." : "Create Pet"}</button>

                {isError && <p>Error creating Post</p>}
            </form>
        </section>
    )
}