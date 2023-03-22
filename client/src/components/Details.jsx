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
    

    return (
        <>
           <div className="about1" >
            <div className="background">
              <div className="lola">
              <div className="glass1">
                <button onClick={(e) => handleDelete(e)} className="button1">X</button>
                {
                  myVideogame.length > 0 ?
                    <div>
                      <div className="main">
                        <img className="card1" src={myVideogame[0].img} alt="" width="250px" height="300" />
                        <h1 className="h1Max">{myVideogame[0].name}</h1>
                        <div className="description">
                          <p className="description">Description: </p>
                        </div>
                        <div className="copete">
                          <p className="descriptionP scroll">
                            {readMore ? myVideogame[0].description : `${myVideogame[0].description.substring(0, 200)}...`}
                            <button className="button2" onClick={() => setReadmore(!readMore)}>{readMore ? 'SHOW LESS' : 'SHOW MORE'} </button>
                          </p>
                        </div>
    
                        <div className="description">
    
                          <span className="span1">Rating: </span>
                          </div>
                          <div className="copete">
                          <span className="span2">{myVideogame[0].rating}</span>
    </div>
                        
                        <div className="description">
    
                          <span>Released: </span>
                        </div>
                        <div className="copete">
                          <span className="span2">{myVideogame[0].released}</span>
                        </div>
    
                        <div className="description">
    
                          <span>Platforms: </span>
                        </div>
                        <div>
                          <span className="copete">{myVideogame[0].platforms}</span>
                        </div>
                        <div className="description">
    
                          <span>Genres:</span>
                        </div>
                        <div>
                          <span className="copete">{myVideogame[0].genres}</span>
                        </div>
    
                        <Link to='/home'>
                          <button className="button2">BACK</button>
                        </Link>
                      </div>
                    </div>
                    :
                    <Loading />
                }
              </div>
              </div>
            </div>
          </div>
        </>
      )
    }
    
    
    
    
    
    
        
