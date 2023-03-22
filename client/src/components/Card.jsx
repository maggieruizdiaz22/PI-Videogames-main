import React from "react";




export default function Card({img,name,genres,rating}){
  
  
    let genres2 = []
    if(genres!== undefined){ // genres es un array de objetos si no es undefined y a su vez
      if(typeof genres[0] ==='object'){
        genres.map(g => genres2.push(g.name) )
      }
    }
    return (
        <div>
          
            <img src={img} alt='img not found' width='200px' height='250px'/>
            <h3 className="tituloNombre">{name}</h3>
            <h4>⭐{rating}</h4>
            <h5>{genres2.length >= 1 ? genres2.join(",") : genres.join(", ")}</h5>
           
        </div>
        
    )

} 