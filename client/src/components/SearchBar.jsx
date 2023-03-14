import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanerName, getGameByName } from "../actions";

export default function SearchBar({setCurrentPage}){
    const dispatch= useDispatch();
    const [name,setName] = useState(""); //en mi estado local NAME voy ir guardando lo que el usuario esta tipiando
    


//guardo en mi estadonlocal lo que vaya apareciendo en este input 
function handleInputChange(e){
e.preventDefault()
setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getGameByName(name)) // lo que tenga en mi estado local va allegarle a mi accion q va a llamar al back y le va a pasar name
    setCurrentPage(1)
    setName("");
}

function handleOnKeyPress(e){
    if(e.key === 'Enter'){
        handleSubmit(e)
        setCurrentPage(1)
        dispatch(cleanerName())
    }
}

return(
    <>
<div>
<form>
    <input
    onChange = {(e)=>{
        
        handleInputChange(e);
      }}
        type='text'
        placeholder ="Search by name..."
        value={name}
        onKeyPress={ e=>handleOnKeyPress(e)}
        />
    <button  onClick={handleSubmit} >Search</button>
        </form>
    
</div>
</>
);
}