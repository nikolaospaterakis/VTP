import { useQuery } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router";

export default function MyPetsList(props){

    const { session } = UserAuth();
    const today = new Date()

    const borderStyle = (gender) => {
      return {
        borderBottom: gender == "male" ? "4px solid blue" : "4px solid pink"
      }
    } 

    const fetchMyPets = async () => {
        const { data, error } = await supabase
            .from("pets")
            .select("*")
            .eq(`owner`, `${session.user.id}`)
    
        if (error) throw new Error(error.message)
    
        return data
    }
    
    const {data, isLoading, error } = useQuery({
            queryKey: ["myPets"],
            queryFn: fetchMyPets,
        })
    
    if (isLoading) return <div>Loading....</div>
    
    if (error) return <div>Error fetching your pets</div>

    return data.length > 0 ? (
            <div id="my-pets">
            {data.map((pets, index) => {

                const gender = pets.gender
                const born_date = new Date(pets.age)

                const age = () => {
                    if( born_date.getFullYear() == today.getFullYear() ) {
                        if(today.getMonth() == born_date.getMonth()){
                            return `${today.getDate() - born_date.getDate()}d`
                        } else {
                            return `${today.getMonth() - born_date.getMonth()}m`
                        }
                    } else {
                        return `${today.getFullYear() - born_date.getFullYear()}y`
                    }
                }

                return (
                    <div className="created-pets" key={index} style={borderStyle(gender)}>
                        <div className="img-wrapper">
                            <img 
                                width={"200px"} 
                                src={pets.pets_image_url} 
                                alt={pets.name} 
                            />
                        </div>
                        <div className="pet-Infos">
                            <h2>{pets.name}</h2>
                            <h2>{age()}</h2>
                        </div>
                    </div>
                )
            })}
        </div>
        ) : <section>
            <h2>You have no pets yet, <Link to="/Welcome/Newpet">create one here.</Link></h2>
        </section>
}

