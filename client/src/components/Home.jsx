import React from "react";
import { useState, useEffect } from "react"; // permite aniadir el estado de react a un componente de funcion
import {useDispatch, useSelector} from "react-redux"; // uselector extrae datos del estore de redux
import { getGenres, getVideogames,filterByGenres,filterCreate,orderByName,orderByRating} from "../actions/index";
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../components/Styles/home.css"
import Loading from "./Loading"



export default function Home({id}){
    const dispatch = useDispatch();// lanza acciones al store afectando el estado
    const allVideogames = useSelector((state)=>state.videogames); // en useSelector traeme todo lo qu esta en el esatdo del videogames
    const allGenres = useSelector((state)=>state.genres); //trae toda la info de all genres del estado
    const genresNames = allGenres.map((e)=>e.name);
    // const platfromsMap = allVideogames.map(e=>e.platforms)
  
    useEffect(()=>{ // se realiza una vez q se renderiza el DOM
        dispatch(getVideogames())
        dispatch(getGenres()) // cuando se monta se muestran todos los videogames traidos de la action 
    },[dispatch]); // de lo q depende este componentdidmount si le pomes una condicion dentro de los [] significa que de eso depende que monte si no nay nada se monta igual sin depender de nada
    
    
//paginado
  
    const [currenPage, setCurrentPage] = useState(1) // mi pagina actual arranca en 1
    const [videogamesPerPage] = useState(15) // cantidad de videogames per pagina
    const [setOrder] = useState("")
    const indexOfLastVideogame = currenPage*videogamesPerPage // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 15-15 = 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame)// en diferentes nros de pagina va cambiando las posiciones
   
    
// tengo una accion que se va a disparar depende de algo que este pasando

const paginado=(page)=>{
return setCurrentPage(page); // seteo la pagina que me estas clickeando
};



function handleClick(e){
e.preventDefault();
dispatch(getVideogames());
}

function handleFilterByGenres(e){ //cuando generos se modifique ejecutame esta funcion
    e.preventDefault();
    dispatch(filterByGenres(e.target.value)) // se ejecuta y toma como payload la accion el valor de cada uno de mis generos dependiendo de cual clickea el usuario
}

function handleFilterCreated(e){ 
    e.preventDefault();
    dispatch(filterCreate(e.target.value))
}

function handlesort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1); // seteo la pagina principal
    setOrder(`Ordenado ${e.target.value}`) // setea el estado local
}

function handleRating(e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`) // a este estado local setealo en la pagina 1
}




return(
<div className="background">
<div className="filters">
  <div className="createvideogame">
    <Link to={"/form"}>
      <button className="button">Create Videogame</button>
    </Link>
  </div>
  <div className="filters">
    <select  onChange={(e) => handlesort(e)}>
      <option >Alphabetical</option>
      <option value="a-z">A-Z</option>
      <option value="z-a">Z-A</option>
    </select>
  </div>
  <div className="">
    <select onChange={(e) => handleRating(e)}>
      <option>Rating</option>
      <option value="Worst-best">Worst-best</option>
      <option value="Best-Worst">Best-Worst</option>
    </select>
  </div>
  <div className="filtro">
    <select onChange={(e) => handleFilterByGenres(e)}>
      <option value="all">Genres</option>
      {genresNames?.map((e) => (
        <option key={e.id} value={e}>{e}</option>
      ))}
    </select>
  </div>
  <div className="filtro">
    <select onChange={(e) => handleFilterCreated(e)}>
      <option value="all">All</option>
      <option value="created">Created</option>
      <option value="api">Api</option>
    </select>
  </div>
  <div className="reload">
    <button className="button" onClick={(e) => handleClick(e)}>Reload</button>
  </div>
</div>
<div className="search">
  <SearchBar setCurrentPage={setCurrentPage} setOrder={setOrder}/> 
</div>
<div className="pages">
<Paginado
    videogamesPerPage={videogamesPerPage}
    allVideogames={allVideogames.length}
    setCurrentPage={setCurrentPage}
    currentPage={currenPage}
    paginado={paginado}
    />
</div>

<div className="body">
  <div className="glass">
    <div className="grid">
      {currentVideogames.length ? (
        currentVideogames.map((e) => {
          return (
            <>
              <div className="card">
              <Link to={"/videogames/" + e.id}>
                <Card key={e.id} name={e.name} img={e.img} genres={e.genres} rating={e.rating}/>
                </Link>
              </div>
            </>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  </div>

  
</div>

</div>
);
}
