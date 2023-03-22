import { 
    GET_VIDEOGAMES,
    GET_GENRES,
    FILTER_BY_GENRES,
    FILTER_CREATED, 
    ORDER_BY_NAME, 
    ORDER_BY_RATING,
    GET_BY_NAME, 
    POST_VIDEOGAME,
    GET_DETAIL,
    CLEAR_DETAILS,
    DELETE_VIDEOGAME,
    CLEAN_GAME,
    CLEANER,
    CLEANER_NAME
   
    } from "../components/Types";

const initialState = { //iniciamos un estado
videogames : [],
allVideogames: [],
genres: [],
platforms: [],
detail: [],
}

function rootReducer (state = initialState, action){ // son funciones puras q reciben el estado actual de la app y la accion y devuelven un nuevo estado
switch(action.type){
    case GET_VIDEOGAMES:
    return{
        ...state,
        videogames: action.payload,  // en mi estado videogames que en principio es un arreglo vacio mando todo lo que te mande GETVIDEOGAMES // aca llega la info que viene de mi ACCION ene este caso la data del la bdd,la info llega por action.payload que es la data de nuestra url del back 
        allVideogames: action.payload, // lo utilizo como estado de refuerzo 
    };
    case GET_GENRES:
        return{
            ...state,
            genres: action.payload
        };
        case GET_BY_NAME:
            return{
                ...state,
                videogames: action.payload, // los filtardos utilizan el stado videogames 
            }
        case FILTER_BY_GENRES:
            const allGames = state.allVideogames; // accedo a la info del estado del videogames 
            const getByGenres = action.payload === "all" // en payload llegan las opciones de generos en este caso 
            ? allGames : allGames.filter((g)=>g.genres.includes(action.payload)); // si no es all toma cualquiera de los valores q lleguen y devolveme ese payload
            return{
                ...state,
                videogames: getByGenres, // en mi estado videogames suceda todo esta logica 
            };
            case FILTER_CREATED:
                const createdFilter = action.payload === "created" 
                ? state.allVideogames.filter((e)=>e.created)
                : state.allVideogames.filter((e)=>!e.created);
                return{
                    ...state,
                    videogames: action.payload === "all" ? state.allVideogames : createdFilter,
                }
                case ORDER_BY_NAME:
                    const sortName = action.payload === "a-z" ? 
                    state.videogames.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                    }) 
                    : state.videogames.sort(function(a,b){
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    });
                       return{
                        ...state,
                        videogames: sortName,
                       };
                       case ORDER_BY_RATING:
                        const sortRating = action.payload === "Worst-best" ?
                        state.videogames.sort(function(a,b) {
                            if(a.rating > b.rating){
                                 return 1;
                            }
                            if(b.rating > a.rating){
                                return -1;
                            }
                            return 0;
                        })
                        : state.videogames.sort(function(a,b){
                            if(a.rating > b.rating){
                                return -1;
                            }
                            if(b.rating > a.rating){
                                return 1;
                            }
                            return 0;
                        });
                        return {
                            ...state,
                            videogames: sortRating,
                        }
                        case POST_VIDEOGAME: // lo voy a crear en una ruta nueva 
                            return{
                                ...state,
                            };
                         case GET_DETAIL:
                            return{
                                ...state, 
                                detail: action.payload
                            
                            } 
                            case CLEAR_DETAILS:
                                return{
                                    ...state,
                                    detail: []
                                
                            }
                            case DELETE_VIDEOGAME:
                                return { ...state 
                                }
                            case CLEAN_GAME:
                                return { ...state, loader: true 
                                }
                    
                            case CLEANER: {
                                return {
                                    ...state,
                                    detail: []
                                }
                            }
                            case CLEANER_NAME:{
                                return {
                                    ...state,
                                    videogames:[],
                                    allVideogames:[]
                                }
                            }
                    default:
            return state;
}
}


export default rootReducer;