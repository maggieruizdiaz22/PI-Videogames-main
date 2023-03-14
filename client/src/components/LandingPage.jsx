import React from "react";
import {Link} from "react-router-dom";
import "./Styles/landingPage.css"
import "./Styles/home.css"

export default function LandingPage(){
    return (
        <div className="background">
            <div className="landing">
            <Link to="/home">
            <button> Play</button>
            </Link>
        </div>
        </div>
    )
    }

    