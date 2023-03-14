import React,{ useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { postVideogames, getGenres,getPlatforms } from "../actions";
import { platf , validate} from "./info";
import "../components/Styles/form.css"



export default function Form(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allGenres = useSelector((state)=>state.genres);
    const genresNames = allGenres.map(e=>e.name)






    const [error,setError] = useState({}) //  un estado local que va a empezar como un objeto vacio
    const [input,setInput] = useState({ // input es el estado local
        name : '',
        img : '',
        description : '',
        released : '',
        rating : '',
        genres : [],
        platforms : [],

    });





   function handleChange(e){ // cada vex q ese ejecuta esta fucion ademas de lo que tiene agrega al target value de lo q este modificando
    setInput({  // a medida que se va modificando se va llenando el campo de arriba con la info ingresada
        ...input,
        [e.target.name]: e.target.value
    })
    // setError( // seteaa mi estado erores pasando la funcion validate con el estado input, y co  el e.target.name en el estado e.target.value
    //     validate({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    // )
    // }
  }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postVideogames(input))
        alert("Videogame created")
  
setInput({
        name : "",
        img : "",
        description : "",
        released : "",
        rating : "",
        genres : [],
        platforms : [],
    });
    return history.push('/home')
    }

    function handleDeleteP(event) {
        setInput({
          ...input,
          platforms: input.platforms.filter(
            (element) => element !== event.target.value
          ),
        });
    }

    function handleSelectP(e) {
        if (
          e.target.value !== "platforms" &&
          !input.platforms.includes(e.target.value)
        )
          setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
          });
      }

      function handleDeleteG(event) {
        setInput({
          ...input,
          genres: input.genres.filter((element) => element !== event.target.value),
        });
      }

      function handleSelectG(event) {
        if (
          event.target.value !== "platforms" &&
          !input.genres.includes(event.target.value)
        )
          setInput({
            ...input,
            genres: [...input.genres, event.target.value],
          });
      }

      function handleOnKeyPress(e){
        if(e.key === 'Enter'){
            handleSubmit(e)
        }
    }

 useEffect(()=>{
        dispatch(getGenres())
        dispatch(getPlatforms());
    },[dispatch])

    return(
        <div className="background">
          <div className="glass">
            <div className="form">
            <Link to='/home'><button >Back</button></Link>
            <h1>Create a Videogame</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    placeholder="Name"
                    value= {input.name}
                    name= "name"
                    title="insert letters"
                    pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
                    required
                    onChange={(e)=>handleChange(e)}
                    />
                     
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    type= "text"
                    placeholder="Description"
                    value= {input.description}
                    name= "description"
                    title="insert letters"
                    pattern="/^[\pL\s]*$/u"
                    required

                    onChange={(e)=>handleChange(e)}
                    />
                  
          
          
                </div>
                <div>
                    <label>Released:</label>
                    <input
                    type= "date"
                    placeholder="Released"
                    value={input.released}
                    name= "released"
                    title="invalid field"
                    pattern="^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$"
                    required
                    onChange={(e)=>handleChange(e)}
                    />
                  
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type= "number"
                    placeholder="Rating"
                    value={input.rating}
                    name="rating"
                    title="insert letters"
                    pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
                    required
                    onChange={(e)=>handleChange(e)}
                    />
            
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type="url"
                    placeholder="Image"
                    value={input.img}
                    name="img"
                    title="insert letters"
                    required
                    onChange={(e)=>handleChange(e)}
                    onKeyPress={ e=>handleOnKeyPress(e)}
                    />
                 
                </div>
                <div>
                <label>Platforms: </label>
      <select name="platforms" onChange={handleSelectP}>
        <option value="platforms">Platforms</option>
        {platf?.map((element, index) => (
          <option key={index}>{element}</option>
        ))}
      </select>
      <div>
        {input.platforms?.map((element, index) => (
          <span key={index}>
            {element}
            <button value={element} onClick={handleDeleteP}>
              X
            </button>
          </span>
        ))}
      </div>
                <label>Genres: </label>
      <select name="genres" onChange={handleSelectG}>
        <option value="genres">Genres</option>
        {genresNames?.map((element, index) => (
          <option key={index}>{element}</option>
        ))}
      </select>
      <div>
        {input.genres?.map((element, index) => (
          <span key={index}>
            {element}
            <button value={element} onClick={handleDeleteG}>
              X
            </button>
          </span>
        ))}
      </div>
 
      </div>
                <button type="submit">Submit</button>

            </form>
        </div>
        </div>
        </div>
       
    )
}