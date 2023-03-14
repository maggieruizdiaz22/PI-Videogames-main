import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link, useParams, useHistory} from "react-router-dom";
import { clearDetails, deleteVideogames, getDetail,cleaner} from "../actions";
import Loading from "./Loading";
import { useEffect } from "react";
import { useState } from "react";
import "./Styles/Details.css";


export default function Details(){
    const {id} = useParams()
const dispatch = useDispatch()
const history = useHistory()
const [readMore,setReadmore]= useState(false)
const myVideogame = useSelector((state)=>state.detail) // traigo mi estado details






useEffect(()=>{
    dispatch(clearDetails())
    dispatch(getDetail(id)); // acceso a la info de los detalles 
},[dispatch,id])

function handleDelete(e){
const ID = id.includes("-")
        if(ID){
            e.preventDefault()
            dispatch(deleteVideogames(id))
            dispatch(cleaner())
            history.push('/home')
            let respuesta = window.confirm("Are you sure do you want to delete the card?")
            // dispatch(cleanGame())
            if(respuesta===true) {
              return true;
            }else{
                return false;
            }
        }else{
            alert('You only can eliminate your videogames')
        }
    }
    





return(
    <>
    <div className=".about" >
        <div className="background">
        <div className="glass">
        <button onClick={(e) => handleDelete(e)} className="button1X " >X</button>  
        {    
        myVideogame.length > 0 ?
        <div>
            <div className="main">
            
            <h1 className="h1Max">{myVideogame[0].name}</h1>
            <img className="card1"src={myVideogame[0].img} alt="" width="250px" height="300"/>
            <div className="about-text" >
               
            </div>
            <div className="description">
               
            <p>Description: </p>
            
            
            <p className="descriptionP">
                {readMore ? myVideogame[0].description : `${myVideogame[0].description.substring(0,200)}...`}
                <button className="button1" onClick={()=>setReadmore(!readMore)}>{readMore ? 'show less' : 'show more'} </button>
            </p>
            </div>
            <div className="rating">
                <h5>
            <span className="span1">Rating: </span>
            <span className="span2">{myVideogame[0].rating}</span>
                </h5>
                </div>
                <div className="span1">
                    <h5>
            <span>Released: </span>
            <span className="span2">{myVideogame[0].released}</span>
             </h5>
             </div>
             <div className="span1"> 
             <h5>
             <span>Platforms: </span>
             <span className="span2">{myVideogame[0].platforms}</span>
             </h5>
             </div>
             <div className="span1"> 
             <h5>
             <span>Genres:</span>
             <span className="span2">{myVideogame[0].genres}</span>
             </h5>
             </div>
             

<Link to= '/home'>
    <button className="button1">Back</button>
</Link>
</div>
        
</div> :  <Loading />
}
    </div>
    </div>
    </div>
    </>
)
}


        
            
            
           
