import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_BY_NAME = "GET_BY_NAME";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const CLEAR_VIDEOGAMES = "CLEAR_VIDEOGAMES";
export const DELETE_VIDEOGAME ="DELETE_VIDEOGAME";
export const CLEAR_VIDEOGAME_CACHE = "CLEAR_VIDEOGAME_CACHE";
export const CLEANER ="CLEANER"
export const CLEAN_GAME = "CLEAN_GAME"
export const CLEANER_NAME = "CLEANER_NAME"
//conexion con el font y el back solo se despacha un tipo en action no debo hacer logica, hare la logica en reducer o componente
export function getVideogames(){
return async function(dispatch){
let response = await axios.get(`/videogames`, {});
return dispatch({ // dispacho la accion 
type: GET_VIDEOGAMES,
payload: response.data // aca enviaremos esta info de la base de datos la guardaremos en payload para poder pasarla al reducer 
})
};
}
//    export function getVideogames(){
//     return dispatch=>{
//     return axios.get(`http://localhost:3001/videogames`)
//     .then(response=>{
//         dispatch({
//             type: GET_VIDEOGAMES,
//             payload: response.data
//         })
//     })
//    }
// }

export function getGenres(){
return async function(dispatch){
let response = await axios.get(`http://localhost:3001/genres`, {});
return dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        };
    }
    // export function deleteVideogames(id){
    //     return dispatch=>{
    //         return axios.delete("http://localhost:3001/videogames/" + id )
    //         .then(()=>{
    //             dispatch({
    //                 type: DELETE_VIDEOGAMES,
    //                 payload: id
    //             })
    //         })
    //     }
    // }
    
    export function getGameByName(name){
        return async function(dispatch){
            try {
                let response1= await axios.get(`/videogames?name=${name}`) // accede a esta direccion pero con el name obligado
                let response2= await response1.data
                return dispatch({
                    type: GET_BY_NAME,
                    payload: response2
                })
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    export function getPlatforms(payload){ // el payload es el value q llega
return(dispatch) =>{
    dispatch({
        type: GET_PLATFORMS,
        payload: payload,
    })
}
    }

export function filterByGenres(genre){ // me va a llegar un value por props en este caso payload
   console.log('GENRE',genre)
    return{
        type: FILTER_BY_GENRES,
        payload: genre,
    };
}

export function filterCreate(payload){
    return{
        type: FILTER_CREATED,
        payload,
    };
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    };
}
export function orderByRating(payload){
    return{
        type: ORDER_BY_RATING,
        payload
    };
}
export function postVideogames(payload){
    return async function(dispatch){
        const response = await axios.post(`/videogames`,
        payload);
        console.log(response);
        return dispatch({
            type: POST_VIDEOGAME,
            payload: response.data
        })
    };
}
export function getDetail(id){
    return async function(dispatch){
        try {
            const response3 = await axios.get("/videogames/" + id );
            return dispatch({
                type: GET_DETAIL,
                payload: response3.data
                
            })
        } catch (error) {
            console.log(error)
        }
       
    };
}

export function clearDetails(payload){
    return{
        type: CLEAR_DETAILS,
        payload
    }
}
export function clearVideogames(payload){
    return{
        type: CLEAR_VIDEOGAMES,
        payload
    }
}
export function deleteVideogames(id){
        return async function(dispatch){
            try {
                await axios.delete("/videogames/" + id )
                return dispatch({
                    type: DELETE_VIDEOGAME,
                    payload:id,
                })
            } catch (error) {
                
            }
        }
    }
    export function clearVideogameCache(){
        return{
            type: CLEAR_VIDEOGAME_CACHE
    
        }
    }
    export function cleanGame() {
        return {
            type: 'CLEAN_GAME',
            payload: {},
        };
    }
    
    export function cleaner() {
        return {
            type: 'CLEANER',
            payload: {},
        }
    }
    export function cleanerName() {
        return {
            type: 'CLEANER_NAME',
            payload: {},
        }
    }





