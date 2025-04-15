import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faPaw, faSquarePlus, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Outlet } from "react-router"
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Welcome(){

    const { session, signOut } = UserAuth();
    const [menuOpen, setMenuOpen] =  React.useState(false)
    const navigate = useNavigate()

    const menuStyle = {
        height: menuOpen ? "20em" : "6em"
    }
   

    const restStyle = {
        opacity: menuOpen ? ".4" : "1"
    }

    const signOutStyle = {
        display: menuOpen ? "" : "none"
    }

    function openCloseMenu(){
        setMenuOpen(prevValue => !prevValue)
    }

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main id="vtp-inside" >
            <nav id="navbar">
                <img 
                    id="logo-img" 
                    src="../images/logo_r.png"
                    onClick={() => {navigate("/Welcome")}}
                />
            </nav>
            <div style={restStyle}>
                <Outlet  />
            </div>
            <div className="bottom" style={menuStyle}>
                { menuOpen ? (
                        <div id="menu-open">
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                className="bottom-icons"
                                onClick={() => openCloseMenu()}
                            />
                            <button style={signOutStyle} onClick={handleSignOut}>Sign Out</button>
                        </div>
                    ) : (
                        <div>
                            <FontAwesomeIcon 
                                icon={faPaw} 
                                className="bottom-icons"
                                onClick={() => {navigate("/Welcome")}}
                            />
                            <FontAwesomeIcon 
                                icon={faChevronUp} 
                                className="bottom-icons up"
                                onClick={() => openCloseMenu()}
                            />
                            <FontAwesomeIcon 
                                icon={faSquarePlus} 
                                className="bottom-icons add-button"
                                onClick={() => {navigate("/Welcome/Newpet")}}
                            />
                        </div>
                    )
                }
            </div>
        </main>
    )
};
